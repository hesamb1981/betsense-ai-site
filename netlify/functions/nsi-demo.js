exports.handler = async () => {
  try {
    const response = await fetch(
      "https://betsense-backend.onrender.com/api/nsi/demo"
    );
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "NSI Demo Failed", details: err.message }),
    };
  }
};
