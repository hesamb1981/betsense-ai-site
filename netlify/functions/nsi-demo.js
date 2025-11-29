// netlify/functions/nsi-demo.js

const API_BASE_URL = "https://betsense-ultra-backend.onrender.com";

exports.handler = async function (event, context) {
  // فقط POST مجازه
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // این سناریوی دمو NSI هست (ثابت)
    const params = {
      engine: "nsi",
      mode: "demo",
      fixtureId: "123456",
      team: "Arsenal",
      opponent: "Spurs",
      minute: 78,
    };

    const response = await fetch(`${API_BASE_URL}/api/engine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("NSI demo error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "NSI demo failed" }),
    };
  }
};
