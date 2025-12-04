import React, { useState } from "react";

type AoieRequest = {
  matchId: string;
  market: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
};

type AoieResponse = {
  ok: boolean;
  matchId: string;
  market: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  impliedProbabilities: {
    home: number;
    draw: number;
    away: number;
  };
  normalizedProbabilities: {
    home: number;
    draw: number;
    away: number;
  };
  meta: {
    processedAt: string;
    engine: string;
    success: boolean;
  };
};

const AOIETestPage: React.FC = () => {
  const [form, setForm] = useState<AoieRequest>({
    matchId: "T-ARS-TOT-2025-TEST",
    market: "MAIN",
    odds: {
      home: 2.45,
      draw: 3.1,
      away: 2.9,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AoieResponse | null>(null);

  const handleChange =
    (field: "matchId" | "market") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleOddsChange =
    (field: "home" | "draw" | "away") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value || "0");
      setForm((prev) => ({
        ...prev,
        odds: {
          ...prev.odds,
          [field]: value,
        },
      }));
    };

  const handleRunAoie = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        "https://betsense-backend.onrender.com/api/aoie/run",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Request failed (${response.status}): ${text || "Unknown error"}`
        );
      }

      const data = (await response.json()) as AoieResponse;
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px",
        background: "#050816",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "24px 20px",
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",
          boxShadow: "0 24px 60px rgba(15,23,42,0.8)",
          border: "1px solid rgba(148,163,184,0.25)",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "4px",
          }}
        >
          AOIE · Odds Intelligence Test Console
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#9ca3af",
            marginBottom: "24px",
          }}
        >
          Internal engine test for BetSense Quantum Sports Intelligence.
        </p>

        {/* FORM */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              padding: "16px",
              borderRadius: "16px",
              border: "1px solid rgba(55,65,81,0.9)",
              background:
                "radial-gradient(circle at top, rgba(56,189,248,0.08), transparent 58%)",
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "4px",
                  color: "#e5e7eb",
                }}
              >
                Match ID
              </label>
              <input
                type="text"
                value={form.matchId}
                onChange={handleChange("matchId")}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: "10px",
                  border: "1px solid #4b5563",
                  background: "#020617",
                  color: "#f9fafb",
                  fontSize: "13px",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "4px",
                  color: "#e5e7eb",
                }}
              >
                Market
              </label>
              <input
                type="text"
                value={form.market}
                onChange={handleChange("market")}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: "10px",
                  border: "1px solid #4b5563",
                  background: "#020617",
                  color: "#f9fafb",
                  fontSize: "13px",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "4px",
                }}
              >
                {(["home", "draw", "away"] as const).map((field) => (
                  <div key={field} style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        marginBottom: "4px",
                        textTransform: "capitalize",
                        color: "#e5e7eb",
                      }}
                    >
                      {field} odds
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.odds[field]}
                      onChange={handleOddsChange(field)}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: "10px",
                        border: "1px solid #4b5563",
                        background: "#020617",
                        color: "#f9fafb",
                        fontSize: "13px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ACTION PANEL */}
          <div
            style={{
              padding: "16px",
              borderRadius: "16px",
              border: "1px solid rgba(55,65,81,0.9)",
              background:
                "radial-gradient(circle at top, rgba(129,140,248,0.14), transparent 60%)",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#e5e7eb",
                marginBottom: "12px",
              }}
            >
              Submit odds to AOIE backend and return{" "}
              <span style={{ color: "#a5b4fc" }}>implied</span> and{" "}
              <span style={{ color: "#a5b4fc" }}>normalized</span>{" "}
              probabilities.
            </p>

            <button
              onClick={handleRunAoie}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "999px",
                border: "none",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "default" : "pointer",
                background:
                  "linear-gradient(135deg, #22c55e, #a3e635, #22c55e)",
                color: "#020617",
                boxShadow: loading
                  ? "none"
                  : "0 18px 35px rgba(22,163,74,0.55)",
                opacity: loading ? 0.7 : 1,
                transition: "transform 0.12s ease, box-shadow 0.12s ease",
              }}
            >
              {loading ? "Running AOIE…" : "Run AOIE Test"}
            </button>

            {error && (
              <div
                style={{
                  marginTop: "14px",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.6)",
                  color: "#fecaca",
                  whiteSpace: "pre-wrap",
                }}
              >
                Error: {error}
              </div>
            )}

            {result && (
              <div
                style={{
                  marginTop: "14px",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  background: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(148,163,184,0.4)",
                  color: "#e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "12px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: "#a5b4fc",
                    }}
                  >
                    Output
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                    }}
                  >
                    {result.meta?.engine} •{" "}
                    {new Date(result.meta?.processedAt).toLocaleTimeString()}
                  </span>
                </div>

                <pre
                  style={{
                    margin: 0,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco",
                    fontSize: "11px",
                    lineHeight: 1.5,
                    maxHeight: "260px",
                    overflow: "auto",
                  }}
                >
{JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AOIETestPage;
