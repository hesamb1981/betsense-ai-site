"use client";

import React, { useState } from "react";

const API_BASE = "https://betsense-backend.onrender.com";

type DemoState = {
  loading: boolean;
  error: string | null;
  data: any | null;
};

export default function DataSpineEnginePage() {
  const [demo, setDemo] = useState<DemoState>({
    loading: false,
    error: null,
    data: null,
  });

  const handleRunDemo = async () => {
    try {
      setDemo({ loading: true, error: null, data: null });

      const res = await fetch(`${API_BASE}/api/dataspine/demo`);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const json = await res.json();
      setDemo({ loading: false, error: null, data: json });
    } catch (err: any) {
      setDemo({
        loading: false,
        error: err?.message || "Demo request failed",
        data: null,
      });
    }
  };

  return (
    <main className="min-h-screen w-full">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        {/* Title + tags */}
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            DataSpine Engine
          </h1>

          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            <span className="rounded-full px-3 py-1 border border-white/10 bg-white/5">
              OrderBook Pressure
            </span>
            <span className="rounded-full px-3 py-1 border border-white/10 bg-white/5">
              Momentum & Volatility
            </span>
            <span className="rounded-full px-3 py-1 border border-white/10 bg-white/5">
              Pattern Clusters
            </span>
            <span className="rounded-full px-3 py-1 border border-white/10 bg-white/5">
              Enterprise-ready
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            The DataSpine Engine turns raw market pressure, volatility curves,
            and momentum flows into a clear, tradeable “data profile” signal.
            It&apos;s designed for enterprise buyers, API integrations, trading
            terminals, and automated strategy engines.
          </p>
        </header>

        {/* What it does */}
        <section className="mt-10 sm:mt-12 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            What the DataSpine Engine does
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300">
            <li>Map buy/sell pressure and orderbook imbalance.</li>
            <li>Detect high-risk volatility zones and squeeze windows.</li>
            <li>
              Track momentum flips, late comebacks, and exhaustion patterns.
            </li>
            <li>
              Produce a single fused output ready for dashboards, terminals, or
              automated strategies.
            </li>
          </ul>
        </section>

        {/* Demo card */}
        <section className="mt-10 sm:mt-12">
          <div className="rounded-3xl border border-white/8 bg-black/20 backdrop-blur-sm p-5 sm:p-6 lg:p-7 space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-semibold">
                Run DataSpine Demo
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                Tap the button to send a sample request to the DataSpine demo
                endpoint. This is a pre-built simulation, not live trading
                traffic.
              </p>
            </div>

            <button
              onClick={handleRunDemo}
              disabled={demo.loading}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm sm:text-base font-medium bg-teal-400 text-black disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {demo.loading ? "Running demo..." : "Run DataSpine Demo"}
            </button>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap break-all font-mono text-[11px] sm:text-xs leading-relaxed">
{JSON.stringify(demo.data ?? { ok: true, engine: "DataSpine", message: "Tap the button to run the demo." }, null, 2)}
              </pre>

              {demo.error && (
                <p className="mt-2 text-red-400 text-[11px] sm:text-xs">
                  Error: {demo.error}
                </p>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
