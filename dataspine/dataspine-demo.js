// netlify/functions/dataspine-demo.js
// Demo output for DataSpine Engine – completely independent from backend

exports.handler = async function (event, context) {
  try {
    const payload = {
      ok: true,
      engine: "DataSpine",
      mode: "demo",
      summary: "DataSpine Engine demo output (Option D)",
      spine: {
        providerDriftIndex: 73,
        feedStability: 88,
        anomalyClusters: 4,
        syncLagSeconds: 6,
        duplicateRate: 0.7,
        shadowDisagreement: 3,
      },
      narrative: {
        short:
          "Global feed structure remains stable with a small cluster of high-drift providers on the edge of the spine.",
        long:
          "DataSpine Engine detects a generally clean and stable data spine across primary providers. A small group of feeds shows elevated drift and disagreement, but impact on the global spine remains controlled. Ideal candidates for targeted cleansing and contract renegotiation.",
      },
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        error: "DataSpine demo failed.",
        details: err.message,
      }),
    };
  }
};
