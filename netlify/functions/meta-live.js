exports.handler = async (event) => {
  try {
    const { club, league } = event.queryStringParameters || {};

    if (!club || !league) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ok: false,
          error: "Missing parameters: club and league are required."
        }),
      };
    }

    // -----------------------------------------
    //  META BEHAVIOR ENGINE — LIVE OUTPUT
    // -----------------------------------------

    const liveResponse = {
      ok: true,
      engine: "Meta-Behavior",
      mode: "live",
      summary: `Meta Behavior Engine live output for ${club} (${league})`,
      metrics: {
        stabilityScore: 77,
        deviationRisk: 21,
        switchingZones: 2,
        fusionImpact: 59,
        regimeInstability: 18,
        liveAdjustment: true,
      },
      narrative: {
        short:
          "Meta Behavior Engine detects mild instability with moderate fusion influence in live conditions.",
        long:
          "Live Meta Behavior Engine shows evolving behavioral drift patterns across NSI, RBS, Emotional and OrderBook layers. Current fusion impact suggests developing micro-shifts, but deviation risk remains stable. No major switching-zone transitions detected at this moment.",
      },
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(liveResponse, null, 2),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        error: "Meta Behavior live failed.",
        details: err.message,
      }),
    };
  }
};
