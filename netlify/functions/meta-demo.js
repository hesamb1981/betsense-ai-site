export const handler = async () => {
  try {
    const sampleResponse = {
      engine: "META_BEHAVIOR",
      mode: "demo-local",
      status: "ok",
      summary: "Meta-behavior pattern generated successfully.",
      narrative: [
        "Selected team shows recurring phases of high-risk attacking intent followed by extended defensive control.",
        "Late-game behavior (75’+) often shifts toward game-state protection rather than chasing new goals.",
        "Pressing intensity drops after minute 70, opening switching windows on the weak-side flank.",
        "Opponent behavioral patterns tend to stabilize after early-game volatility."
      ],
      confidence: 0.91,
      meta: {
        sample_window_matches: "last 50",
        engine_stack: ["NSI", "RBS", "OrderBookPressure", "Historical"],
        scenario: "LONG_HORIZON_BEHAVIOR"
      }
    };

    return {
      statusCode: 200,
      body: JSON.stringify(sampleResponse),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Meta-demo failed" }),
    };
  }
};
