import Css from "@/assets/icons/css3.svg";
import Git from "@/assets/icons/github.svg";
import HtmlIcon from "@/assets/icons/html5.svg";
import ReactIcon from "@/assets/icons/react.svg";
import { TechIcon } from "@/components/TechIcon/TechIcon";

import JsIcon from "@/assets/icons/square-js.svg";
import Chrome from "@/assets/icons/chrome.svg";

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

export const ToolBoxItems = () => (
  <div className="flex mt-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
    <div className="flex flex-none py-0.5 gap-6">
      {toolboxItems.map((item) => (
        <div
          className="inline-flex items-center outline outline-2 outline-white/10 rounded-lg gap-4 py-2 px-3"
          key={item.title}
        >
          {/* <span>{}</span> */}
          <TechIcon component={item.iconType} />
          <span className="font-semibold">{item.title}</span>
        </div>
      ))}
    </div>
  </div>
);
