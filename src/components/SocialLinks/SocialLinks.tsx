import React from "react";

import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className="fixed bottom-0 z-50 left-2 md:left-10 writing-mode-90 flex flex-col gap-y-4 items-center ">
      {/* <Link
          href="mailto:yadavamarjit772@gmail.com"
          className="hover:scale-125 duration-300 hover:text-[#64ffda] cursor-pointer"
        >
          <span
            className="text-[#64ffda] text-xs"
            style={{ writingMode: "vertical-lr" }}
          >
            yadavamarjit772@gmail.com
          </span>
        </Link> */}
      {/* <div
          className="w-0.5 bg-[#64ffda] h-28"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        ></div> */}

      <div className="w-0.5 bg-[#64ffda] rounded-2xled- h-28"></div>

      <Github
        className="hover:scale-125 duration-300 hover:text-[#64ffda] cursor-pointer"
        size={20}
      />
      <Linkedin
        className="hover:scale-125 duration-300 hover:text-[#64ffda] cursor-pointer"
        size={20}
      />
      <Instagram
        className="hover:scale-125 transition-all duration-300 hover:text-[#64ffda] cursor-pointer"
        size={20}
      />
      <div className="w-0.5 bg-[#64ffda] rounded-2xled- h-28"></div>
    </div>
  );
}
