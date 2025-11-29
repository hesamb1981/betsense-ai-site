// netlify/functions/rbs-demo.js
// RBS DEMO → call BetSense Ultra backend using form values

const axios = require("axios");

const API_BASE_URL =
  process.env.BETSENSE_BACKEND_URL ||
  "https://betsense-ultra-backend.onrender.com";

exports.handler = async (event) => {
  // فقط POST قبول می‌کنیم
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};

    const payload = {
      engine: "rbs",
      mode: "demo",
      team: body.team || "Arsenal",
      opponent: body.opponent || "Spurs",
      fixtureId: body.fixtureId || "123456",
      minute: body.minute || 74,
    };

    const response = await axios.post(`${API_BASE_URL}/api/engine`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.error("RBS demo error:", err.message);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "RBS demo failed",
        details: err.message,
      }),
    };
  }
};
