// betsense-ai-site/app/dataspine/page.tsx
"use client";

import React, { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_BETSENSE_BACKEND_URL ||
  "https://betsense-backend.onrender.com";

type DemoResponse = {
  ok: boolean;
  engine: string;
  mode?: string;
  summary?: string;
  metrics?: Record<string, number | string>;
};

export default function DataSpinePage() {
  const [healthResult, setHealthResult] = useState<string | null>(null);
  const [demoResult, setDemoResult] = useState<DemoResponse | null>(null);
  const [loading, setLoading] = useState<"health" | "demo" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runHealthCheck() {
    try {
      setLoading("health");
      setError(null);
      setDemoResult(null);

      const res = await fetch(`${API_BASE}/api/dataspine/health`);
      const json = await res.json();

      setHealthResult(JSON.stringify(json, null, 2));
    } catch (err) {
      setError("Could not reach DataSpine health endpoint.");
      setHealthResult(null);
    } finally {
      setLoading(null);
    }
  }

  async function runDemo() {
    try {
      setLoading("demo");
      setError(null);

      const res = await fetch(`${API_BASE}/api/dataspine/demo`);
      const json = (await res.json()) as DemoResponse;

      setDemoResult(json);
    } catch (err) {
      setError("Could not reach DataSpine demo endpoint.");
      setDemoResult(null);
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* پس‌زمینه گرادیانی شبیه سایت اصلی */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(94,234,212,0.14),_transparent_55%)]" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-16 lg:px-6">
        {/* هدر صفحه */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-[0.25em] text-cyan-200 uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              INTERNAL ENGINE · BETSENSE AI
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              DataSpine Engine
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              The DataSpine Engine fuses{" "}
              <span className="text-cyan-200">
                orderbook pressure, in-play momentum and risk envelopes
              </span>{" "}
              into a single ultra-clean signal for live trading stacks and
              enterprise terminals.
            </p>

            {/* برچسب‌های قابلیت‌ها */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-200">
              <span className="rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-cyan-500/40">
                OrderBook Pressure Layer
              </span>
              <span className="rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-emerald-500/40">
                Momentum + Volatility
              </span>
              <span className="rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-fuchsia-400/40">
                Multi-match Ready
              </span>
            </div>
          </div>

          {/* CTA اصلی – Live Connected Data */}
          <div className="mt-4 flex flex-col items-start gap-3 lg:items-end">
            <a
              href="mailto:hello@betsense.casino?subject=Live%20Data%20Integration%20-%20DataSpine"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.7)] transition hover:bg-emerald-400"
            >
              Live Connected Data
              <span className="text-xs font-semibold text-emerald-950/70">
                API / Feed integration
              </span>
            </a>
            <p className="max-w-xs text-right text-[11px] leading-snug text-slate-400 lg:text-xs">
              Plug your trading feed directly into DataSpine for live sessions,
              risk terminals or partner kiosks.
            </p>
          </div>
        </header>

        {/* لایه اصلی: توضیحات + پنل دمو */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          {/* ستون چپ – توضیح محصول / لایه‌ها */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-cyan-500/40 bg-slate-950/70 p-5 shadow-[0_0_40px_rgba(8,47,73,0.9)] sm:p-6">
              <h2 className="text-sm font-semibold tracking-wide text-cyan-200">
                What DataSpine does
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                DataSpine watches{" "}
                <span className="text-sky-200">
                  live odds ladders, micro-moves and tempo shifts
                </span>{" "}
                then compresses them into one fused edge score. It&apos;s
                designed for shops and trading rooms that need{" "}
                <span className="text-emerald-200">
                  ultra-clean output, not noisy dashboards.
                </span>
              </p>

              <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2 sm:text-sm">
                <div className="rounded-2xl bg-slate-900/70 p-3 ring-1 ring-slate-700/80">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    PRESSURE MAP
                  </p>
                  <p className="mt-2 text-slate-200">
                    Reads orderbook imbalances, stale ladders and squeeze
                    patterns before they show up in raw prices.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/70 p-3 ring-1 ring-slate-700/80">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    MOMENTUM LAYER
                  </p>
                  <p className="mt-2 text-slate-200">
                    Blends in-play tempo with risk envelopes to flag dangerous
                    flips, late comebacks and collapse zones.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3 sm:text-[13px]">
                <div className="rounded-2xl bg-slate-900/60 p-3 ring-1 ring-cyan-500/40">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-cyan-300">
                    SESSION EDGE
                  </p>
                  <p className="mt-1 text-slate-200">
                    Single fused edge score across pre-match + in-play.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/60 p-3 ring-1 ring-emerald-500/40">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-emerald-300">
                    RISK ENVELOPE
                  </p>
                  <p className="mt-1 text-slate-200">
                    Shock windows, ladder stress and exposure heat.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900/60 p-3 ring-1 ring-fuchsia-500/40">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-fuchsia-300">
                    MULTI-MATCH
                  </p>
                  <p className="mt-1 text-slate-200">
                    Built to sit under Ultra Pro and kiosk stacks.
                  </p>
                </div>
              </div>
            </div>

            {/* بلاک کوچک برای نوت‌های اینجین */}
            <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4 text-xs text-slate-300 sm:text-[13px]">
              <p className="font-semibold text-slate-100">
                Enterprise deployment notes
              </p>
              <ul className="mt-2 space-y-1 list-disc pl-4">
                <li>Stateless HTTP or WebSocket stream options.</li>
                <li>Per-shop, per-terminal or single stack licensing.</li>
                <li>Ready to fuse with Emotion, xG and Meta Behavior layers.</li>
              </ul>
            </div>
          </div>

          {/* ستون راست – پنل دمو */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950/95 p-5 shadow-[0_0_40px_rgba(16,185,129,0.85)] sm:p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />

              <h2 className="text-sm font-semibold tracking-wide text-emerald-200">
                Run DataSpine demo
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-200 sm:text-[13px]">
                This panel uses the same pattern as the Meta Behavior demo: a
                lightweight call to the BetSense backend, returning a simulated
                edge snapshot for one fixture.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={runHealthCheck}
                  disabled={loading === "health"}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-400/60 transition hover:bg-slate-900 hover:text-cyan-100 disabled:opacity-60"
                >
                  {loading === "health" ? "Checking health…" : "Ping health"}
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                </button>

                <button
                  onClick={runDemo}
                  disabled={loading === "demo"}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-[0_0_18px_rgba(52,211,153,0.9)] transition hover:bg-emerald-300 disabled:opacity-60"
                >
                  {loading === "demo"
                    ? "Running DataSpine demo…"
                    : "Run demo snapshot"}
                </button>
              </div>

              {error && (
                <p className="mt-3 text-xs font-medium text-rose-300">
                  {error}
                </p>
              )}

              {/* خروجی health */}
              {healthResult && (
                <div className="mt-4 rounded-2xl bg-slate-950/80 p-3 ring-1 ring-cyan-500/40">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    HEALTH RESPONSE
                  </p>
                  <pre className="mt-2 max-h-40 overflow-auto text-[11px] leading-relaxed text-slate-100">
                    {healthResult}
                  </pre>
                </div>
              )}

              {/* خروجی demo */}
              {demoResult && (
                <div className="mt-4 rounded-2xl bg-slate-950/80 p-3 ring-1 ring-emerald-500/50">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    DEMO SNAPSHOT
                  </p>

                  <p className="mt-2 text-xs text-slate-200">
                    {demoResult.summary ||
                      "Sample DataSpine demo response from backend."}
                  </p>

                  <div className="mt-3 grid gap-2 text-[11px] text-slate-100 sm:text-xs">
                    {demoResult.metrics && (
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(demoResult.metrics).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="rounded-xl bg-slate-900/80 px-3 py-2 ring-1 ring-slate-700/80"
                            >
                              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                                {key}
                              </p>
                              <p className="mt-0.5 text-sm text-emerald-200">
                                {String(value)}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <pre className="mt-3 max-h-36 overflow-auto rounded-xl bg-slate-950/80 p-3 text-[11px] leading-relaxed text-slate-100">
                    {JSON.stringify(demoResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* نوت کوچک برای تیم‌های فنی خریدار */}
            <div className="rounded-3xl border border-slate-700/70 bg-slate-950/90 p-4 text-[11px] text-slate-300 sm:text-xs">
              <p className="font-semibold text-slate-100">
                Integration pattern
              </p>
              <p className="mt-1">
                Replace the demo endpoints with your own live feed adapter to
                stream ladder + price data into DataSpine for production
                sessions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
