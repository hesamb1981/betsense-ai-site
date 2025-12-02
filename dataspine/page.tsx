"use client";

import React, { useState } from "react";

const BACKEND_BASE = "https://betsense-backend.onrender.com";

type DataSpineMetrics = {
  momentumScore?: number;
  volatilityIndex?: number;
  pressureBias?: "home" | "away" | "balanced" | string;
  patternCluster?: string;
};

type DataSpineResponse = {
  ok: boolean;
  engine: string;
  mode: string;
  summary?: string;
  metrics?: DataSpineMetrics;
};

export default function DataSpinePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DataSpineResponse | null>(null);

  const runDemo = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_BASE}/api/dataspine/demo`);
      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }
      const json = (await res.json()) as DataSpineResponse;
      setData(json);
    } catch (err: any) {
      console.error(err);
      setError("Demo request failed. Please check backend status.");
    } finally {
      setLoading(false);
    }
  };

  const healthCheck = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_BASE}/api/dataspine/health`);
      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }
      const json = await res.json();
      setData(json as DataSpineResponse);
    } catch (err: any) {
      console.error(err);
      setError("Health check failed. Please check backend status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Max width wrapper */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 pb-16 pt-20 md:px-8 lg:px-12">
        {/* Header / title */}
        <header className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.25em] text-sky-400">
            BETSENSE INTERNAL ENGINES
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            DataSpine Engine
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            The{" "}
            <span className="font-semibold text-sky-300">DataSpine Engine</span>{" "}
            turns raw odds, in-play tempo and orderbook noise into a clean
            pressure index – ready for{" "}
            <span className="font-semibold">enterprise trading stacks</span>,
            shop terminals and risk consoles.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs font-medium text-slate-200">
            <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1">
              OrderBook pressure
            </span>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1">
              Momentum & tempo curve
            </span>
            <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1">
              Pattern clusters
            </span>
            <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1">
              Enterprise-ready
            </span>
          </div>
        </header>

        {/* Layout: left info – right console */}
        <main className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
          {/* LEFT COLUMN – product story */}
          <section className="space-y-6">
            {/* Primary panel */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-[0_0_80px_rgba(56,189,248,0.15)] backdrop-blur">
              <h2 className="text-sm font-semibold tracking-wide text-sky-300">
                Behavioral pressure spine
              </h2>
              <p className="mt-2 text-sm text-slate-200">
                DataSpine watches{" "}
                <span className="font-medium">live odds, tempo and ladder
                micro-moves</span> to build a single, interpretable pressure
                spine for each match. Perfect for in-play shops, prop builders
                and automated market-making.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Blends <span className="font-medium">momentum,
                    volatility and crowd swing</span> into one fused score.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>
                    Detects <span className="font-medium">late comeback
                    risk</span>, collapse zones and one-sided pressure runs.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                  <span>
                    Ships as an <span className="font-medium">independent
                    engine</span> or fully fused with the BetSense stack.
                  </span>
                </li>
              </ul>
            </div>

            {/* Secondary cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-sky-500/20 bg-slate-900/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
                  SIGNAL LAYER
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Clean pressure index
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  One number to summarise live edge, drawdown risk and shock
                  windows.
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                  INTEGRATION
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Live Connected Data
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Plug your feeds in via one{" "}
                  <span className="font-medium">“Live Connected Data”</span>{" "}
                  endpoint – ready for API buyers and terminals.
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN – demo console */}
          <section className="space-y-4">
            {/* Console header + CTAs */}
            <div className="flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-sky-400">
                  DEMO CONSOLE
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-50">
                  Run DataSpine demo signal
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Sends a sample request to the BetSense backend. No live odds
                  traffic – pure simulation.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:items-end">
                <button
                  onClick={runDemo}
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-5 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 disabled:opacity-60"
                >
                  {loading ? "Running demo…" : "Run DataSpine demo"}
                </button>

                <button
                  onClick={healthCheck}
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-[11px] font-medium text-slate-200 hover:border-sky-500/70 disabled:opacity-50"
                >
                  Check /health
                </button>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Momentum score"
                value={
                  data?.metrics?.momentumScore !== undefined
                    ? `${data.metrics.momentumScore}`
                    : "--"
                }
                helper="0–100 · sustained pressure & tempo"
              />
              <MetricCard
                label="Volatility index"
                value={
                  data?.metrics?.volatilityIndex !== undefined
                    ? `${data.metrics.volatilityIndex}`
                    : "--"
                }
                helper="Shock swings, reversals & chaos"
              />
              <MetricCard
                label="Pressure bias"
                value={
                  data?.metrics?.pressureBias
                    ? data.metrics.pressureBias.toUpperCase()
                    : "--"
                }
                helper="Home vs away edge direction"
              />
              <MetricCard
                label="Pattern cluster"
                value={data?.metrics?.patternCluster || "--"}
                helper="Scenario label for narrative layer"
              />
            </div>

            {/* Raw JSON viewer */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold tracking-[0.25em] text-slate-400">
                  RAW RESPONSE
                </p>
                <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                  /api/dataspine/demo
                </span>
              </div>

              <div className="mt-3 max-h-64 overflow-auto rounded-2xl bg-slate-900/90 p-3 text-[11px] leading-relaxed text-sky-100">
                {error && (
                  <p className="text-red-300">
                    {error}
                  </p>
                )}
                {!error && !data && (
                  <p className="text-slate-400">
                    Tap <span className="font-semibold">Run DataSpine demo</span>{" "}
                    to see a sample JSON payload from the engine.
                  </p>
                )}
                {!error && data && (
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Enterprise footer note */}
        <footer className="border-t border-slate-800 pt-6 text-xs text-slate-500">
          <p>
            DataSpine Engine can be licensed as an independent module or as part
            of the full BetSense AI Suite (Emotion, xG, Quantum, Meta Behavior,
            NSI, RBS). Production feeds connect via REST or WebSocket under the
           {" "}
            <span className="font-semibold text-sky-300">
              Live Connected Data
            </span>{" "}
            layer.
          </p>
        </footer>
      </div>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
};

function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-400">
        {label.toUpperCase()}
      </p>
      <p className="mt-2 text-xl font-semibold text-slate-50">{value}</p>
      <p className="mt-1 text-[11px] text-slate-400">{helper}</p>
    </div>
  );
}
