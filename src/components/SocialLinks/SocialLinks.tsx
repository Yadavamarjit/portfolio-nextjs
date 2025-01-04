import React from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    id: "github",
    href: "https://github.com/your-profile",
    icon: <Github size={20} />,
    label: "Github",
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/yadav-amarjit/",
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/amerjit.yadav___/",
    icon: <Instagram size={20} />,
    label: "Instagram",
  },
  {
    id: "email",
    href: "mailto:yadavamarjit772@gmail.com",
    icon: <Mail size={20} />,
    label: "Email",
  },
];

export default function SocialLinks() {
  return (
    <div className="fixed bottom-0 z-50 left-2 md:left-10 writing-mode-90 flex flex-col gap-y-4 items-center ">
      <div className="w-0.5 bg-[#64ffda] rounded-2xl h-28"></div>
      {socialLinks.map(({ id, href, icon, label }) => (
        <Link key={id} href={href} target="_blank">
          <div
            className="hover:scale-125 duration-300 hover:text-[#64ffda] cursor-pointer text-secondary"
            aria-label={label}
          >
            {icon}
          </div>
        </Link>
      ))}
      <div className="w-0.5 bg-[#64ffda] rounded-2xl h-28"></div>
    </div>
  );
}
