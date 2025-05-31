"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/iiroan",
    label: "GitHub",
    color: "hover:text-zinc-100",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/roan-van-westerop/",
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: FaEnvelope,
    href: "mailto:hello@roan.dev",
    label: "Email",
    color: "hover:text-green-400",
  },
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-zinc-950 border-t border-zinc-800/50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950 pointer-events-none" />

      <div className="relative px-4 py-8 md:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-6">
            {/* Brand section */}
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Image
                  src="/logo.png"
                  alt="Roan Logo"
                  width={32}
                  height={32}
                  className="opacity-80"
                />
                <span className="text-lg md:text-xl font-light text-zinc-100">
                  Roan<span className="text-zinc-400">.</span>
                  <span className="text-zinc-500">dev</span>
                </span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto md:mx-0">
                Full-stack developer working on creating top-tier digital
                experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 text-center md:text-left"></div>

            {/* Connect section */}
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
                Let's Connect
              </h3>
              <p className="text-sm text-zinc-500 max-w-sm mx-auto md:mx-0">
                Reach out for collaborations or just to say hello!
              </p>
              <div className="flex justify-center md:justify-start space-x-4 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      text-zinc-600 transition-all duration-200
                      ${social.color} hover:scale-110
                    `}
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="md:w-5 md:h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/50" />
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-6 p-2 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-center md:text-left">
            <div className="text-sm text-zinc-600">
              © {currentYear} Roan.dev. All rights reserved.
            </div>
            {/* Systems Online indicator */}
            <div className="flex justify-center items-center space-x-3">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
              </div>
              <span className="text-xs text-green-400 uppercase tracking-wider font-medium">
                Systems Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-purple-500/5 rounded-full blur-3xl" />
    </footer>
  );
}
