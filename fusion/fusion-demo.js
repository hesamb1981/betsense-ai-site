// Fusion Engine Demo JS
// This file handles the demo API request and UI updates for Fusion Demo Console

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("runFusionDemo");
  const statusEl = document.getElementById("fusionStatus");
  const outputEl = document.getElementById("fusionOutput");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    statusEl.innerHTML = "Status: PROCESSING…";
    statusEl.style.color = "#4fc3f7";
    outputEl.innerHTML = "Waiting...";

    try {
      const response = await fetch(
        "https://betsense-ultra-api.onrender.com/api/fusion/demo"
      );

      if (!response.ok) {
        outputEl.innerHTML =
          "Fusion demo error:\n\nStatus: " +
          response.status +
          "\n{\"error\":\"Not Found\"}";
        statusEl.innerHTML = "Status: ERROR";
        statusEl.style.color = "#ef5350";
        return;
      }

      const data = await response.json();

      statusEl.innerHTML = "Status: READY";
      statusEl.style.color = "#69f0ae";
      outputEl.innerHTML = JSON.stringify(data, null, 2);
    } catch (err) {
      statusEl.innerHTML = "Status: ERROR";
      statusEl.style.color = "#ef5350";
      outputEl.innerHTML =
        "Fusion demo error:\n\nNetwork failure or API offline.";
    }
  });
});
