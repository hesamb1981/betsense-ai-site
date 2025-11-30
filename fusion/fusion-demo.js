exports.handler = async () => {
  try {
    // Demo response until backend API is connected
    const demoResponse = {
      status: "ok",
      fusion_demo: {
        message: "Fusion Engine demo placeholder",
        behavior_score: 62,
        nsi_score: 71,
        rbs_score: 58,
        fused_output: "Balanced pressure · moderate risk"
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

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" })
    };
  }
};
