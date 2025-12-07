// -------------------------------------
// BetSense Ultra - USI Frontend Client
// Calls the standalone USI engine API
// -------------------------------------

const USI_API_URL = "https://betsense-usi.onrender.com/api/usi";

/**
 * Call the USI engine from the UI.
 * @param {string} teamA - Name of first team
 * @param {string} teamB - Name of second team
 * @param {number} confidence - Confidence level (0 to 1)
 * @returns {Promise<object>} - USI response JSON
 */
export async function callUSI(teamA, teamB, confidence) {
  try {
    const response = await fetch(USI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamA,
        teamB,
        confidence,
      }),
    });

    if (!response.ok) {
      throw new Error(`USI API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("USI client error:", error);
    return {
      error: true,
      message: error.message || "USI client unknown error",
    };
  }
}
