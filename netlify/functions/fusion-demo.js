// netlify/functions/fusion-demo.js

exports.handler = async (event) => {
  try {
    // اگر Body داشت، برای زیبایی ازش استفاده می‌کنیم
    let payload = {};
    if (event.body) {
      try {
        payload = JSON.parse(event.body);
      } catch (e) {
        // اگر JSON خراب بود، اهمیتی ندیم
        payload = {};
      }
    }

    const team = payload.teamName || "Selected club";
    const league = payload.league || "selected league";
    const windowMatches =
      payload.sampleWindowMatches || "last 20–50 matches";

    const response = {
      engine: "FUSION_ENGINE",
      mode: "demo-local",
      status: "ok",
      summary: "Fusion Engine demo response generated successfully.",
      narrative: [
        `${team} is fused from NSI, RBS, Emotion and OrderBook layers.`,
        `In the ${league}, the fusion stack looks across ${windowMatches} to detect stable and unstable phases.`,
        "NSI layer tracks long-horizon behavior edge,",
        "RBS layer monitors switching risk and late flips,",
        "Emotion index reads crowd / tempo swings,",
        "OrderBook pressure flags heavy one-sided market flows.",
        "Fusion Engine blends these into one clean narrative stream for a single club or fixture."
      ],
      confidence: 0.91,
      fusion: {
        sample_window_matches: windowMatches,
        fusion_layers: [
          "NSI – long-horizon behavior edge",
          "RBS – regime / switching risk",
          "Emotion index – crowd & tempo swings",
          "OrderBook pressure – market imbalance"
        ],
        scenario: "FUSION_LAYER_DEMO"
      }
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error("Fusion demo function error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Fusion demo failed",
        details: error.message || "Unknown error"
      })
    };
  }
};
