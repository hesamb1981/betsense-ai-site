// netlify/functions/fusion-demo.js

export async function handler(event, context) {
  try {
    // Demo fake response for Fusion Engine
    const demoResponse = {
      status: "success",
      fused_narrative: "Arsenal showing growing momentum with strong RBS support.",
      nsi: {
        trend: "positive",
        score: 0.78
      },
      rbs: {
        pressure_home: 41,
        pressure_away: 59
      },
      emotion: {
        intensity: "medium",
        confidence: 0.63
      },
      orderbook: {
        imbalance: "away_bias",
        strength: 0.71
      }
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(demoResponse)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Fusion Demo Function Error" })
    };
  }
}
