exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        engine: "META_BEHAVIOR",
        mode: "demo-local",
        status: "ok",
        summary: "Meta-behavior pattern generated successfully.",
        narrative: [
          "Selected team shows recurring phases of high-risk attacking intent followed by extended control phases across the last 50 matches.",
          "In the chosen league, late-game behavior (75’+) often shifts toward protecting existing game states rather than chasing goals.",
          "Pressing intensity drops after minute 70, opening switching windows on the weak-side flank in more than 60% of matches."
        ],
        confidence: 0.91,
        meta: {
          sample_window_matches: "last 50",
          engine_stack: ["NSI", "RBS", "OrderBookPressure", "Historical"],
          scenario: "LONG_HORIZON_BEHAVIOR"
        }
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Meta demo failed" })
    };
  }
};
