"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaReact, FaNodeJs, FaGitAlt, FaPython } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiPrisma,
  SiPostgresql,
  SiExpo,
  SiRailway,
  SiLinear,
  SiCloudflare,
  SiLinux,
  SiDocker,
  SiPodman,
  SiGithubactions,
  SiTraefikproxy,
} from "react-icons/si";

const iconComponents = {
  react: FaReact,
  node: FaNodeJs,
  git: FaGitAlt,
  python: FaPython,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  nextjs: SiNextdotjs,
  prisma: SiPrisma,
  postgresql: SiPostgresql,
  expo: SiExpo,
  railway: SiRailway,
  linear: SiLinear,
  cloudflare: SiCloudflare,
  linux: SiLinux,
  docker: SiDocker,
  podman: SiPodman,
  cicd: SiGithubactions,
  traefik: SiTraefikproxy,
};

// Simplified tech clusters for mobile (similar to desktop but fewer icons and simpler)
const mobileTechClusters = {
  topLeft: {
    position: { top: "8%", left: "6%" },
    icons: [
      { icon: "react", color: "#61DAFB", size: 28, x: 0, y: 0, delay: 0.2 },
      {
        icon: "typescript",
        color: "#3178C6",
        size: 24,
        x: 45,
        y: 25,
        delay: 0.4,
      },
    ],
  },
  topRight: {
    position: { top: "12%", right: "8%" },
    icons: [
      { icon: "nextjs", color: "#FFFFFF", size: 26, x: 0, y: 0, delay: 0.6 },
      { icon: "node", color: "#339933", size: 28, x: -30, y: 35, delay: 0.8 },
    ],
  },
  bottomLeft: {
    position: { bottom: "18%", left: "8%" },
    icons: [
      { icon: "docker", color: "#2496ED", size: 25, x: 0, y: 0, delay: 1.0 },
      { icon: "git", color: "#F05032", size: 24, x: 45, y: -15, delay: 1.2 },
    ],
  },
  bottomRight: {
    position: { bottom: "15%", right: "8%" },
    icons: [
      { icon: "tailwind", color: "#06B6D4", size: 26, x: 0, y: 0, delay: 1.4 },
      {
        icon: "postgresql",
        color: "#4169E1",
        size: 27,
        x: -35,
        y: 25,
        delay: 1.6,
      },
    ],
  },
};

// Desktop tech clusters (original complex version)
const desktopTechClusters = {
  frontend: {
    position: { top: "12%", left: "5%" },
    icons: [
      { icon: "react", color: "#61DAFB", size: 42, x: 0, y: 0, delay: 0.2 },
      {
        icon: "typescript",
        color: "#3178C6",
        size: 36,
        x: 85,
        y: -15,
        delay: 0.4,
      },
      { icon: "nextjs", color: "#FFFFFF", size: 40, x: -25, y: 75, delay: 0.6 },
      {
        icon: "tailwind",
        color: "#06B6D4",
        size: 38,
        x: 110,
        y: 60,
        delay: 0.8,
      },
    ],
  },
  backend: {
    position: { top: "15%", right: "5%" },
    icons: [
      { icon: "node", color: "#339933", size: 44, x: 0, y: 0, delay: 1.0 },
      { icon: "python", color: "#3776AB", size: 42, x: -75, y: 65, delay: 1.2 },
      { icon: "prisma", color: "#2D3748", size: 36, x: 85, y: 35, delay: 1.4 },
      {
        icon: "postgresql",
        color: "#4169E1",
        size: 40,
        x: 15,
        y: 95,
        delay: 1.6,
      },
    ],
  },
  tools: {
    position: { bottom: "18%", left: "5%" },
    icons: [
      { icon: "git", color: "#F05032", size: 36, x: 0, y: 0, delay: 1.8 },
      { icon: "linear", color: "#5E6AD2", size: 34, x: 75, y: -20, delay: 2.0 },
      {
        icon: "cloudflare",
        color: "#F38020",
        size: 38,
        x: -35,
        y: 65,
        delay: 2.2,
      },
    ],
  },
  devops: {
    position: { bottom: "15%", right: "5%" },
    icons: [
      { icon: "docker", color: "#2496ED", size: 40, x: 0, y: 0, delay: 2.4 },
      { icon: "linux", color: "#FCC624", size: 38, x: 80, y: -25, delay: 2.6 },
      { icon: "podman", color: "#892CA0", size: 36, x: -30, y: 70, delay: 2.8 },
      {
        icon: "traefik",
        color: "#24A1C1",
        size: 34,
        x: 110,
        y: 50,
        delay: 3.0,
      },
    ],
  },
  deployment: {
    position: { bottom: "15%", right: "25%" },
    icons: [
      { icon: "railway", color: "#FFFFFF", size: 32, x: 0, y: 0, delay: 3.2 },
      { icon: "expo", color: "#FFFFFF", size: 34, x: 85, y: -25, delay: 3.4 },
      { icon: "cicd", color: "#2088FF", size: 36, x: -40, y: 60, delay: 3.6 },
    ],
  },
};

// Simplified grid background
const GridBackground = ({ isMobile }: { isMobile: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isMobile) {
    // Much simpler grid for mobile
    return (
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVisible ? "opacity-8" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(63, 63, 70, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(63, 63, 70, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
    );
  }

  // Original complex grid for desktop
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-2000 ${
        isVisible ? "opacity-15" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(63, 63, 70, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(63, 63, 70, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(63, 63, 70, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(63, 63, 70, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "25px 25px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.3) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: "500px 500px",
        }}
      />
    </div>
  );
};

// Optimized tech icons component with subtle mobile animations
const ClusteredTechIcons = ({ isMobile }: { isMobile: boolean }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    const timer = setTimeout(() => setIsVisible(true), 500);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
      clearTimeout(timer);
    };
  }, []);

  // Add subtle floating animation for mobile
  useEffect(() => {
    if (!isMobile) return;

    const floatingInterval = setInterval(() => {
      setFloatOffset(Date.now() * 0.001);
    }, 100); // Slower update rate for mobile

    return () => clearInterval(floatingInterval);
  }, [isMobile]);

  const calculatePosition = (
    position: any,
    windowWidth: number,
    windowHeight: number
  ) => {
    let left = 0;
    let top = 0;

    if (position.left) {
      left = (parseFloat(position.left) / 100) * windowWidth;
    } else if (position.right) {
      const rightPercentage = parseFloat(position.right);
      const clusterWidth = isMobile ? 100 : 200; // Smaller cluster width for mobile
      left = windowWidth - (rightPercentage / 100) * windowWidth - clusterWidth;
    }

    if (position.top) {
      top = (parseFloat(position.top) / 100) * windowHeight;
    } else if (position.bottom) {
      const bottomPercentage = parseFloat(position.bottom);
      const clusterHeight = isMobile ? 80 : 150; // Smaller cluster height for mobile
      top =
        windowHeight - (bottomPercentage / 100) * windowHeight - clusterHeight;
    }

    return { left, top };
  };

  if (windowSize.width === 0) return null;

  // Use simpler clusters for mobile
  const clusters = isMobile ? mobileTechClusters : desktopTechClusters;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Object.entries(clusters).map(([clusterName, cluster]) => {
        const clusterPosition = calculatePosition(
          cluster.position,
          windowSize.width,
          windowSize.height
        );

        return (
          <div
            key={clusterName}
            className="absolute"
            style={{
              left: clusterPosition.left,
              top: clusterPosition.top,
            }}
          >
            {/* Simplified background glow */}
            <div
              className={`absolute inset-0 ${
                isMobile ? "w-24 h-20" : "w-40 h-32"
              } bg-gradient-to-br from-blue-500/6 to-purple-500/6 rounded-full blur-2xl transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            />

            {/* Icons with simplified animations */}
            {cluster.icons.map((iconData, index) => {
              const IconComponent =
                iconComponents[iconData.icon as keyof typeof iconComponents];

              // Calculate subtle floating movement for mobile
              const floatX = isMobile ? Math.sin(floatOffset + index) * 2 : 0;
              const floatY = isMobile
                ? Math.cos(floatOffset + index * 0.7) * 1.5
                : 0;

              return (
                <div
                  key={`${clusterName}-${iconData.icon}`}
                  className={`absolute transition-all duration-700 ease-out ${
                    isVisible
                      ? isMobile
                        ? "opacity-40 translate-y-0 scale-100"
                        : "opacity-60 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-75"
                  } ${!isMobile ? "hover:opacity-100 hover:scale-110" : ""}`}
                  style={{
                    left: iconData.x + floatX,
                    top: iconData.y + floatY,
                    transitionDelay: `${iconData.delay}s`,
                  }}
                >
                  <div
                    className={`${
                      isMobile ? "p-1.5" : "p-2"
                    } rounded-full backdrop-blur-sm ${
                      isMobile
                        ? "bg-zinc-900/20 border border-zinc-800/30"
                        : "bg-zinc-900/30 border border-zinc-800/40"
                    } transition-all duration-300 ${
                      !isMobile
                        ? "group-hover:border-zinc-700/80 group-hover:bg-zinc-800/60"
                        : ""
                    }`}
                    style={{
                      boxShadow: isMobile
                        ? `0 0 8px ${iconData.color}08`
                        : `0 0 15px ${iconData.color}15`,
                    }}
                  >
                    <IconComponent
                      size={iconData.size}
                      style={{
                        color: iconData.color,
                        filter: isMobile
                          ? `drop-shadow(0 0 3px ${iconData.color}15)`
                          : `drop-shadow(0 0 6px ${iconData.color}30)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// Enhanced floating geometry with better animations (desktop only)
const FloatingGeometry = ({ isMobile }: { isMobile: boolean }) => {
  const [shapes, setShapes] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      type: "circle" | "square" | "triangle";
      floatOffset: number;
    }>
  >([]);

  useEffect(() => {
    if (isMobile) return; // Disable on mobile

    const initialShapes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 40,
      opacity: Math.random() * 0.08 + 0.03,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as
        | "circle"
        | "square"
        | "triangle",
      floatOffset: Math.random() * Math.PI * 2,
    }));
    setShapes(initialShapes);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setShapes((prev) =>
        prev.map((shape) => ({
          ...shape,
          x: shape.x + Math.sin(Date.now() * 0.0008 + shape.floatOffset) * 0.5,
          y: shape.y + Math.cos(Date.now() * 0.0006 + shape.floatOffset) * 0.3,
          rotation: shape.rotation + shape.rotationSpeed,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute blur-sm transition-all duration-1000 ease-out"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
            transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
          }}
        >
          {shape.type === "circle" && (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40" />
          )}
          {shape.type === "square" && (
            <div className="w-full h-full bg-gradient-to-br from-green-500/40 to-blue-500/40" />
          )}
          {shape.type === "triangle" && (
            <div
              className="w-full h-full bg-gradient-to-br from-purple-500/40 to-pink-500/40"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Enhanced animated particles with better movement
const AnimatedParticles = ({ isMobile }: { isMobile: boolean }) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }>
  >([]);

  useEffect(() => {
    const particleCount = isMobile ? 8 : 25; // Much fewer particles on mobile
    const initialParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.3),
      vy: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.3),
      life: Math.random() * 1000,
      maxLife: 1500 + Math.random() * 2000,
      size: Math.random() * (isMobile ? 1.5 : 2) + 1,
    }));
    setParticles(initialParticles);
  }, [isMobile]);

  useEffect(() => {
    const updateInterval = isMobile ? 32 : 16; // Slower updates on mobile
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          let newLife = particle.life + updateInterval;

          // Wrap around edges
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;

          // Reset if life exceeded
          if (newLife > particle.maxLife) {
            newLife = 0;
            newX = Math.random() * window.innerWidth;
            newY = Math.random() * window.innerHeight;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            life: newLife,
          };
        })
      );
    }, updateInterval);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const opacity =
          Math.sin((particle.life / particle.maxLife) * Math.PI) *
          (isMobile ? 0.2 : 0.4);
        return (
          <div
            key={particle.id}
            className="absolute bg-blue-400/60 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: opacity,
              boxShadow: `0 0 6px rgba(59, 130, 246, ${opacity})`,
            }}
          />
        );
      })}
    </div>
  );
};

// Optimized typewriter effect
const TypewriterText = ({ isMobile }: { isMobile: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const firstPart = "Hello, I'm Roan";
  const secondPart = ".dev";
  const fullText = firstPart + secondPart;

  useEffect(() => {
    const typingSpeed = isMobile ? 50 : 30; // Slightly slower on mobile
    const startDelay = setTimeout(() => {
      if (currentIndex < firstPart.length && !isPaused) {
        const timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else if (currentIndex === firstPart.length && !isPaused) {
        setIsPaused(true);
        const pauseTimer = setTimeout(
          () => {
            setIsPaused(false);
            setCurrentIndex(currentIndex + 1);
          },
          isMobile ? 1500 : 2000
        ); // Shorter pause on mobile
        return () => clearTimeout(pauseTimer);
      } else if (
        currentIndex > firstPart.length &&
        currentIndex < fullText.length
      ) {
        const timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      }
    }, 100);

    return () => clearTimeout(startDelay);
  }, [currentIndex, fullText, firstPart.length, isPaused, isMobile]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <h1
      className={`${
        isMobile ? "text-2xl sm:text-3xl" : "text-4xl md:text-6xl lg:text-7xl"
      } font-light tracking-tight mb-6`}
    >
      <span className="text-zinc-100">
        {displayedText}
        <span
          className={`${
            showCursor ? "opacity-100" : "opacity-0"
          } transition-opacity duration-100 text-zinc-100`}
        >
          |
        </span>
      </span>
    </h1>
  );
};

export default function LandingSection({
  onViewProjects,
}: {
  onViewProjects?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    setIsLoaded(true);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative h-screen w-full snap-start overflow-hidden bg-zinc-950">
      {/* Base gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-950 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Grid background */}
      <GridBackground isMobile={isMobile} />

      {/* Tech icons */}
      <ClusteredTechIcons isMobile={isMobile} />

      {/* Floating geometry (disabled on mobile) */}
      <FloatingGeometry isMobile={isMobile} />

      {/* Particles (reduced on mobile) */}
      <AnimatedParticles isMobile={isMobile} />

      {/* Simplified ambient lighting */}
      <div
        className={`absolute inset-0 transition-all duration-2000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute top-1/3 left-1/3 ${
            isMobile ? "w-64 h-64" : "w-96 h-96"
          } bg-blue-500/3 rounded-full blur-3xl`}
        />
        <div
          className={`absolute bottom-1/3 right-1/3 ${
            isMobile ? "w-64 h-64" : "w-96 h-96"
          } bg-purple-500/3 rounded-full blur-3xl`}
        />
      </div>

      {/* Main content */}
      <div className="relative z-40 flex h-full items-center justify-center">
        <div className={`text-center ${isMobile ? "px-6" : "px-8"}`}>
          {/* Logo */}
          <div
            className={`${
              isMobile ? "mb-6" : "mb-10"
            } flex justify-center transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 translate-y-8"
            }`}
          >
            <div className="relative group">
              {/* Stronger background for mobile to ensure visibility */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-500/${
                  isMobile ? "12" : "8"
                } to-purple-500/${isMobile ? "12" : "8"} rounded-full blur-xl`}
              />
              <Image
                src="/logo.png"
                alt="Roan Logo"
                width={isMobile ? 50 : 80}
                height={isMobile ? 50 : 80}
                className={`relative z-10 opacity-95 drop-shadow-2xl transition-all duration-500 ${
                  !isMobile
                    ? "group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    : ""
                }`}
                priority
              />
            </div>
          </div>

          {/* Typewriter text */}
          <TypewriterText isMobile={isMobile} />

          {/* Subtitle */}
          <p
            className={`${
              isMobile ? "text-sm px-2 mb-6" : "text-lg md:text-xl mb-10"
            } text-zinc-400 max-w-xl mx-auto leading-relaxed transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.5s" }}
          >
            Full-stack developer creating fun stuff
          </p>

          {/* Action buttons */}
          <div
            className={`flex flex-col ${
              isMobile ? "gap-3" : "sm:flex-row gap-4"
            } justify-center items-center transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.8s" }}
          >
            <button
              onClick={onViewProjects}
              className={`${
                isMobile ? "w-full max-w-xs px-6 py-3 text-sm" : "px-6 py-3"
              } bg-zinc-100 hover:bg-white text-zinc-900 rounded-md transition-all duration-300 font-medium ${
                !isMobile ? "hover:scale-105 hover:shadow-lg" : ""
              } cursor-pointer`}
            >
              View Projects
            </button>
            <button
              onClick={() => (window.location.href = "mailto:hey@roan.dev")}
              className={`${
                isMobile ? "w-full max-w-xs px-6 py-3 text-sm" : "px-6 py-3"
              } border border-zinc-600 hover:border-zinc-500 text-zinc-300 hover:text-zinc-200 rounded-md transition-all duration-300 ${
                !isMobile
                  ? "hover:scale-105 hover:bg-zinc-800/50"
                  : "hover:bg-zinc-800/30"
              } cursor-pointer`}
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Corner accent gradients (simplified on mobile) */}
      <div
        className={`absolute top-0 left-0 ${
          isMobile ? "w-48 h-48" : "w-64 h-64"
        } bg-gradient-to-br from-blue-500/${
          isMobile ? "8" : "15"
        } to-transparent blur-3xl transition-all duration-2000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 ${
          isMobile ? "w-48 h-48" : "w-64 h-64"
        } bg-gradient-to-tl from-purple-500/${
          isMobile ? "8" : "15"
        } to-transparent blur-3xl transition-all duration-2000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
