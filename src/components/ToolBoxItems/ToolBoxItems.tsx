import Css from "@/assets/icons/css3.svg";
import Git from "@/assets/icons/github.svg";
import HtmlIcon from "@/assets/icons/html5.svg";
import ReactIcon from "@/assets/icons/react.svg";
import JsIcon from "@/assets/icons/square-js.svg";
import Chrome from "@/assets/icons/chrome.svg";
import { TechIcon } from "@/components/TechIcon/TechIcon";

const toolboxItems = [
  { title: "Javascript", iconType: JsIcon },
  { title: "ReactJS", iconType: ReactIcon },
  { title: "NextJS", iconType: JsIcon },
  { title: "HTML5", iconType: HtmlIcon },
  { title: "Tailwind", iconType: Css },
  { title: "Git", iconType: Git },
  { title: "AWS", iconType: HtmlIcon },
  { title: "MUI", iconType: JsIcon },
  { title: "ExpressJS", iconType: ReactIcon },
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
  <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
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
