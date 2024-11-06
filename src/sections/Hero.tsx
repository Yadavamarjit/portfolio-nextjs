import memojiImage from "@/assets/images/memoji-computer.png";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import GraingImg from "@/assets/images/grain.jpg";
import Image from "next/image";
export const HeroSection = () => {
  return (
    <div className="py-32 md:py-48 lg:py-60 z-0 relative">
      <div
        className="inset-0 absolute -z-30 opacity-5"
        style={{ backgroundImage: `url(${GraingImg.src})` }}
      ></div>
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>
      </div>
      <div className="container">
        <div className="flex items-center flex-col">
          <Image className="size-[100px]" src={memojiImage} alt="hero-image" />
          <div className="bg-gray-950 border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 rounded-full"></div>
            <div className="text-sm font-medium">
              Available for new Projects
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-lg">
          <h1 className="text-3xl  mt-8 md:text-5xl tracking-wide text-center font-serif">
            Building exceptional user experiences
          </h1>
          <p className="text-center text-white/60 mt-4 md:text-lg">
            Fullstack Dev, crafting seamless experiences. Innovator and problem
            solver.
          </p>
        </div>
        <div className="flex flex-col items-center mt-8 gap-4 md:flex-row justify-center">
          <button className="inline-flex items-center gap-2 border rounded-xl border-white/15 px-6 h-12">
            <span className="font-semibold">Explore my work</span>
            <ArrowDown className="size-4" />
          </button>
          <button className="inline-flex items-center gap-2 border rounded-xl border-white bg-white text-gray-800 px-6 h-12">
            <span>👋</span>
            <span className="font-semibold">Let's connect</span>
          </button>
        </div>
      </div>
    </div>
  );
};
