// components/LiveConnectedDataButton.js

import React from "react";

export default function LiveConnectedDataButton({
  engineName = "Engine",
  apiUrl = "#",
  docsUrl = "#",
}) {
  return (
    <div className="mt-10 w-full max-w-xl mx-auto rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
            Live Connected Data
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            Plug your own live data into {engineName}
          </h3>
          <p className="mt-1 text-sm text-white/70">
            Connect your enterprise feeds or APIs directly into this engine.
            One tap, one secure endpoint, fully isolated from all other cores.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={apiUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium
                       bg-emerald-400 text-slate-900 hover:bg-emerald-300
                       transition-transform duration-150 active:scale-95"
          >
            Live Connected Data
          </a>

          <a
            href={docsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-emerald-200/80 hover:text-emerald-100 underline underline-offset-4"
          >
            View integration guide
          </a>
        </div>

        <p className="text-[11px] leading-relaxed text-white/50">
          This endpoint is dedicated only to <span className="font-semibold text-white">{engineName}</span>.
          It never shares state or criteria with any other BetSense Ultra core.
          Each enterprise connection runs in its own isolated lane.
        </p>
      </div>
    </div>
  );
}
