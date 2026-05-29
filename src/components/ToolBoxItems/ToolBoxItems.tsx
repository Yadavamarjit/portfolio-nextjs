import { TechIcon } from "@/components/TechIcon/TechIcon";
import { IoLogoJavascript } from "react-icons/io";
import { FaAws, FaGithub, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiAmazondynamodb, SiMongodb, SiMui } from "react-icons/si";
import { AiFillOpenAI } from "react-icons/ai";

const toolboxItems = [
  { title: "Javascript", iconType: IoLogoJavascript },
  { title: "ReactJS", iconType: FaReact },
  { title: "NextJS", iconType: RiNextjsFill },
  { title: "HTML5", iconType: FaHtml5 },
  { title: "Tailwind", iconType: RiTailwindCssFill },
  { title: "Git", iconType: FaGithub },
  { title: "AWS", iconType: FaAws },
  { title: "MUI", iconType: SiMui },
  { title: "NodeJS", iconType: FaNodeJs },
  { title: "MongoDB", iconType: SiMongodb },
  { title: "OpenAi", iconType: AiFillOpenAI },
  { title: "DynamoDB", iconType: SiAmazondynamodb },
];

const ToolboxGroup = () => (
  <div className="flex flex-none py-0.5 gap-6">
    {toolboxItems.map((item, i) => (
      <div
        key={item.title}
        className="inline-flex items-center outline outline-2 outline-white/10 rounded-lg gap-4 py-2 px-3 hover:outline-[#64ffda]/30 hover:bg-[#64ffda]/5 transition-all duration-300 cursor-default group"
        style={{
          animation: `float ${3 + (i % 4) * 0.5}s ease-in-out ${(i % 6) * 0.3}s infinite`,
        }}
      >
        <TechIcon component={item.iconType} />
        <span className="font-semibold group-hover:text-[#64ffda] transition-colors duration-300">
          {item.title}
        </span>
      </div>
    ))}
  </div>
);

interface MarqueeProps {
  reverse?: boolean;
}

export const ToolBoxItems = ({ reverse = false }: MarqueeProps) => (
  <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] gap-x-6">
    <div className={`${reverse ? "animate-marquee-reverse" : "animate-marquee"} flex gap-6`}>
      <ToolboxGroup />
    </div>
    <div
      className={`${reverse ? "animate-marquee-reverse" : "animate-marquee"} flex gap-6`}
      aria-hidden="true"
    >
      <ToolboxGroup />
    </div>
  </div>
);
