"use client";

export default function AOIETestPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0F1C",
      color: "white",
      padding: "40px",
      fontFamily: "Inter, sans-serif"
    }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700" }}>
        AOIE · Odds Intelligence Test Console
      </h1>

      <p style={{ marginTop: "10px", opacity: 0.7 }}>
        This page verifies AOIE connection to backend.
      </p>

      <div style={{
        marginTop: "40px",
        padding: "20px",
        background: "#111726",
        borderRadius: "12px",
        border: "1px solid #1e2638"
      }}>
        <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Backend Test</h2>

        <p>Fast Check:</p>

        <a
          href="https://betsense-backend.onrender.com/api/aoie/run"
          style={{
            display: "inline-block",
            marginTop: "10px",
            background: "#22c55e",
            color: "black",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none"
          }}
        >
          Run AOIE Engine
        </a>
      </div>

      <div style={{ marginTop: "40px", opacity: 0.5 }}>
        <p>v1.0 · AOIE Engine Test Page</p>
      </div>
    </div>
  );
}
