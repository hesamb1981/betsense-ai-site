// File: netlify/functions/api-football-proxy.js
// Runs automatically on Netlify serverless functions

export default async function handler(req, context) {
  try {
    const API_KEY = process.env.API_FOOTBALL_KEY;

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const url = req.url.replace(
      `${req.url.split("/.netlify/functions/")[0]}/.netlify/functions/api-football-proxy`,
      "https://v3.football.api-sports.io"
    );

    const response = await fetch(url, {
      headers: {
        "x-apisports-key": API_KEY
      }
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
