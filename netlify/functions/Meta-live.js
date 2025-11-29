export async function handler(event, context) {
  try {
    const params = event.queryStringParameters;

    const response = await fetch(
      "https://YOUR_BACKEND_URL.onrender.com/api/meta",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team: params.team,
          league: params.league,
          window: params.window
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Meta live request failed" })
    };
  }
}
