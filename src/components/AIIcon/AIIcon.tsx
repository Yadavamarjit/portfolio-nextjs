"use client";
import { useMessages } from "@/context/MessageContext";
import React, { useEffect, useState } from "react";

// The original CSS orb — rotating dots, gradient core, glow rings
const CSSOrb = ({
  size,
  phase,
  isActive,
}: {
  size: number;
  phase: number;
  isActive: boolean;
}) => {
  const scale = size / 192;
  return (
    <div className="relative cursor-pointer" style={{ width: size, height: size }}>
      {/* Background glow */}
      <div
        className={`absolute inset-0 rounded-full blur-2xl transition-all duration-1000 ${
          isActive
            ? "bg-gradient-to-r from-violet-600/40 via-cyan-500/40 to-indigo-600/40 scale-150"
            : "bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 scale-125"
        }`}
      />
      {/* Inner pattern circles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`pattern-${i}`}
          className={`absolute inset-0 rounded-full border transition-all duration-500 ${
            isActive ? "border-violet-400/20" : "border-cyan-400/20"
          }`}
          style={{
            transform: `scale(${0.6 + i * 0.15}) rotate(${phase * 90 + i * 30}deg)`,
          }}
        />
      ))}
      {/* Central core */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isActive
            ? "bg-gradient-to-br from-violet-400 via-cyan-400 to-indigo-400 shadow-lg shadow-violet-500/30"
            : "bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/30"
        }`}
      />
      {/* Outer rotating dots */}
      {[...Array(32)].map((_, i) => (
        <div
          key={`outer-${i}`}
          className={`absolute rounded-full transition-colors duration-500 ${
            isActive ? "bg-violet-200" : "bg-cyan-200"
          }`}
          style={{
            width: Math.max(1, scale * 6),
            height: Math.max(1, scale * 6),
            left: "50%",
            top: "50%",
            transform: `rotate(${i * 11.25 + (phase * 180) / Math.PI}deg) translateY(-${
              (40 + Math.sin(phase * 2 + i) * (isActive ? 15 : 10)) * scale
            }px)`,
            opacity: 0.4 + Math.sin(phase + i) * 0.6,
          }}
        />
      ))}
      {/* Inner glow */}
      <div
        className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${
          isActive
            ? "bg-gradient-to-r from-violet-400/30 via-cyan-400/30 to-indigo-400/30"
            : "bg-gradient-to-r from-teal-400/30 via-cyan-400/30 to-blue-400/30"
        }`}
        style={{
          transform: `scale(${0.9 + Math.sin(phase * 2) * 0.08})`,
          transition: "transform 0.3s ease-out",
        }}
      />
    </div>
  );
};

export const AIAssistantAnimation = ({ size = 100 }) => {
  const { toggleMsg, loading } = useMessages();
  const [phase, setPhase] = useState(0);
  const [isActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 0.03) % (2 * Math.PI));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${loading ? "hidden" : "block"} relative cursor-pointer group`}
      style={{ width: size, height: size }}
      onClick={toggleMsg}
      title="Chat with AI Assistant"
    >
      <CSSOrb size={size} phase={phase} isActive={isActive} />

      {/* Tooltip */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-xs font-mono bg-white/10 backdrop-blur border border-white/20 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Ask me anything ✨
      </div>
    </div>
  );
};
