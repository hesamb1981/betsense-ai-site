exports.handler = async (event) => {
  try {
    const input = JSON.parse(event.body || "{}");

    const demoResponse = {
      engine: "RBS",
      status: "ok",
      team: input.team || "Unknown",
      opponent: input.opponent || "Unknown",
      minute: input.minute || 0,
      insight: "This is a demo RBS Engine behavioral switching analysis."
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(demoResponse, null, 2)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "RBS demo failed", details: err.message })
    };
  }
};
