// netlify/functions/fusion-demo.js

exports.handler = async (event, context) => {
  try {
    // Simple demo-local response for Fusion Engine
    const response = {
      engine: "FUSION",
      mode: "demo-local",
      status: "ok",
      summary: "Fusion Engine demo response generated successfully.",
      layers: {
        nsi: {
          label: "NSI – Narrative Situation Index",
          score: 0.68,
          comment:
            "Current narrative flow shows a slight edge toward the home side based on recent match storylines."
        },
        rbs: {
          label: "RBS – Real Behavioral Switching",
          score: 0.42,
          comment:
            "Behavior switching patterns suggest increased volatility in the last 25 minutes of play."
        },
        emotion: {
          label: "Emotion Index",
          score: 0.57,
          comment:
            "Crowd and tempo signals indicate moderate emotional heat with short spikes after key events."
        },
        orderbook: {
          label: "OrderBook Pressure",
          score: 0.51,
          comment:
            "OrderBook pressure is currently balanced, with only a slight tilt toward late away-side buying."
        }
      },
      fusedSignals: {
        compositeEdge: 0.61,
        riskBand: "medium",
        focusSide: "home",
        narrativeFlag:
          "Fusion layer suggests a controlled but fragile home advantage with potential late drift."
      },
      narrative: [
        "Over the selected sample window, Fusion Engine detects recurring periods where NSI and RBS amplify each other around momentum swings.",
        "When Emotion Index spikes align with positive NSI for the home side, short-term edge increases but decays quickly if OrderBook pressure does not confirm.",
        "Late-game windows (75’+) often show Fusion tension: RBS flags switching behavior while OrderBook pressure begins to rotate toward the away side.",
        "For trading desks, the fused signal is best used as a confirmation layer on top of your existing live models rather than a standalone trigger."
      ],
      meta: {
        sample_window_matches: 40,
        league_example: "Premier League",
        demo_note:
          "This is a local demo response only. Production clients should connect their own live Fusion Engine feed."
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
        engine: "FUSION",
        mode: "demo-local",
        status: "error",
        message: "Fusion demo function failed",
        detail: error.message || "Unknown error"
      })
    };
  }
};
