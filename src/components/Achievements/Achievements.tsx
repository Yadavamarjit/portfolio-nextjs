"use client";
import React, { useEffect, useRef, useState } from "react";
import { Award, TrendingUp, Users, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";

const useCounter = (target: number, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const StatCard = ({
  value, suffix, label, icon: Icon, color, delay, started,
}: {
  value: number; suffix: string; label: string;
  icon: React.ElementType; color: string; delay: number; started: boolean;
}) => {
  const count = useCounter(value, 1800, started);
  return (
    <motion.div
      className="relative group rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ borderColor: "rgba(100,255,218,0.3)", y: -4 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}12 0%, transparent 70%)` }}
      />
      <div className="relative z-10 flex items-start justify-between mb-2 sm:mb-3">
        <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: `${color}18` }}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color }} />
        </div>
      </div>
      <div className="relative z-10">
        <div className="flex items-baseline gap-0.5 sm:gap-1">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tabular-nums">
            {count}
          </span>
          <span className="text-lg sm:text-xl font-bold" style={{ color }}>{suffix}</span>
        </div>
        <p className="text-secondary text-xs sm:text-sm mt-1 font-medium leading-tight">{label}</p>
      </div>
    </motion.div>
  );
};

const CertificatesShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [started, setStarted] = useState(false);

  useEffect(() => { if (isInView) setStarted(true); }, [isInView]);

  const stats = [
    { value: 45, suffix: "%", label: "Page load time reduced", icon: Zap, color: "#64ffda", delay: 0 },
    { value: 35, suffix: "%", label: "Customer engagement boost", icon: TrendingUp, color: "#818cf8", delay: 0.1 },
    { value: 1000, suffix: "+", label: "Merchant connections", icon: Users, color: "#f472b6", delay: 0.2 },
    { value: 4, suffix: "yrs", label: "Professional experience", icon: Award, color: "#fb923c", delay: 0.3 },
  ];

  const certificates = [
    { id: 1, title: "Data Science & Analytics", issuer: "UpGrad", date: "2023", imageUrl: "/assets/DS.png" },
    { id: 2, title: "Top Reader year 2024", issuer: "Daily.dev", date: "2024", imageUrl: "/assets/reader.png" },
  ];

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-10 mt-4 sm:mt-6">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Achievements &amp; Certifications
        </motion.h2>
        <motion.p
          className="text-gray-400 mt-2 text-center lg:text-left font-medium text-sm sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Milestones in my tech journey
        </motion.p>
      </div>

      {/* Stat counters — 2×2 on mobile, 4×1 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
        {stats.map((s) => <StatCard key={s.label} {...s} started={started} />)}
      </div>

      {/* Certificate cards — stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            className="group relative rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-900/70 border border-slate-700/60 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/20 hover:border-teal-500/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <div className="relative p-4 sm:p-6 z-10">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="flex-1">
                  <h3 className="text-base sm:text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 flex-shrink-0" />
                    {cert.title}
                  </h3>
                  <p className="text-sm text-teal-400">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
              <div className="relative w-full flex justify-center">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="rounded-xl shadow-lg object-cover w-full max-h-[220px] sm:max-h-[280px]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesShowcase;
