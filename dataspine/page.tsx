"use client";

import React, { useState } from "react";

const API_BASE = "https://betsense-backend.onrender.com";

type DataSpineResponse = {
  ok: boolean;
  engine: string;
  mode?: string;
  summary?: string;
  metrics?: Record<string, number | string>;
  message?: string;
};

export default function DataSpinePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [health, setHealth] = useState<string | null>(null);
  const [demoResult, setDemoResult] = useState<DataSpineResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckHealth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/dataspine/health`);
      if (!res.ok) {
        throw new Error(`Health error: ${res.status}`);
      }
      const json = await res.json();
      setHealth(JSON.stringify(json, null, 2));
    } catch (err: any) {
      setError(err.message || "Health check failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunDemo = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDemoResult(null);

      const res = await fetch(`${API_BASE}/api/dataspine/demo`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(`Demo error: ${res.status}`);
      }

      const json = (await res.json()) as DataSpineResponse;
      setDemoResult(json);
    } catch (err: any) {
      setError(err.message || "Demo request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 pt-24">
        {/* هدر و معرفی، هم‌استایل با بقیه سایت */}
        <header className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300/70">
              BETSENSE INTERNAL ENGINES
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              DataSpine Engine
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.25em] text-sky-200/80">
            <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1">
              Orderbook pressure
            </span>
            <span className="rounded-full border border-sky-500/40 bg-sky-500/5 px-3 py-1">
              Momentum &amp; volatility
            </span>
            <span className="rounded-full border border-sky-500/40 bg-sky-500/5 px-3 py-1">
              Multi-match radar
            </span>
          </div>

          <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
            The DataSpine Engine ingests raw odds, market micro-moves, and order
            book pressure into a unified{" "}
            <span className="font-semibold text-sky-200">
              &quot;Data Spine&quot; flow
            </span>{" "}
            suitable for live consoles, risk dashboards, and enterprise API
            buyers. This page is a simple internal demo to verify the engine is
            online and returning fused signals.
          </p>
        </header>

        {/* بدنه: توضیحات + کارت دمو */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          {/* ستون توضیحی */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-slate-900 to-slate-950 p-6 shadow-[0_0_40px_rgba(56,189,248,0.25)]">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
                What DataSpine does
              </h2>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>• Track live momentum and micro-volatility across markets.</li>
                <li>
                  • Read orderbook pressure and imbalance on home vs away vs
                  draw.
                </li>
                <li>
                  • Detect late-comeback risk, panic flips, and one-way pressure
                  clusters.
                </li>
                <li>
                  • Output clean JSON signals for terminals, APIs, and strategy
                  engines.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                Live Connected Data
              </h3>
              <p className="text-sm text-slate-300">
                This demo uses a pre-built sample response. Enterprise buyers
                can plug in their{" "}
                <span className="font-medium text-sky-200">
                  own live feeds and APIs
                </span>{" "}
                into the DataSpine Engine via the{" "}
                <span className="font-medium text-sky-200">
                  &quot;Live Connected Data&quot;
                </span>{" "}
                integration button on the main suite.
              </p>
            </div>
          </div>

          {/* ستون دمو */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-sky-500/40 bg-slate-900/80 p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
                  Run DataSpine Demo
                </h2>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(52,211,153,0.35)]" />
                  Demo mode
                </span>
              </div>

              <p className="mb-4 text-xs leading-relaxed text-slate-300">
                Tap the button to send a{" "}
                <span className="font-medium text-sky-100">
                  sample request
                </span>{" "}
                to the DataSpine demo endpoint. This does not use real
                production odds; it simply proves the engine and routes are
                wired correctly.
              </p>

              <div className="mb-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleRunDemo}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.55)] transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-sky-500/60"
                >
                  {isLoading ? "Running…" : "Run DataSpine demo"}
                </button>

                <button
                  onClick={handleCheckHealth}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-full border border-sky-400/50 bg-transparent px-4 py-2 text-xs font-semibold text-sky-200 transition hover:bg-sky-500/10 disabled:cursor-not-allowed disabled:border-sky-400/30 disabled:text-sky-300/60"
                >
                  Check health
                </button>
              </div>

              {error && (
                <div className="mb-3 rounded-2xl border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-xs text-rose-100">
                  {error}
                </div>
              )}

              {demoResult && (
                <div className="mb-3 rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Demo response
                  </p>
                  <pre className="max-h-64 overflow-auto text-xs leading-relaxed text-slate-100">
                    {JSON.stringify(demoResult, null, 2)}
                  </pre>
                </div>
              )}

              {health && (
                <div className="rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                    Health status
                  </p>
                  <pre className="max-h-40 overflow-auto text-xs leading-relaxed text-emerald-50">
                    {health}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
