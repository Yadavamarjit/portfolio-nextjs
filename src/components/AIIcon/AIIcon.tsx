"use client";
import { useMessages } from "@/context/MessageContext";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ─── CSS Orb ──────────────────────────────────────────────────────────────────
const CSSOrb = ({
  size,
  phase,
  isActive,
  isNudging,
}: {
  size: number;
  phase: number;
  isActive: boolean;
  isNudging: boolean;
}) => {
  const scale = size / 192;
  return (
    <div className="relative cursor-pointer" style={{ width: size, height: size }}>
      {/* Background glow — extra bright when nudging */}
      <div
        className={`absolute inset-0 rounded-full blur-2xl transition-all duration-1000 ${
          isNudging
            ? "bg-gradient-to-r from-[#64ffda]/60 via-cyan-400/50 to-teal-400/60 scale-[1.8]"
            : isActive
            ? "bg-gradient-to-r from-violet-600/40 via-cyan-500/40 to-indigo-600/40 scale-150"
            : "bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 scale-125"
        }`}
      />

      {/* Inner pattern circles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`pattern-${i}`}
          className={`absolute inset-0 rounded-full border transition-all duration-500 ${
            isNudging
              ? "border-[#64ffda]/40"
              : isActive
              ? "border-violet-400/20"
              : "border-cyan-400/20"
          }`}
          style={{
            transform: `scale(${0.6 + i * 0.15}) rotate(${phase * 90 + i * 30}deg)`,
          }}
        />
      ))}

      {/* Central core */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isNudging
            ? "bg-gradient-to-br from-[#64ffda] via-cyan-300 to-teal-400 shadow-lg shadow-[#64ffda]/50"
            : isActive
            ? "bg-gradient-to-br from-violet-400 via-cyan-400 to-indigo-400 shadow-lg shadow-violet-500/30"
            : "bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/30"
        }`}
      />

      {/* Outer rotating dots */}
      {[...Array(32)].map((_, i) => (
        <div
          key={`outer-${i}`}
          className={`absolute rounded-full transition-colors duration-500 ${
            isNudging ? "bg-white" : isActive ? "bg-violet-200" : "bg-cyan-200"
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
          isNudging
            ? "bg-gradient-to-r from-[#64ffda]/50 via-cyan-300/50 to-teal-400/50"
            : isActive
            ? "bg-gradient-to-r from-violet-400/30 via-cyan-400/30 to-indigo-400/30"
            : "bg-gradient-to-r from-teal-400/30 via-cyan-400/30 to-blue-400/30"
        }`}
        style={{
          transform: `scale(${0.9 + Math.sin(phase * 2) * 0.08})`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Nudge outer pulse rings */}
      <AnimatePresence>
        {isNudging && (
          <>
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={`nudge-ring-${ring}`}
                className="absolute inset-0 rounded-full border border-[#64ffda]/50"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1 + ring * 0.45, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: ring * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Nudge Tooltip ─────────────────────────────────────────────────────────────
const NudgeTooltip = ({
  onOpen,
  onDismiss,
}: {
  onOpen: () => void;
  onDismiss: (e: React.MouseEvent) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.92 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.92 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
    className="absolute bottom-full mb-3 right-0 w-64 pointer-events-auto"
  >
    {/* Card */}
    <div className="relative rounded-2xl border border-[#64ffda]/30 bg-[#0d1f35]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(100,255,218,0.15)] overflow-hidden">
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#64ffda] to-transparent" />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2 mt-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64ffda] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#64ffda]" />
            </span>
            <span className="text-[#64ffda] text-xs font-mono tracking-widest uppercase">
              AI Assistant
            </span>
          </div>
          {/* Dismiss button */}
          <button
            onClick={onDismiss}
            className="text-gray-500 hover:text-gray-300 transition-colors -mt-0.5 -mr-0.5 p-0.5 rounded"
            aria-label="Dismiss"
          >
            <X size={13} />
          </button>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Curious about Amarjit? I can answer anything — projects, experience, or just say hi 👋
        </p>

        {/* CTA button */}
        <button
          onClick={onOpen}
          className="w-full py-2 rounded-xl bg-[#64ffda]/10 hover:bg-[#64ffda]/20 border border-[#64ffda]/30 hover:border-[#64ffda]/60 text-[#64ffda] text-xs font-semibold tracking-wide transition-all duration-200 hover:shadow-[0_0_16px_rgba(100,255,218,0.2)]"
        >
          Start chatting ✨
        </button>
      </div>

      {/* Bottom caret */}
      <div className="absolute -bottom-[7px] right-[22px] w-3 h-3 rotate-45 border-r border-b border-[#64ffda]/30 bg-[#0d1f35]/90" />
    </div>
  </motion.div>
);

// ─── Main Export ───────────────────────────────────────────────────────────────
export const AIAssistantAnimation = ({ size = 100 }) => {
  const { toggleMsg, loading, showNudge, dismissNudge } = useMessages();
  const [phase, setPhase] = useState(0);
  const [isActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 0.03) % (2 * Math.PI));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    dismissNudge();
    toggleMsg();
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    dismissNudge();
  };

  return (
    <div
      className={`${loading ? "hidden" : "block"} relative cursor-pointer group`}
      style={{ width: size, height: size }}
      // clicking the orb itself also dismisses nudge + opens chat
      onClick={handleOpen}
      title="Chat with AI Assistant"
    >
      {/* Nudge tooltip — rendered above orb, pointer-events isolated */}
      <AnimatePresence>
        {showNudge && (
          <NudgeTooltip onOpen={handleOpen} onDismiss={handleDismiss} />
        )}
      </AnimatePresence>

      {/* Orb — nudge-aware */}
      <motion.div
        animate={showNudge ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={
          showNudge
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      >
        <CSSOrb size={size} phase={phase} isActive={isActive} isNudging={showNudge} />
      </motion.div>

      {/* Default hover tooltip (only when nudge is hidden) */}
      {!showNudge && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-xs font-mono bg-white/10 backdrop-blur border border-white/20 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Ask me anything ✨
        </div>
      )}
    </div>
  );
};
