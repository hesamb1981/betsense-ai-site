exports.handler = async () => {
  try {
    const demoResponse = {
      ok: true,
      engine: "OrderBook Pressure Index",
      mode: "demo",
      summary: "OrderBook Engine demo output (Option D)",
      metrics: {
        pressureScore: 78,
        buySideImbalance: 62,
        sellSideImbalance: 38,
        sweepAlerts: 2,
        ladderStability: 71,
        liquidityPockets: 4
      },
      narrative: {
        short:
          "OrderBook Pressure Index shows moderate buy-side pressure with generally stable ladder structure.",
        long:
          "OrderBook Engine (Option D) detects a healthy but controlled buy-side imbalance. Liquidity pockets are visible on both sides of the book, with no extreme sweep activity. Ladder stability remains good and no major micro-structure stress is detected at this time."
      }
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(demoResponse, null, 2),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: "OrderBook demo failed.",
        details: err.message,
      }),
    };
  }
};
