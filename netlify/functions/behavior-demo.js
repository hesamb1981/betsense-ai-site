// netlify/functions/behavior-demo.js

exports.handler = async () => {
  const payload = {
    engine: "BEHAVIOR_ENGINE",
    mode: "demo-local",
    status: "ok",
    summary: "Behavior Deviation Engine demo response generated successfully.",
    narrative: [
      "Engine scans long-horizon match history to detect stable vs unstable behavioral regimes.",
      "Deviation profile highlights phases where the club breaks from its usual tactical DNA.",
      "Switching-risk markers flag stretches where late-game behavior flips between conservative and high-risk modes.",
      "This demo payload is static – production integrations should call the live Behavior Engine API stack."
    ],
    deviation_profile: {
      sample_window_matches: "last 40–60 matches",
      regime_stability: "mixed",
      high_risk_clusters: 3,
      late_game_flip_probability: "elevated"
    },
    scenario: "BEHAVIOR_LAYER_DEMO"
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(payload, null, 2)
  };
};
