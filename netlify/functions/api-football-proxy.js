// netlify/functions/api-football-proxy.js

// این فانکشن روی نتلیفای اجرا می‌شود و نقش واسط بین فرانت‌اند و API-FOOTBALL را دارد.
exports.handler = async (event, context) => {
  try {
    const apiKey = process.env.API_FOOTBALL_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'API_FOOTBALL_KEY is not set in Netlify environment variables.',
        }),
      };
    }

    // مشخص می‌کنیم past یا live
    const params = event.queryStringParameters || {};
    const mode = (params.mode || 'past').toLowerCase();

    // تنظیمات مشترک
    const baseUrl = 'https://v3.football.api-sports.io/fixtures';
    const leagueId = 39;   // Premier League
    const season = 2024;   // اگر لازم شد بعداً تغییرش می‌دهیم

    let url;

    if (mode === 'live') {
      // حداکثر ۵ بازی زنده
      url = `${baseUrl}?league=${leagueId}&season=${season}&live=all`;
    } else {
      // آخرین ۱۰ بازی تمام‌شده
      url = `${baseUrl}?league=${leagueId}&season=${season}&last=10`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'API request failed',
          status: response.status,
          details: text,
        }),
      };
    }

    const data = await response.json();

    // اگر مود live بود، فقط ۵ بازی اول را نگه می‌داریم
    if (mode === 'live' && Array.isArray(data.response)) {
      data.response = data.response.slice(0, 5);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // برای اینکه از فرانت‌اند مستقیم صداش بزنی:
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        mode,
        league: leagueId,
        season,
        raw: data,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Unexpected server error',
        details: err.message,
      }),
    };
  }
};
