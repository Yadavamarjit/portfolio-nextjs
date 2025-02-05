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

const ToolboxGroup = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="flex flex-none py-0.5 gap-6">
    {toolboxItems.map((item) => (
      <div
        className="inline-flex items-center outline outline-2 outline-white/10 rounded-lg gap-4 py-2 px-3"
        key={item.title}
      >
        <TechIcon component={item.iconType} />
        <span className="font-semibold">{item.title}</span>
      </div>
    ))}
  </div>
);

interface MarqueeProps {
  reverse?: boolean;
}

export const ToolBoxItems = ({ reverse = false }: MarqueeProps) => (
  <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] gap-x-6">
    <div
      className={`${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      } flex gap-6`}
    >
      <ToolboxGroup reverse={reverse} />
    </div>
    <div
      className={`${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      } flex gap-6`}
      aria-hidden="true"
    >
      <ToolboxGroup reverse={reverse} />
    </div>
  </div>
);
