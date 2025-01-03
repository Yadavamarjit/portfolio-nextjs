"use client";
import React, { useEffect, useState } from "react";

export const AIAssistantAnimation = ({ size = 192 }) => {
  const [phase, setPhase] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Calculate scale factor based on default size of 192px (48 * 4)
  const scale = size / 192;

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + (isActive ? 0.03 : 0.015)) % (2 * Math.PI));
    }, 50);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div
      className="relative cursor-pointer"
      style={{ width: size, height: size }}
      onClick={() => setIsActive(!isActive)}
    >
      {/* Background glow */}
      <div
        className={`
          absolute inset-0 rounded-full blur-2xl transition-all duration-1000
          ${
            isActive
              ? "bg-gradient-to-r from-violet-600/40 via-cyan-500/40 to-indigo-600/40 scale-150"
              : "bg-gradient-to-r from-emerald-400-500/30 via-cyan-500/30 to-blue-500/30 scale-125"
          }
        `}
      />

      {/* Inner pattern circles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`pattern-${i}`}
          className={`
            absolute inset-0 rounded-full border transition-all duration-500
            ${isActive ? "border-violet-400/20" : "border-cyan-400/20"}
          `}
          style={{
            transform: `scale(${0.6 + i * 0.15}) rotate(${
              phase * 90 + i * 30
            }deg)`,
          }}
        />
      ))}

      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`
            absolute inset-0 rounded-full transition-all duration-500
            ${
              isActive
                ? "bg-gradient-to-r from-violet-500/60 via-cyan-400/60 to-indigo-500/60"
                : "bg-gradient-to-r from-teal-400/40 via-cyan-400/40 to-blue-400/40"
            }
          `}
          style={{
            transform: `
              translate(
                ${
                  Math.sin(phase + (i * 2 * Math.PI) / 6) *
                  (isActive ? 20 : 15) *
                  scale
                }px,
                ${
                  Math.cos(phase + (i * 2 * Math.PI) / 6) *
                  (isActive ? 20 : 15) *
                  scale
                }px
              ) scale(${0.85 + Math.sin(phase + i) * (isActive ? 0.15 : 0.1)})
            `,
            transition: "transform 0.5s ease-out",
          }}
        />
      ))}

      {/* Central core */}
      <div
        className={`
          absolute inset-0 rounded-full transition-all duration-500
          ${
            isActive
              ? "bg-gradient-to-br from-violet-400 via-cyan-400 to-indigo-400 shadow-lg shadow-violet-500/30"
              : "bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/30"
          }
        `}
      />

      {/* Inner rotating dots - first layer */}
      {[...Array(24)].map((_, i) => (
        <div
          key={`inner-${i}`}
          className={`
            absolute rounded-full transition-colors duration-500
            ${isActive ? "bg-violet-200/70" : "bg-cyan-200/70"}
          `}
          style={{
            width: Math.max(1, scale * 1),
            height: Math.max(1, scale * 1),
            left: "50%",
            top: "50%",
            transform: `
              rotate(${i * 15 - (phase * 180) / Math.PI}deg)
              translateY(-${
                (25 + Math.sin(phase * 2 + i) * (isActive ? 8 : 5)) * scale
              }px)
            `,
            opacity: 0.4 + Math.sin(phase + i) * 0.6,
          }}
        />
      ))}

      {/* Outer rotating dots */}
      {[...Array(32)].map((_, i) => (
        <div
          key={`outer-${i}`}
          className={`
            absolute rounded-full transition-colors duration-500
            ${isActive ? "bg-violet-200" : "bg-cyan-200"}
          `}
          style={{
            width: Math.max(1, scale * 6),
            height: Math.max(1, scale * 6),
            left: "50%",
            top: "50%",
            transform: `
              rotate(${i * 11.25 + (phase * 180) / Math.PI}deg)
              translateY(-${
                (40 + Math.sin(phase * 2 + i) * (isActive ? 15 : 10)) * scale
              }px)
            `,
            opacity: 0.4 + Math.sin(phase + i) * 0.6,
          }}
        />
      ))}

      {/* Additional orbital dots */}
      {[...Array(16)].map((_, i) => (
        <div
          key={`orbital-${i}`}
          className={`
            absolute rounded-full transition-colors duration-500
            ${isActive ? "bg-violet-300/60" : "bg-cyan-300/60"}
          `}
          style={{
            width: Math.max(0.5, scale * 0.5),
            height: Math.max(0.5, scale * 0.5),
            left: "50%",
            top: "50%",
            transform: `
              rotate(${i * 22.5 + (phase * 90) / Math.PI}deg)
              translateY(-${
                (32 + Math.cos(phase * 3 + i) * (isActive ? 10 : 7)) * scale
              }px)
            `,
            opacity: 0.3 + Math.cos(phase + i) * 0.7,
          }}
        />
      ))}

      {/* Inner glow */}
      <div
        className={`
          absolute inset-0 rounded-full blur-md transition-all duration-500
          ${
            isActive
              ? "bg-gradient-to-r from-violet-400/30 via-cyan-400/30 to-indigo-400/30"
              : "bg-gradient-to-r from-teal-400/30 via-cyan-400/30 to-blue-400/30"
          }
        `}
        style={{
          transform: `scale(${
            0.9 + Math.sin(phase * 2) * (isActive ? 0.08 : 0.05)
          })`,
          transition: "transform 0.3s ease-out",
        }}
      />
    </div>
  );
};

// export default AIAssistantAnimation;
