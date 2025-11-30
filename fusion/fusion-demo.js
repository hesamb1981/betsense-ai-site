// Fusion Engine Demo JS
// Handles UI button, fetch request, and console output rendering

document.addEventListener("DOMContentLoaded", () => {
    const runButton = document.getElementById("runFusionDemo");
    const statusIndicator = document.getElementById("fusionStatus");
    const outputBox = document.getElementById("fusionOutput");

    function setStatus(text, color) {
        statusIndicator.textContent = text;
        statusIndicator.style.color = color;
    }

    async function runDemo() {
        setStatus("RUNNING…", "#00eaff");
        outputBox.textContent = "Waiting…";

        try {
            const response = await fetch(
                "https://betsense-ultra-api.onrender.com/api/fusion/demo",
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (!response.ok) {
                const err = await response.text();
                setStatus("ERROR", "#ff4444");
                outputBox.textContent =
                    "Fusion demo error:\n\nStatus: " +
                    response.status +
                    "\n" +
                    err;
                return;
            }

            const data = await response.json();

            setStatus("READY", "#00ff88");
            outputBox.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            setStatus("ERROR", "#ff4444");
            outputBox.textContent =
                "Fusion demo error:\n\n" + error.toString();
        }
    }

    if (runButton) {
        runButton.addEventListener("click", runDemo);
    }

    // Initial UI state
    setStatus("READY", "#00ff88");
    outputBox.textContent = "Waiting…";
});
