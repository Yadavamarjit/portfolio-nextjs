import React from "react";
import {
  Linkedin,
  Instagram,
  Mail,
  Calendar,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";

interface SocialLink {
  id: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

const ContactSection: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/yadav-amarjit/",
      icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "LinkedIn",
      description: "Connect professionally & follow my career journey",
    },
    {
      id: "instagram",
      href: "https://www.instagram.com/amerjit.yadav___/",
      icon: <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Instagram",
      description: "Follow my creative side & daily inspirations",
    },
    {
      id: "email",
      href: "mailto:yadavamarjit772@gmail.com",
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Email",
      description: "Direct communication for opportunities",
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 sm:px-0" id="contact">
      {/* Background Effects - Adjusted for mobile */}
      <div className="absolute top-[10%] -right-10 sm:-right-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#64ffda] rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-[10%] -left-10 sm:-left-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#64ffda] rounded-full opacity-5 blur-3xl" />

      <div className="sec-container overflow-hidden">
        <div className="relative z-10 mb-10 sm:mb-20">
          <SectionTitle title="Contact" />
          <div className="mt-4 sm:mt-6 max-w-2xl">
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              I&apos;m always excited to connect with fellow developers,
              potential collaborators, and anyone interested in creating
              innovative digital experiences.
            </p>
            <p className="text-secondary mt-3 sm:mt-4 font-medium text-sm sm:text-base">
              Choose your preferred way to reach out — I&apos;m just a message
              away.
            </p>
          </div>
        </div>

        {/* Social Links Section - Adjusted for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-20 max-w-4xl mx-auto">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="absolute inset-0 bg-[#64ffda] opacity-5 blur-sm rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative p-4 sm:p-8 rounded-lg border border-secondary hover:scale-105 hover:border-[#64ffda] transform hover:translate-y-0 transition-all duration-300">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 rounded-full bg-[#0a192f] group-hover:bg-[#64ffda]/10 transition-colors duration-300">
                    <span className="text-gray-400 group-hover:text-[#64ffda] transition-colors duration-300">
                      {link.icon}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#64ffda] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-200 group-hover:text-[#64ffda] mb-2 sm:mb-3 transition-colors duration-300">
                  {link.label}
                </h3>
                <p className="text-secondary font-medium text-xs sm:text-sm leading-relaxed">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Calendly Section - Adjusted for mobile */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-[#64ffda] opacity-5 blur-sm rounded-lg" />
          <div className="relative border border-secondary bg-[#112240] rounded-lg p-6 sm:p-10 hover:scale-105 hover:border-[#64ffda] transition-all duration-300">
            <div className="flex items-start justify-between mb-6 sm:mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-3 sm:mb-4">
                  Let&apos;s Schedule a Meeting
                </h3>
                <p className="text-gray-400 max-w-xl leading-relaxed text-sm sm:text-base">
                  Have an exciting project in mind or want to explore potential
                  collaborations? Let&apos;s find the perfect time to discuss
                  your ideas.
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-full bg-[#0a192f]">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#64ffda]" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a
                href="https://calendly.com/yadavamarjit772/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#64ffda] text-[#0a192f] rounded-lg font-medium hover:bg-[#4cd8b5] transition-colors duration-300 text-sm sm:text-base"
              >
                <span>Schedule via Calendly</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                Available for 30-minute discovery calls • Quick response
                guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
