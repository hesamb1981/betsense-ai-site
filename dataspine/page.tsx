"use client";

import React, { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_BETSENSE_API_BASE ||
  "https://betsense-backend.onrender.com";

export default function DataSpinePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const handleRunDemo = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/dataspine/demo`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(`Demo request failed (${res.status})`);
      }

      const json = await res.json();
      setResult(json);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const prettyJson = result
    ? JSON.stringify(result, null, 2)
    : `// DataSpine demo response will appear here
// Tap "Run DataSpine Demo" to see a sample output.`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
      {/* صفحه را در وسط نگه می‌داریم مثل استایل اصلی سایت */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 pb-16 pt-24 md:px-8 lg:pt-28">
        {/* هدر و تیتر اصلی */}
        <section className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-300/80">
            BETSENSE INTERNAL ENGINE
          </p>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl lg:text-6xl">
            DataSpine Engine
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            The DataSpine Engine reads{" "}
            <span className="font-semibold text-slate-100">
              orderbook pressure, tempo swings and micro-momentum
            </span>{" "}
            across thousands of odds updates and turns it into one clean,
            actionable signal for in-play trading stacks.
          </p>

          {/* تگ‌های بالای صفحه – شبیه سایت اصلی */}
          <div className="flex flex-wrap gap-3 pt-2 text-xs md:text-[13px]">
            <span className="rounded-full border border-teal-400/40 bg-teal-400/10 px-4 py-1.5 tracking-[0.2em] text-teal-200">
              ORDERBOOK PRESSURE
            </span>
            <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-1.5 tracking-[0.2em] text-sky-200">
              MOMENTUM RADAR
            </span>
            <span className="rounded-full border border-purple-400/40 bg-purple-400/10 px-4 py-1.5 tracking-[0.2em] text-purple-200">
              MULTI-MATCH DEPTH
            </span>
          </div>
        </section>

        {/* دو ستون: توضیحات + کارت دمو */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          {/* ستون چپ: توضیحات تجاری */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
              What the DataSpine Engine does
            </h2>

            <ul className="space-y-3 text-sm leading-relaxed text-slate-300 md:text-[15px]">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-300" />
                <span>
                  Tracks <span className="font-semibold">live orderbook</span>{" "}
                  and liquidity to spot when markets are leaning too hard one
                  way.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" />
                <span>
                  Maps <span className="font-semibold">micro-momentum</span>{" "}
                  and pressure bursts that don&apos;t show up in scoreline
                  alone.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-300" />
                <span>
                  Blends <span className="font-semibold">volatility</span>,{" "}
                  <span className="font-semibold">shock risk</span> and{" "}
                  <span className="font-semibold">late comebacks</span> into one
                  spine-style risk curve.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <span>
                  Creates a single{" "}
                  <span className="font-semibold">DataSpine signal</span> ready
                  to plug into trading screens, prediction engines and
                  enterprise APIs.
                </span>
              </li>
            </ul>

            {/* باکس کوچک برای دکمه Live Connected Data */}
            <div className="mt-4 rounded-2xl border border-teal-400/30 bg-slate-900/50 px-4 py-4 text-xs text-slate-300 backdrop-blur">
              <p className="font-semibold text-teal-200">
                Live Connected Data · Enterprise
              </p>
              <p className="mt-1">
                Production buyers can plug their own live odds, orderbook or
                risk feeds into the DataSpine Engine via a single{" "}
                <span className="font-mono text-[11px] text-teal-200">
                  /dataspine
                </span>{" "}
                endpoint.
              </p>
            </div>
          </div>

          {/* ستون راست: کارت دمو */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-[0_0_60px_rgba(0,0,0,0.7)] backdrop-blur md:p-6">
              <h3 className="text-sm font-semibold tracking-tight text-slate-50 md:text-base">
                Run DataSpine Demo
              </h3>
              <p className="mt-2 text-xs text-slate-300 md:text-[13px]">
                Tap the button below to send a sample demo request to the
                DataSpine Engine. This uses the same backend stack as your
                internal Meta engine demo.
              </p>

              <button
                onClick={handleRunDemo}
                disabled={loading}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-500/40 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Running demo…" : "Run DataSpine Demo"}
              </button>

              {error && (
                <p className="mt-3 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
                  Demo error: {error}
                </p>
              )}

              <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-3 text-[11px] leading-relaxed text-slate-200 md:text-xs">
                <div className="flex items-center justify-between pb-2 text-[11px] text-slate-400">
                  <span className="font-mono">DataSpine demo JSON</span>
                  <span className="rounded-full border border-teal-400/40 bg-teal-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-teal-200">
                    Read-only
                  </span>
                </div>
                <pre className="max-h-64 overflow-auto whitespace-pre text-[11px] md:text-[11px]">
                  {prettyJson}
                </pre>
              </div>
            </div>

            {/* وضعیت health بک‌اند */}
            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 px-4 py-3 text-[11px] text-slate-300">
              <p className="font-semibold text-slate-100">
                Backend health · DataSpine
              </p>
              <p className="mt-1">
                Health endpoint:
                <a
                  href={`${API_BASE}/api/dataspine/health`}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 font-mono text-[11px] text-teal-300 underline underline-offset-2"
                >
                  {API_BASE}/api/dataspine/health
                </a>
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Used by internal monitors and future enterprise consoles.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
