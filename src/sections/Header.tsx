"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.1, transition: { type: "spring", stiffness: 300 } },
  };

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="top-3 flex items-center justify-center fixed w-full z-10 xl:top-5">
      <motion.nav
        className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur text-sm 2xl:text-base transition-all duration-500"
        style={{
          boxShadow: scrolled
            ? "0 0 24px rgba(100,255,218,0.12), 0 4px 20px rgba(0,0,0,0.3)"
            : "none",
          borderColor: scrolled ? "rgba(100,255,218,0.2)" : "rgba(255,255,255,0.15)",
        }}
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: "Home", href: "#home" },
          { label: "Projects", href: "#projects" },
          { label: "About", href: "#about" },
        ].map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            className="nav-item"
            variants={navItemVariants}
            whileHover="hover"
          >
            {item.label}
          </motion.a>
        ))}
        <motion.a
          href="#contact"
          className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
          variants={navItemVariants}
          whileHover="hover"
        >
          Contact
        </motion.a>
      </motion.nav>
    </div>
  );
};
