// ---------------------------------------------------------
// BetSense – Live Connected Data Button v1.0
// This component sends a generic "live-connect" payload
// to the BetSense Live Connect server and prints the
// normalized response JSON in the UI.
// ---------------------------------------------------------

const LIVE_CONNECT_URL =
  "https://betsense-live-connect.onrender.com/api/live-connect";

/**
 * Initialize Live Connected Data demo button
 *
 * @param {Object} config
 * @param {string} config.buttonId  - HTML id of the button
 * @param {string} config.outputId  - HTML id of the <pre> for JSON result
 */
export function initLiveConnectedDataButton(config = {}) {
  const button = document.getElementById(config.buttonId || "live-connect-btn");
  const output = document.getElementById(config.outputId || "live-connect-output");

  if (!button || !output) {
    console.warn(
      "[BetSense LiveConnect] Button or output element not found. " +
        "Make sure IDs match the ones passed to initLiveConnectedDataButton()."
    );
    return;
  }

  button.addEventListener("click", async () => {
    button.disabled = true;
    const originalText = button.innerText;
    button.innerText = "Connecting…";

    // Very generic demo payload – engine-agnostic
    const payload = {
      source: "betsense-ui-demo",
      data: {
        sampleMetric: 0.87,
        events: 3,
        note: "Demo live-connect ping from BetSense front-end",
      },
    };

    output.textContent = "// Sending live-connect payload…";

    try {
      const response = await fetch(LIVE_CONNECT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json().catch(() => ({
        error: "Invalid JSON response from server",
      }));

      output.textContent = JSON.stringify(json, null, 2);
    } catch (err) {
      output.textContent =
        "// Live-connect error:\n" + (err?.message || String(err));
    } finally {
      button.disabled = false;
      button.innerText = originalText;
    }
  });
}
