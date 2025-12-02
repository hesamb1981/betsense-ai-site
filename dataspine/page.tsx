// app/dataspine/page.tsx
"use client";

import { useState } from "react";

type DataSpineDemo = {
  ok: boolean;
  engine: string;
  mode: string;
  summary: string;
  metrics: {
    momentumScore: number;
    volatilityIndex: number;
    pressureBias: "home" | "away" | "balanced";
    patternCluster: string;
  };
};

const demoPayload: DataSpineDemo = {
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
};

export default function DataSpinePage() {
  const [demo, setDemo] = useState<DataSpineDemo | null>(null);

  const handleRunDemo = () => {
    // فعلاً فقط یک شبیه‌سازی محلی – بعداً می‌توانیم به بک‌اند وصل کنیم
    setDemo(demoPayload);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-24 pt-16">
        {/* هدر صفحه */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-1 text-xs font-medium tracking-[0.18em] text-slate-300 uppercase">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
            <span>BetSense internal engines</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              DataSpine Engine
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              The DataSpine Engine cleans, normalises and fuses raw match feeds
              into a stable &quot;data spine&quot; – ready for prediction
              models, visual consoles and live trading stacks.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
            <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1">
              Data normalisation
            </span>
            <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1">
              Feed cleaning
            </span>
            <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1">
              Tempo &amp; pressure layer
            </span>
            <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1">
              Stack-ready signals
            </span>
          </div>
        </section>

        {/* کارت دمو مثل Meta Engine */}
        <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-[1px] shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
          <div className="h-full rounded-3xl bg-slate-950/90 px-5 py-6 sm:px-7 sm:py-7">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold sm:text-xl">
                  Run DataSpine Demo
                </h2>
                <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm">
                  Tap the button to send a sample demo request to the DataSpine
                  Engine. This is a pre-built simulation to show the type of
                  output enterprise buyers can plug into their stacks.
                </p>
              </div>

              <button
                onClick={handleRunDemo}
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(52,211,153,0.85)] transition hover:bg-emerald-300 active:translate-y-[1px]"
              >
                Run DataSpine Demo
              </button>
            </div>

            <pre className="mt-6 max-h-[320px] w-full overflow-x-auto overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-[11px] leading-relaxed text-emerald-100 sm:text-xs">
              {demo
                ? JSON.stringify(demo, null, 2)
                : `// Tap "Run DataSpine Demo" to preview a sample JSON payload\n// This is a static illustrative response for enterprise demos.\n\n${JSON.stringify(
                    demoPayload,
                    null,
                    2
                  )}`}
            </pre>
          </div>
        </section>

        {/* Live Connected Data CTA که گفتی همهٔ انجین‌ها داشته باشن */}
        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-50">
              Live Connected Data
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm">
              Plug your own live feeds, APIs or trading stack directly into the
              DataSpine Engine for production sessions and white-label
              deployments.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-emerald-400/70 bg-slate-950 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-[0_0_16px_rgba(45,212,191,0.45)] transition hover:bg-emerald-400 hover:text-slate-950 sm:text-sm"
          >
            Talk about live integration
          </a>
        </section>
      </div>
    </main>
  );
}
