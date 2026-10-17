import React from "react";
import {
  Linkedin,
  Mail,
  Calendar,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import dynamic from "next/dynamic";

const MatrixRain = dynamic(() => import("@/components/MatrixRain/MatrixRain"), {
  ssr: false,
});

interface SocialLink {
  id: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
}

const ContactSection: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/yadav-amarjit/",
      icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "LinkedIn",
      description: "Connect professionally & follow my career journey",
      color: "#0077b5",
    },
    {
      id: "email",
      href: "mailto:yadavamarjit772@gmail.com",
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Email",
      description: "Direct communication for opportunities",
      color: "#64ffda",
    },
  ];

  return (
    <section className="relative overflow-hidden" id="contact">
      {/* Matrix rain background */}
      <div className="absolute inset-0 pointer-events-none">
        <MatrixRain />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-[10%] -right-10 sm:-right-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#64ffda] rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-[10%] -left-10 sm:-left-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#8b5cf6] rounded-full opacity-5 blur-3xl" />

      <div className="sec-container overflow-hidden relative z-10">
        <div className="relative z-10 mb-10 sm:mb-16">
          <SectionTitle title="Contact" />
          <div className="mt-6 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              I&apos;m always excited to connect with fellow developers,
              potential collaborators, and anyone interested in creating
              innovative digital experiences.
            </p>
            <p className="text-secondary mt-3 sm:mt-4 font-medium text-sm sm:text-base">
              Choose your preferred way to reach out — I&apos;m just a message away.
            </p>
          </div>
        </div>

        {/* Social links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16 max-w-4xl mx-auto">
          {socialLinks.map((link, i) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
              style={{ "--link-color": link.color } as React.CSSProperties}
            >
              <div
                className="relative p-5 sm:p-7 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-[var(--link-color)]/40 transition-all duration-400 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:-translate-y-1"
                style={{
                  "--link-shadow": `0 0 30px ${link.color}18`,
                } as React.CSSProperties}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div
                    className="p-2.5 sm:p-3 rounded-xl transition-colors duration-300"
                    style={{ background: `${link.color}15` }}
                  >
                    <span
                      className="transition-colors duration-300"
                      style={{ color: link.color }}
                    >
                      {link.icon}
                    </span>
                  </div>
                  <ExternalLink
                    className="w-4 h-4 text-gray-500 group-hover:text-[var(--link-color)] opacity-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <h3
                  className="text-lg sm:text-xl font-semibold text-gray-200 mb-2 transition-colors duration-300 group-hover:text-white"
                >
                  {link.label}
                </h3>
                <p className="text-secondary font-medium text-xs sm:text-sm leading-relaxed">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Calendly block */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative border border-white/10 bg-white/[0.03] backdrop-blur-md rounded-xl p-6 sm:p-10 hover:border-[#64ffda]/30 hover:shadow-[0_0_40px_rgba(100,255,218,0.07)] transition-all duration-400">
            <div className="flex items-start justify-between mb-6 sm:mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-3 sm:mb-4">
                  Let&apos;s Schedule a Meeting
                </h3>
                <p className="text-gray-400 max-w-xl leading-relaxed text-sm sm:text-base">
                  Have an exciting project in mind or want to explore potential
                  collaborations? Let&apos;s find the perfect time to discuss your ideas.
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-full bg-[#64ffda]/10 hidden sm:block">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#64ffda]" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a
                href="https://calendly.com/yadavamarjit772/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#64ffda] text-[#0a192f] rounded-lg font-semibold hover:bg-[#4cd8b5] transition-colors duration-300 text-sm sm:text-base hover:shadow-[0_0_20px_rgba(100,255,218,0.3)]"
              >
                <span>Schedule via Calendly</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                Available for 30-minute discovery calls • Quick response guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
