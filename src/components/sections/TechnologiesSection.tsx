"use client";

import { useEffect, useState, useRef } from "react";
import { FaReact, FaNodeJs, FaGitAlt, FaPython } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiPrisma,
  SiPostgresql,
  SiLinear,
  SiCloudflare,
  SiLinux,
  SiDocker,
  SiGithubactions,
  SiTraefikproxy,
  SiExpo,
} from "react-icons/si";
import { IconType } from "react-icons";

interface TechnologiesSectionProps {
  isMobile: boolean;
}

interface Technology {
  icon: IconType;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  category: string;
}

const technologies: Technology[] = [
  {
    icon: FaReact,
    name: "React",
    description: "JavaScript Library",
    color: "#61DAFB",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    category: "Frontend",
  },
  {
    icon: SiTypescript,
    name: "TypeScript",
    description: "JavaScript but better",
    color: "#3178C6",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    category: "Frontend",
  },
  {
    icon: SiNextdotjs,
    name: "Next.js",
    description: "React framework",
    color: "#FFFFFF",
    bgColor: "bg-zinc-500/10",
    borderColor: "border-zinc-500/20",
    category: "Frontend",
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind CSS",
    description: "CSS framework",
    color: "#06B6D4",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    category: "Frontend",
  },
  {
    icon: FaNodeJs,
    name: "Node.js",
    description: "Backend runtime",
    color: "#339933",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    category: "Backend",
  },
  {
    icon: FaPython,
    name: "Python",
    description: "Programming language",
    color: "#3776AB",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    category: "Backend",
  },
  {
    icon: SiPostgresql,
    name: "PostgreSQL",
    description: "SQL database",
    color: "#4169E1",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    category: "Backend",
  },
  {
    icon: FaGitAlt,
    name: "Git",
    description: "Version control",
    color: "#F05032",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    category: "Tools",
  },
  {
    icon: SiDocker,
    name: "Docker",
    description: "Containerization",
    color: "#2496ED",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    category: "DevOps",
  },
  {
    icon: SiLinux,
    name: "Linux",
    description: "Operating system",
    color: "#FCC624",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    category: "DevOps",
  },
  {
    icon: SiTraefikproxy,
    name: "Traefik",
    description: "Reverse proxy",
    color: "#24A1C1",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    category: "DevOps",
  },
  {
    icon: SiExpo,
    name: "Expo",
    description: "React Native platform",
    color: "#FFFFFF",
    bgColor: "bg-zinc-500/10",
    borderColor: "border-zinc-500/20",
    category: "Deployment",
  },
];

// Grid Background (unchanged)
const GridBackground = ({ isMobile }: { isMobile: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);
  const gridSize = isMobile ? "60px 60px" : "100px 100px";
  const minorGridSize = isMobile ? "15px 15px" : "25px 25px";
  const accentGridSize = isMobile ? "200px 200px" : "400px 400px";

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-2000 ${
        isVisible ? "opacity-10" : "opacity-0"
      }`}
    >
      {/* Major */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(63,63,70,0.6) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(63,63,70,0.6) 1px, transparent 1px)`,
          backgroundSize: gridSize,
        }}
      />
      {/* Minor */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(63,63,70,0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(63,63,70,0.3) 1px, transparent 1px)`,
          backgroundSize: minorGridSize,
        }}
      />
      {/* Accent */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(59,130,246,0.2) 2px, transparent 2px),
          linear-gradient(to bottom, rgba(59,130,246,0.2) 2px, transparent 2px)`,
          backgroundSize: accentGridSize,
        }}
      />
    </div>
  );
};

// Simple particle & geometry omitted for brevity...
const FloatingParticles = ({ isMobile }: { isMobile: boolean }) => null;
const FloatingGeometry = ({ isMobile }: { isMobile: boolean }) => null;

// Tech Card (unchanged)
const TechCard = ({
  tech,
  index,
  isVisible,
  isMobile,
}: {
  tech: Technology;
  index: number;
  isVisible: boolean;
  isMobile: boolean;
}) => {
  return (
    <div
      className={`group relative rounded-xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm ${
        isMobile ? "p-4" : "p-6"
      } transition-all duration-700 ease-out ${
        isMobile ? "hover:scale-[1.02]" : "hover:scale-[1.03]"
      } hover:border-zinc-700/80 hover:bg-zinc-800/40 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{ transitionDelay: `${index * (isMobile ? 0.05 : 0.1)}s` }}
    >
      {/* ... icon & content (same as before) */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10"
        style={{
          background: `radial-gradient(circle at center, ${tech.color}15 0%, transparent 70%)`,
        }}
      />
      <div className="flex items-start space-x-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900/80 border border-zinc-800/60 group-hover:border-zinc-700/80 transition-all duration-300 group-hover:scale-110"
          style={{
            boxShadow: `0 0 20px ${tech.color}20, 0 0 40px ${tech.color}10`,
          }}
        >
          <tech.icon
            size={24}
            style={{
              color: tech.color,
              filter: `drop-shadow(0 0 8px ${tech.color}40)`,
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-zinc-100 text-lg group-hover:text-white transition-colors duration-300 truncate">
              {tech.name}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 ml-2">
              {tech.category}
            </span>
          </div>
          <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
            {tech.description}
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${tech.color}60, transparent)`,
        }}
      />
    </div>
  );
};

export default function TechnologiesSection({
  isMobile,
}: TechnologiesSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setCardsVisible(true);
        }),
      { threshold: isMobile ? 0.1 : 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  // Desktop-only scroll parallax
  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen w-full bg-zinc-950 ${
        isMobile ? "px-4 py-16" : "px-8 py-24 md:px-16"
      } overflow-hidden`}
    >
      {/* BG & particles */}
      <GridBackground isMobile={isMobile} />
      <FloatingParticles isMobile={isMobile} />
      <FloatingGeometry isMobile={isMobile} />

      {/* Ambient lights with parallax */}
      <div className="absolute inset-0 transition-all duration-3000">
        <div
          className={`absolute ${
            isMobile
              ? "top-1/4 left-1/4 w-64 h-64"
              : "top-1/4 left-1/4 w-96 h-96"
          } bg-blue-500/3 rounded-full blur-3xl`}
          style={{
            transform: `translateY(${
              isVisible && !isMobile ? scrollY * 0.1 : 0
            }px)`,
          }}
        />
        <div
          className={`absolute ${
            isMobile
              ? "bottom-1/4 right-1/4 w-64 h-64"
              : "bottom-1/4 right-1/4 w-96 h-96"
          } bg-purple-500/3 rounded-full blur-3xl`}
          style={{
            transform: `translateY(${
              isVisible && !isMobile ? -scrollY * 0.1 : 0
            }px)`,
          }}
        />
        <div
          className={`absolute ${
            isMobile
              ? "top-3/4 left-3/4 w-48 h-48"
              : "top-3/4 left-3/4 w-64 h-64"
          } bg-green-500/3 rounded-full blur-3xl`}
          style={{
            transform: `translateY(${
              isVisible && !isMobile ? scrollY * 0.05 : 0
            }px)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={`mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className={`flex items-center ${isMobile ? "mb-4" : "mb-6"}`}>
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent flex-1" />
            <span
              className={`px-6 text-xs text-zinc-500 uppercase tracking-[0.3em]`}
            >
              Technologies
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent flex-1" />
          </div>
          <h2
            className={`${
              isMobile
                ? "text-3xl md:text-4xl mb-4"
                : "text-5xl md:text-6xl mb-6"
            } font-light text-zinc-100 text-center`}
          >
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-100 bg-clip-text text-transparent">
              Current Technologies
            </span>
          </h2>
          <p
            className={`${
              isMobile ? "text-base" : "text-lg"
            } text-zinc-400 max-w-3xl mx-auto text-center leading-relaxed`}
          >
            These are the core tools and frameworks I use in my work
          </p>
        </div>

        {/* Grid with increased gap */}
        <div
          className={`grid gap-${isMobile ? "6" : "8"} ${
            isMobile
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {technologies.map((tech, idx) => (
            <TechCard
              key={idx}
              tech={tech}
              index={idx}
              isVisible={cardsVisible}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <div
          className={`${
            isMobile ? "mt-12" : "mt-20"
          } flex justify-center transition-all duration-1000 ease-out ${
            cardsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1.2s" }}
        >
          <div className="flex items-center space-x-4">
            <div
              className={`h-px ${
                isMobile ? "w-8" : "w-16"
              } bg-gradient-to-r from-transparent to-zinc-500`}
            />
            <div className="w-2 h-2 rounded-full bg-zinc-500" />
            <div
              className={`h-px ${
                isMobile ? "w-16" : "w-32"
              } bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-500`}
            />
            <div className="w-2 h-2 rounded-full bg-zinc-500" />
            <div
              className={`h-px ${
                isMobile ? "w-8" : "w-16"
              } bg-gradient-to-r from-zinc-500 to-transparent`}
            />
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div
        className={`absolute top-0 left-0 ${
          isMobile ? "w-48 h-48" : "w-64 h-64"
        } bg-gradient-to-br from-blue-500/8 to-transparent blur-3xl transition-all duration-3000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 ${
          isMobile ? "w-48 h-48" : "w-64 h-64"
        } bg-gradient-to-tl from-purple-500/8 to-transparent blur-3xl transition-all duration-3000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
