// app/dataspine/page.tsx
"use client";

import { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_BETSENSE_API_BASE ||
  "https://betsense-backend.onrender.com";

type DemoState = {
  ok: boolean;
  engine: string;
  mode: string;
  summary?: string;
  metrics?: Record<string, number | string>;
};

export default function DataSpinePage() {
  const [demoData, setDemoData] = useState<DemoState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runDemo() {
    try {
      setLoading(true);
      setError(null);
      setDemoData(null);

      const res = await fetch(`${API_BASE}/api/dataspine/demo`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }

      const json = await res.json();
      setDemoData(json);
    } catch (e: any) {
      setError("Demo request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 lg:py-16">
        {/* بالا: تیتر و توضیح کوتاه */}
        <section className="space-y-6">
          <div className="inline-flex flex-wrap gap-2 text-xs font-medium text-sky-300">
            <span className="rounded-full border border-sky-500/40 bg-sky-900/40 px-3 py-1 uppercase tracking-[0.18em]">
              BetSense internal engine
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-900/40 px-3 py-1 uppercase tracking-[0.18em]">
              OrderBook · Quantum layer
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              DataSpine Engine
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              The DataSpine Engine fuses{" "}
              <span className="text-sky-300">
                orderbook pressure, volatility, micro-momentum
              </span>{" "}
              and ladder flows into a single, clean signal for in-play trading
              desks, quant teams and enterprise prediction stacks.
            </p>
          </div>

          {/* دکمه‌ها */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={runDemo}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Running demo…" : "Run DataSpine demo"}
            </button>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-900/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300 hover:border-emerald-300 hover:bg-emerald-900/40"
            >
              Live connected data
              <span className="text-[0.6rem] text-emerald-200/80">
                (API / feeds)
              </span>
            </a>
          </div>
        </section>

        {/* بدنه صفحه: توضیحات + پَنِل دمو */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
          {/* ستون چپ: توضیح‌ها و کارت‌ها */}
          <div className="space-y-8">
            {/* What DataSpine does */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 lg:p-7">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                What the DataSpine Engine does
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                DataSpine turns messy orderbook depth, queue position and price
                velocity into a{" "}
                <span className="text-sky-300">
                  single enterprise-ready pressure profile
                </span>{" "}
                that can be wired straight into risk consoles, auto-trading
                logic or retail-facing products.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-slate-200">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>
                    Track{" "}
                    <span className="text-sky-300">
                      buy/sell imbalances &amp; ladder sweeps
                    </span>{" "}
                    across multiple books and venues.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Detect{" "}
                    <span className="text-emerald-300">
                      spoofing, fading size and micro-momentum flips
                    </span>{" "}
                    before they hit the scoreboard.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                  <span>
                    Build a{" "}
                    <span className="text-fuchsia-300">
                      clean “pressure spine”
                    </span>{" "}
                    that plugs into BetSense Meta-Behavior, Emotion and NSI
                    engines.
                  </span>
                </li>
              </ul>
            </div>

            {/* سه کارت متریک مثل داشبورد حرفه‌ای */}
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard
                label="OrderBook pressure"
                value="74%"
                tone="bullish"
                caption="Net buy-side pressure vs last 5 mins"
              />
              <MetricCard
                label="Volatility band"
                value="Medium"
                tone="neutral"
                caption="Spread, whip and ladder churn"
              />
              <MetricCard
                label="Flip risk window"
                value="3.2 min"
                tone="alert"
                caption="Expected time to next regime flip"
              />
            </div>

            {/* لایه اینترپرایز */}
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-tr from-slate-900/80 via-slate-900/40 to-sky-900/40 p-5 sm:p-6 lg:p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Enterprise layer
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                DataSpine is designed for{" "}
                <span className="text-sky-300">
                  trading houses, quant teams and large sportsbook operators
                </span>{" "}
                that need a hardened signal layer, not a toy dashboard.
              </p>
              <div className="mt-4 grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
                <FeaturePill title="API-first">
                  REST / WebSocket endpoints for live stacks.
                </FeaturePill>
                <FeaturePill title="Multi-feed">
                  Combine odds, ladders &amp; internal books.
                </FeaturePill>
                <FeaturePill title="Stack-ready">
                  Routes directly into BetSense Ultra console.
                </FeaturePill>
              </div>
            </div>
          </div>

          {/* ستون راست: پنل دمو و JSON */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-sky-700/60 bg-slate-900/60 p-5 shadow-[0_0_40px_rgba(56,189,248,0.35)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                    DataSpine demo
                  </p>
                  <p className="text-xs text-slate-300">
                    Sample spine snapshot. In production this panel would be
                    wired to your{" "}
                    <span className="text-sky-300">live orderbook feeds</span>.
                  </p>
                </div>
                <span className="rounded-full border border-emerald-400/60 bg-emerald-900/40 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-emerald-200">
                  Simulated
                </span>
              </div>

              <div className="mt-4 h-[220px] overflow-auto rounded-2xl bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100">
                {error && (
                  <div className="rounded-xl border border-rose-500/60 bg-rose-900/40 px-3 py-2 text-[0.7rem] text-rose-100">
                    {error}
                  </div>
                )}

                {!error && !demoData && !loading && (
                  <p className="text-[0.7rem] text-slate-400">
                    Tap <span className="text-sky-300">“Run DataSpine demo”</span>{" "}
                    above to fetch a sample response from the BetSense backend.
                  </p>
                )}

                {loading && (
                  <p className="animate-pulse text-[0.7rem] text-sky-300">
                    Fetching DataSpine demo snapshot…
                  </p>
                )}

                {demoData && !loading && (
                  <pre className="whitespace-pre-wrap text-[0.7rem]">
                    {JSON.stringify(demoData, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            {/* باکس «چطور استفاده می‌شود» */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 text-xs text-slate-300 sm:p-6">
              <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                How enterprise buyers use DataSpine
              </h4>
              <ul className="mt-3 space-y-2">
                <li>• Pre-trade edge filters for sharp customer queues.</li>
                <li>• In-play micro-momentum layer on top of xG &amp; tempo.</li>
                <li>• Panic / spoof detection inside quant risk consoles.</li>
                <li>
                  • Fused into the BetSense Meta-Behavior Engine as the
                  orderbook spine.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- کامپوننت‌های کوچک داخل همین فایل برای راحتی ---------- */

type MetricProps = {
  label: string;
  value: string;
  tone: "bullish" | "neutral" | "alert";
  caption: string;
};

function MetricCard({ label, value, tone, caption }: MetricProps) {
  const toneColor =
    tone === "bullish"
      ? "text-emerald-300"
      : tone === "alert"
      ? "text-rose-300"
      : "text-sky-300";

  const toneDot =
    tone === "bullish"
      ? "bg-emerald-400"
      : tone === "alert"
      ? "bg-rose-400"
      : "bg-sky-400";

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>
        <span className={`h-1.5 w-1.5 rounded-full ${toneDot}`} />
      </div>
      <p className={`mt-2 text-xl font-semibold ${toneColor}`}>{value}</p>
      <p className="mt-1 text-[0.7rem] text-slate-400">{caption}</p>
    </div>
  );
}

type PillProps = {
  title: string;
  children: React.ReactNode;
};

function FeaturePill({ title, children }: PillProps) {
  return (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-3">
      <p className="text-[0.7rem] font-semibold text-slate-100">{title}</p>
      <p className="mt-1 text-[0.7rem] text-slate-400">{children}</p>
    </div>
  );
}
