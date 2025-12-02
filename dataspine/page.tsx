"use client";

import { useState } from "react";

type DemoResponse = {
  ok: boolean;
  engine: string;
  mode?: string;
  summary?: string;
  metrics?: Record<string, number | string>;
  [key: string]: any;
};

const API_BASE =
  process.env.NEXT_PUBLIC_BETSENSE_BACKEND_URL ||
  "https://betsense-backend.onrender.com";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-600/80 bg-slate-900/80 px-3 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}

function Dot() {
  return (
    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
  );
}

export default function DataSpinePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DemoResponse | null>({
    ok: true,
    engine: "DataSpine",
    mode: "demo",
    summary: "Sample DataSpine demo response",
    metrics: {
      momentumScore: 78,
      volatilityIndex: 21,
      pressureBias: "home",
      patternCluster: "late-comeback-risk",
    },
  });

  async function runDemo() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/dataspine/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "demo" }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      setResult(json);
    } catch (err) {
      setError(
        "Demo request failed. Please try again or contact BetSense support."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-xs tracking-[0.2em] uppercase text-cyan-300">
            <span>BetSense internal engines</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            <span>DataSpine Engine</span>
          </div>

          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            DataSpine Engine
          </h1>

          <div className="flex flex-wrap gap-3">
            <Badge>OrderBook pressure</Badge>
            <Badge>Momentum curves</Badge>
            <Badge>Flow imbalance</Badge>
            <Badge>Enterprise-ready</Badge>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            The DataSpine Engine reads live orderbook flow, micro-momentum and
            pressure shifts and turns them into clean, session-ready signals for
            trading stacks, in-play models and prediction terminals.
          </p>

          <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            <li className="flex gap-2">
              <Dot />
              <span>
                Detects one-sided orderbook crush and trapped liquidity.
              </span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>Maps pressure swings into a simple momentum-risk score.</span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>
                Blends tempo, volatility and flow imbalance into one signal.
              </span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>
                Designed to plug into live APIs, quant stacks and trading UIs.
              </span>
            </li>
          </ul>
        </section>

        {/* DEMO + SIDE PANEL */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {/* DEMO CARD */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold sm:text-xl">
              Run DataSpine Demo
            </h2>
            <p className="text-sm text-slate-300">
              Tap the button to send a sample demo request to the DataSpine
              Engine. This is a pre-built simulation – no live bookmaker traffic
              is used.
            </p>

            <button
              onClick={runDemo}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Running demo…" : "Run DataSpine demo"}
            </button>

            {error && (
              <p className="text-xs text-red-400">
                {error}
              </p>
            )}

            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300">
                  Demo response
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  JSON · read-only
                </span>
              </div>
              <pre className="max-h-72 overflow-auto rounded-xl bg-black/40 p-3 text-[11px] leading-relaxed text-emerald-100">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>

          {/* SIDE PANEL */}
          <aside className="space-y-5 rounded-2xl border border-slate-700/80 bg-slate-900/50 p-5">
            <h3 className="text-sm font-semibold text-slate-100 tracking-wide">
              What the DataSpine Engine does
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <Dot />
                <span>
                  Reads micro-momentum and pressure bursts across the book.
                </span>
              </li>
              <li className="flex gap-2">
                <Dot />
                <span>
                  Flags late-session squeezes, panic flips and fake moves.
                </span>
              </li>
              <li className="flex gap-2">
                <Dot />
                <span>Outputs a clean, single edge score for each fixture.</span>
              </li>
              <li className="flex gap-2">
                <Dot />
                <span>
                  Built as a standalone engine or part of the BetSense AI Suite.
                </span>
              </li>
            </ul>

            <div className="mt-4 rounded-xl border border-cyan-500/40 bg-cyan-500/5 p-4 text-xs text-cyan-100">
              <p className="mb-1 font-semibold">Live Connected Data</p>
              <p className="text-[11px] text-cyan-100/80">
                Enterprise buyers can plug their own live feeds or APIs directly
                into DataSpine via a dedicated integration layer. The demo here
                runs in offline simulation mode.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
