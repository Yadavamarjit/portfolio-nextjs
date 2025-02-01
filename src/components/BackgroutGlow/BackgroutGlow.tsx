import { motion } from "framer-motion";

export const BackgroundGlow = () => {
  // Glow animation variants
  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, delay: 0.5 } },
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {/* Main background color */}
      <div className="absolute inset-0 bg-[#0a192f]" />

      {/* Primary glow source - top right */}
      <motion.div
        className="absolute top-[15%] left-0 w-[70%] h-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(72 189 160 / 20%) 0%, rgb(100 255 218 / 8%) 45%, rgb(100 255 218 / 0%) 70%)",
          filter: "blur(60px)",
        }}
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      />
    </div>
  );
};
