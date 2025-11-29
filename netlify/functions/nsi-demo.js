exports.handler = async () => {
  try {
    const demoResponse = {
      engine: "NSI",
      status: "ok",
      narrative: "This is a demo NSI Engine response. Connectivity working."
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
      body: JSON.stringify({ error: "NSI demo failed", details: err.message })
    };
  }
};
