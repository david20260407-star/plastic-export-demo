"use client";

import { useEffect, useState } from "react";

export function ParticlesBg() {
  const [particles, setParticles] = useState<
    { size: number; left: number; delay: number; duration: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: 30 }).map(() => ({
      size: Math.random() * 4 + 2, // 2px - 6px
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 15,
      opacity: Math.random() * 0.4 + 0.5, // 0.5 - 0.9
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan-200"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: `-${p.size + 4}px`,
            opacity: p.opacity,
            boxShadow: `0 0 ${Math.max(p.size * 4, 6)}px ${Math.max(p.size * 2, 4)}px rgba(103,232,249,0.8)`,
            animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes rise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          8% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50vh) translateX(12px);
          }
          92% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-110vh) translateX(-12px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
