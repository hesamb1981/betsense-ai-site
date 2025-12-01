// netlify/functions/dataspine-live.js
// Placeholder – بعداً به بک‌اند یا دیتا لایو وصل می‌کنیم

exports.handler = async function (event, context) {
  try {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: true,
        engine: "DataSpine",
        mode: "live",
        note:
          "DataSpine live endpoint placeholder – ready to connect to real provider streams later.",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        error: "DataSpine live failed.",
        details: err.message,
      }),
    };
  }
};
