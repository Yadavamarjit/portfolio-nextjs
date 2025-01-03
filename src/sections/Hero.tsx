"use client";

export const HeroSection = () => {
  return (
    <div className="py-16 md:py-24 lg:py-32 min-h-screen px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-[#64ffda] mb-4 text-base sm:text-lg tracking-widest font-mono">
          Hi, my name is
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4">
          Yadav Amarjit.
        </h1>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#8892b0] mb-6 sm:mb-8">
          I build things for the web.
        </h1>

        <div className="relative max-w-xl lg:max-w-2xl">
          <p className="text-[#8892b0] text-base sm:text-lg leading-relaxed duration-300">
            <span className="text-[#64ffda] font-semibold">Code Alchemist</span>{" "}
            and{" "}
            <span className="text-[#64ffda] font-semibold">
              Full-Stack Sorcerer
            </span>{" "}
            turning ideas into digital magic with{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              React
            </span>
            ,{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              Next.js
            </span>
            ,{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              Node.js
            </span>
            ,{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              MongoDB
            </span>
            , and{" "}
            <span className="inline-block text-slate-200 hover:text-[#64ffda] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#64ffda] after:transition-all after:duration-300">
              LLM
            </span>
            . From sleek UIs to smart chatbots, I craft cutting-edge solutions
            and bring bold tech visions to life.
          </p>

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <button className="w-full sm:w-auto group/btn flex items-center justify-center gap-2 px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors duration-300">
              Let's create something extraordinary!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
