// netlify/functions/nsi-demo.js
// NSI DEMO → call BetSense Ultra backend with a fixed demo scenario

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
    // سناریوی ثابت دمو برای NSI
    const payload = {
      engine: "nsi",
      mode: "demo",
      fixtureId: "123456",
      team: "Arsenal",
      opponent: "Spurs",
      minute: 78,
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
    console.error("NSI demo error:", err.message);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "NSI demo failed",
        details: err.message,
      }),
    };
  }
};
