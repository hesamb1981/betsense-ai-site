// netlify/functions/nsi-demo.js

exports.handler = async (event) => {
  // فقط درخواست POST را قبول کن
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // اینجا فعلاً یک دمو ثابت برمی‌گردانیم
    // بعداً می‌توانیم همین‌جا به بک‌اند اصلی وصلش کنیم
    const demoResponse = {
      engine: "NSI",
      mode: "demo",
      status: "ok",
      summary: "Demo NSI narrative generated successfully.",
      narrative: [
        "Home side shows stable attacking intent but with rising fatigue.",
        "Opposition defensive line starts to lose compactness after 70th minute.",
        "Behavioral switching window is opening on both flanks.",
      ],
      confidence: 0.93,
      meta: {
        version: "NSI-DEM0-1.0",
        generatedAt: new Date().toISOString(),
      },
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(demoResponse, null, 2),
    };
  } catch (err) {
    console.error("NSI demo error:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "NSI demo failed" }),
    };
  }
};
