"use client";
import { motion } from "framer-motion";

export const Header = () => {
  // Animation variants for the nav items
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.1, transition: { type: "spring", stiffness: 300 } },
  };

  // Animation for the entire nav container
  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
      },
    },
  };

  return (
    <div className="top-3 flex items-center justify-center fixed w-full z-10 xl:top-5">
      <motion.nav
        className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur text-sm 2xl:text-base"
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.a
          href="#home"
          className="nav-item"
          variants={navItemVariants}
          whileHover="hover"
        >
          Home
        </motion.a>
        <motion.a
          href="#projects"
          className="nav-item"
          variants={navItemVariants}
          whileHover="hover"
        >
          Projects
        </motion.a>
        <motion.a
          href="#about"
          className="nav-item"
          variants={navItemVariants}
          whileHover="hover"
        >
          About
        </motion.a>
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
