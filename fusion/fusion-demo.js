exports.handler = async (event, context) => {
  try {
    // Mock demo response for Fusion Engine
    const demoResponse = {
      status: "ok",
      message: "Fusion Engine demo response",
      fused_metrics: {
        nsi: 0.72,
        rbs: 0.64,
        emotion: 0.58,
        orderbook: 0.61
      },
      narrative: "Team shows rising momentum with balanced emotional pressure."
    };

    return {
      statusCode: 200,
      body: JSON.stringify(demoResponse)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Fusion demo internal error",
        details: error.message
      })
    };
  }
};
