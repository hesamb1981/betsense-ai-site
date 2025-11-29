// netlify/functions/nsi-demo.js

const BACKEND_BASE_URL = "https://YOUR-RENDER-URL.onrender.com"; 
// 👆 حسام، فقط این یک خط رو عوض کن:
// به‌جای https://YOUR-RENDER-URL.onrender.com
// دقیقاً همون آدرسی رو بذار که قبلاً برای تست NSI Demo
// توی Render زدی و جواب JSON گرفتی
// (تا قبل از /api/... یعنی مثلاً:
//  https://betsense-ultra-backend.onrender.com )

exports.handler = async (event) => {
  // فقط اجازه POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const url = `${BACKEND_BASE_URL}/api/nsi-demo`;

    const upstreamRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // نیازی به بادی خاصی نداریم، دمو ثابته
      body: JSON.stringify({ demo: true }),
    });

    const text = await upstreamRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (_) {
      data = { raw: text };
    }

    if (!upstreamRes.ok) {
      // اگر بک‌اند خودش ارور بده
      return {
        statusCode: upstreamRes.status,
        body: JSON.stringify({
          error: "Upstream NSI error",
          details: data,
        }),
      };
    }

    // موفق
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "NSI demo failed",
        details: err.message,
      }),
    };
  }
};
