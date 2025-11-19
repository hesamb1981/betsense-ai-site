// netlify/functions/api-football-proxy.js

const API_BASE = 'https://v3.football.api-sports.io';

exports.handler = async (event, context) => {
  try {
    const { mode, fixtureId } = event.queryStringParameters || {};

    const apiKey = process.env.API_FOOTBALL_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing API_FOOTBALL_KEY env variable' }),
      };
    }

    let url;

    // 1) همه بازی‌های لایو
    if (mode === 'live') {
      url = `${API_BASE}/fixtures?live=all`;
    }
    // 2) اطلاعات کلی یک بازی (فیکسچر) بر اساس ID
    else if (mode === 'fixture') {
      if (!fixtureId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'fixtureId is required for mode=fixture' }),
        };
      }
      url = `${API_BASE}/fixtures?id=${fixtureId}`;
    }
    // 3) استت‌های یک بازی (شوت، کرنر، …)
    else if (mode === 'stats') {
      if (!fixtureId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'fixtureId is required for mode=stats' }),
        };
      }
      url = `${API_BASE}/fixtures/statistics?fixture=${fixtureId}`;
    }
    // حالت دیفالت: برگردوندن خطا
    else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid mode. Use mode=live | fixture | stats' }),
      };
    }

    const resp = await fetch(url, {
      headers: {
        'x-apisports-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    });

    const data = await resp.json();

    return {
      statusCode: resp.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('Proxy error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal proxy error', details: err.message }),
    };
  }
};
