// /meta/meta-demo.js
// Front-end helper for Meta Behavior Option D UI
// This RUNS IN THE BROWSER (not a Netlify function)

(function () {
  // Find the preview button
  var previewBtn = document.querySelector(".btn-preview");
  if (!previewBtn) {
    console.warn("Meta demo: .btn-preview button not found");
    return;
  }

  // Ensure we have an output area; create one if it doesn't exist
  var outputContainer = document.getElementById("meta-output");
  if (!outputContainer) {
    outputContainer = document.createElement("pre");
    outputContainer.id = "meta-output";
    outputContainer.className = "json-output";
    outputContainer.style.marginTop = "24px";
    outputContainer.style.fontSize = "11px";
    outputContainer.style.whiteSpace = "pre-wrap";

    var panel = document.querySelector(".panel--output") || document.body;
    panel.appendChild(outputContainer);
  }

  // Optional status line
  var statusLine = document.getElementById("meta-status");
  if (!statusLine) {
    statusLine = document.createElement("div");
    statusLine.id = "meta-status";
    statusLine.style.marginTop = "12px";
    statusLine.style.fontSize = "11px";
    statusLine.style.opacity = "0.8";
    outputContainer.parentNode.insertBefore(statusLine, outputContainer);
  }

  var ORIGINAL_BTN_TEXT = previewBtn.textContent || "Preview Meta Behavior Option D";
  var API_URL = "/.netlify/functions/meta-demo"; // Netlify function endpoint

  function setLoading(isLoading) {
    if (isLoading) {
      previewBtn.disabled = true;
      previewBtn.classList.add("is-loading");
      previewBtn.textContent = "Running Meta Behavior demo…";
      statusLine.textContent = "Contacting Meta Behavior demo engine…";
    } else {
      previewBtn.disabled = false;
      previewBtn.classList.remove("is-loading");
      previewBtn.textContent = ORIGINAL_BTN_TEXT;
    }
  }

  function formatOutput(data) {
    try {
      var lines = [];

      lines.push("META BEHAVIOR ENGINE — OPTION D DEMO");
      lines.push("====================================");
      if (data.engine) lines.push("Engine: " + data.engine);
      if (data.mode) lines.push("Mode: " + data.mode);
      if (data.summary) lines.push("Summary: " + data.summary);
      lines.push("");

      if (data.metrics) {
        lines.push("Key metrics:");
        Object.keys(data.metrics).forEach(function (key) {
          lines.push("  • " + key + ": " + data.metrics[key]);
        });
        lines.push("");
      }

      if (data.narrative && data.narrative.short) {
        lines.push("Short narrative:");
        lines.push("  " + data.narrative.short);
        lines.push("");
      }

      if (data.narrative && data.narrative.long) {
        lines.push("Detailed narrative:");
        lines.push("  " + data.narrative.long);
        lines.push("");
      }

      lines.push("Raw JSON:");
      lines.push(JSON.stringify(data, null, 2));

      return lines.join("\n");
    } catch (e) {
      // Fallback: just show JSON
      return JSON.stringify(data, null, 2);
    }
  }

  async function runMetaDemo() {
    setLoading(true);
    try {
      var res = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error("HTTP " + res.status + " from meta-demo function");
      }

      var data = await res.json();
      outputContainer.textContent = formatOutput(data);
      statusLine.textContent = "Demo response received ✔️";
    } catch (err) {
      console.error("Meta demo error:", err);
      statusLine.textContent = "Meta Behavior demo failed. Please try again.";
      outputContainer.textContent =
        "Error while running Meta Behavior demo:\n" + (err && err.message ? err.message : err);
    } finally {
      setLoading(false);
    }
  }

  // Attach click handler
  previewBtn.addEventListener("click", function (e) {
    e.preventDefault();
    runMetaDemo();
  });
})();
