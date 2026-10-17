import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { id: "github", href: "https://github.com/Yadavamarjit", icon: <Github size={18} />, label: "Github" },
  { id: "linkedin", href: "https://www.linkedin.com/in/yadav-amarjit/", icon: <Linkedin size={18} />, label: "LinkedIn" },
  { id: "email", href: "mailto:yadavamarjit772@gmail.com", icon: <Mail size={18} />, label: "Email" },
];

export default function SocialLinks() {
  return (
    <>
      {/* Desktop: vertical sidebar */}
      <div className="hidden md:flex fixed bottom-0 z-40 left-6 lg:left-10 flex-col gap-y-4 items-center">
        <div className="w-0.5 bg-[#64ffda] rounded-2xl h-20" />
        {socialLinks.map(({ id, href, icon, label }) => (
          <Link key={id} href={href} target="_blank">
            <div className="hover:scale-125 duration-300 hover:text-[#64ffda] text-secondary" aria-label={label}>
              {icon}
            </div>
          </Link>
        ))}
        <div className="w-0.5 bg-[#64ffda] rounded-2xl h-20" />
      </div>

      {/* Mobile: horizontal row at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-6 py-3 px-4 bg-[#0a192f]/90 backdrop-blur-md border-t border-white/10">
        {socialLinks.map(({ id, href, icon, label }) => (
          <Link key={id} href={href} target="_blank">
            <div className="p-2.5 rounded-xl text-secondary hover:text-[#64ffda] hover:bg-[#64ffda]/10 transition-all duration-300 active:scale-95" aria-label={label}>
              {icon}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
