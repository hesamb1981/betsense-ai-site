"use client";

import { useState } from "react";

type DataSpineResponse = {
  ok: boolean;
  engine: string;
  mode?: string;
  summary?: string;
  message?: string;
  metrics?: Record<string, number | string>;
};

const API_BASE =
  process.env.NEXT_PUBLIC_BETSENSE_API_BASE ||
  "https://betsense-backend.onrender.com";

export default function DataSpinePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DataSpineResponse | null>(null);

  const handleRunDemo = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/dataspine/demo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = (await res.json()) as DataSpineResponse;
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="mx-auto max-w-5xl px-4 pb-20 pt-32">
        {/* هدر شبیه Meta Engine */}
        <section className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-slate-400">
            BetSense internal engines
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">DataSpine Engine</h1>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs text-slate-300 ring-1 ring-slate-700/60">
              OrderBook pressure
            </span>
            <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs text-slate-300 ring-1 ring-slate-700/60">
              Momentum & volatility
            </span>
            <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs text-slate-300 ring-1 ring-slate-700/60">
              Enterprise-ready
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
            The DataSpine Engine turns raw order-book flows, momentum spikes,
            and volatility pockets into a unified pressure profile that can plug
            into BetSense internal engines or external enterprise terminals.
          </p>
        </section>

        {/* بخش توضیح و بولت‌ها */}
        <section className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-900/60 p-6 ring-1 ring-slate-800">
            <h2 className="text-lg font-semibold text-slate-50">
              What the DataSpine Engine does
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Track live pressure bias between home and away flows.</li>
              <li>• Highlight late-comeback risk and squeeze scenarios.</li>
              <li>
                • Blend momentum, volatility, and liquidity imbalances into one
                clean signal.
              </li>
              <li>
                • Provide a plug-and-play API layer for enterprise buyers and
                trading terminals.
              </li>
            </ul>
          </div>

          {/* باکس دمو مثل Meta */}
          <div className="rounded-2xl bg-slate-900/60 p-6 ring-1 ring-slate-800">
            <h2 className="text-lg font-semibold text-slate-50">
              Run DataSpine demo
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              Tap the button to send a sample demo request to the DataSpine
              Engine. This uses the BetSense backend demo endpoint – no live
              market traffic.
            </p>

            <button
              onClick={handleRunDemo}
              disabled={loading}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/20 disabled:opacity-60"
            >
              {loading ? "Running demo…" : "Run DataSpine demo"}
            </button>

            {/* خطا */}
            {error && (
              <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">
                Error: {error}
              </p>
            )}

            {/* نتیجه */}
            {result && (
              <div className="mt-4 rounded-xl bg-black/40 p-3 text-xs text-emerald-100 ring-1 ring-slate-800">
                <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">
                  Demo JSON response
                </div>
                <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-words text-[11px]">
{JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* CTA اتصال دیتا زنده */}
        <section className="mt-8 rounded-2xl bg-slate-900/80 p-6 ring-1 ring-slate-800">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-50">
                Live Connected Data
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                Plug your own live order-book and odds feeds directly into the
                DataSpine Engine via enterprise API integration.
              </p>
            </div>
            <button className="mt-2 inline-flex items-center justify-center rounded-full border border-cyan-400/70 px-4 py-2 text-xs font-medium text-cyan-300 md:mt-0">
              Talk to BetSense about live data
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
