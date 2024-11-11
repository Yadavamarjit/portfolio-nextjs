import React from "react";
import GraingImg from "@/assets/images/grain.jpg";
const ContactSection = () => {
  return (
    <div className="py-16 pt-12 lg:py-24 lg:pt-20" id="contact">
      <div className="container">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-30">
          <div
            className="absolute inset-0 opacity-5 -z-10"
            style={{ backgroundImage: `url(${GraingImg.src})` }}
          ></div>
          <div className="flex flex-col md:flex-row md:gap-16 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                Let&apos;s create something amazing together
              </h2>
              <p className="text-sm mt-2 md:text-base">
                Ready to bring your next project to life? Let&apos;s connect and
                discuss how I can help you achieve your goals.
              </p>
            </div>
            <a href="mailto:ghzielmorhaf@gmail.com">
              <div className="mt-8 md:mt-0">
                <button className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900 cursor-pointer">
                  <span className="font-semibold">Contact Me</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="size-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17L17 7M7 7h10v10"></path>
                  </svg>
                </button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
