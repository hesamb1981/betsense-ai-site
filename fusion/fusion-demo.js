// netlify/functions/fusion-demo.js

exports.handler = async (event, context) => {
  // این یه پاسخ دموه، بدون هیچ کال به سرورهای بیرونی
  const demoResponse = {
    engine: "FUSION_ENGINE",
    mode: "demo-local",
    status: "ok",
    summary: "Fusion demo response generated successfully.",
    narrative: [
      "Fusion Engine combines NSI, RBS, Emotion and OrderBook layers into a single stream.",
      "This is a local demo payload returned directly from the Netlify function.",
      "In production, this endpoint would call the Fusion Engine backend API."
    ],
    confidence: 0.92,
    meta: {
      layers: ["NSI", "RBS", "Emotion", "OrderBookPressure"],
      scenario: "FUSION_DEMO_LOCAL",
      sample_window_matches: 20
    }
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(demoResponse, null, 2)
  };
};
