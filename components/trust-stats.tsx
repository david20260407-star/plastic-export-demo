"use client";

import { Factory, Globe, Users, FileCheck } from "lucide-react";

const stats = [
  {
    icon: Factory,
    value: "30+",
    label: "Years Industry Experience",
    desc: "Deep expertise across raw materials, finished goods, and global supply chains.",
  },
  {
    icon: Globe,
    value: "40+",
    label: "Countries Exported",
    desc: "Reliable delivery to Europe, North America, Asia-Pacific, Middle East, and beyond.",
  },
  {
    icon: Users,
    value: "1,000+",
    label: "Clients Served",
    desc: "Long-term partnerships built on transparent pricing and consistent quality.",
  },
  {
    icon: FileCheck,
    value: "100%",
    label: "Traceability & QC",
    desc: "Full documentation including RoHS, REACH, COA, and third-party SGS reports.",
  },
];

export function TrustStats() {
  return (
    <div className="relative w-full h-full rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-6 md:p-8 overflow-hidden">
      {/* subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 grid gap-5 sm:grid-cols-2">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs font-medium text-slate-300">{s.label}</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
