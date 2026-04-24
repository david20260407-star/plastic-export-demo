"use client";

import { getDict, type Lang } from "@/lib/i18n";

export function MissionSection({ lang }: { lang: Lang }) {
  const t = getDict(lang).mission;

  return (
    <section className="py-24 relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-[#0a0f1c] to-indigo-950/40" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-sm font-medium tracking-widest text-blue-400 uppercase mb-10">
          {t.heading}
        </h2>

        <div className="mb-10 flex justify-center">
          <svg width="340" height="140" viewBox="0 0 340 140" className="text-slate-200">
            <path
              d="M60 70 L130 70"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="200"
              strokeDashoffset="200"
              className="text-blue-400"
              style={{ animation: "drawLine 1.2s ease-out 0.3s forwards" }}
            />
            <path
              d="M210 70 L280 70"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="200"
              strokeDashoffset="200"
              className="text-blue-400"
              style={{ animation: "drawLine 1.2s ease-out 0.8s forwards" }}
            />

            <g style={{ animation: "popIn 0.6s ease-out 0s forwards, floatY 4s ease-in-out 1.5s infinite", opacity: 0, transformOrigin: "40px 70px" }}>
              <circle cx="40" cy="70" r="30" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.5)" strokeWidth="2" />
              <circle cx="40" cy="70" r="30" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="2" style={{ animation: "pulseSoft 3s ease-in-out 1.8s infinite" }} />
              <text x="40" y="75" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="500">Client</text>
            </g>

            <g style={{ animation: "popIn 0.6s ease-out 0.5s forwards, floatY 4s ease-in-out 1.7s infinite", opacity: 0, transformOrigin: "170px 70px" }}>
              <circle cx="170" cy="70" r="36" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" strokeWidth="2" />
              <circle cx="170" cy="70" r="36" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="2" style={{ animation: "pulseSoft 2.5s ease-in-out 1.2s infinite" }} />
              <text x="170" y="75" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="600">Win-Win</text>
            </g>

            <g style={{ animation: "popIn 0.6s ease-out 1s forwards, floatY 4s ease-in-out 1.9s infinite", opacity: 0, transformOrigin: "300px 70px" }}>
              <circle cx="300" cy="70" r="30" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.5)" strokeWidth="2" />
              <circle cx="300" cy="70" r="30" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="2" style={{ animation: "pulseSoft 3s ease-in-out 2.2s infinite" }} />
              <text x="300" y="75" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="500">Growth</text>
            </g>
          </svg>
        </div>

        <p className="text-3xl md:text-5xl font-semibold text-white mb-3" style={{ animation: "fadeInUp 1s ease-out 0.4s both" }}>
          {t.line1}
        </p>
        <p className="text-3xl md:text-5xl font-semibold text-white mb-8" style={{ animation: "fadeInUp 1s ease-out 0.9s both" }}>
          {t.line2}
        </p>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto" style={{ animation: "fadeInUp 1s ease-out 1.4s both" }}>
          {t.desc}
        </p>
      </div>
    </section>
  );
}
