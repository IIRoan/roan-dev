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

// Enhanced tech clusters with new technologies
const techClusters = {
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
      {
        icon: "nextjs",
        color: "#FFFFFF",
        size: 40,
        x: -25,
        y: 75,
        delay: 0.6,
      },
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
      {
        icon: "python",
        color: "#3776AB",
        size: 42,
        x: -75,
        y: 65,
        delay: 1.2,
      },
      {
        icon: "prisma",
        color: "#2D3748",
        size: 36,
        x: 85,
        y: 35,
        delay: 1.4,
      },
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
      {
        icon: "linear",
        color: "#5E6AD2",
        size: 34,
        x: 75,
        y: -20,
        delay: 2.0,
      },
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
      {
        icon: "linux",
        color: "#FCC624",
        size: 38,
        x: 80,
        y: -25,
        delay: 2.6,
      },
      {
        icon: "podman",
        color: "#892CA0",
        size: 36,
        x: -30,
        y: 70,
        delay: 2.8,
      },
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
      {
        icon: "railway",
        color: "#FFFFFF",
        size: 32,
        x: 0,
        y: 0,
        delay: 3.2,
      },
      { icon: "expo", color: "#FFFFFF", size: 34, x: 85, y: -25, delay: 3.4 },
      {
        icon: "cicd",
        color: "#2088FF",
        size: 36,
        x: -40,
        y: 60,
        delay: 3.6,
      },
    ],
  },
};

// Enhanced Grid Background Component with fade-in
const GridBackground = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-2000 ${
        isVisible ? "opacity-15" : "opacity-0"
      }`}
    >
      {/* Major grid lines */}
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

      {/* Minor grid lines */}
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

      {/* Accent grid lines */}
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

// Enhanced clustered tech icons with staggered animations
const ClusteredTechIcons = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    // Trigger animation after a short delay
    const timer = setTimeout(() => setIsVisible(true), 500);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
      clearTimeout(timer);
    };
  }, []);

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
      left =
        windowWidth - (parseFloat(position.right) / 100) * windowWidth - 200; // Offset for cluster width
    }

    if (position.top) {
      top = (parseFloat(position.top) / 100) * windowHeight;
    } else if (position.bottom) {
      top =
        windowHeight - (parseFloat(position.bottom) / 100) * windowHeight - 150; // Offset for cluster height
    }

    return { left, top };
  };

  if (windowSize.width === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Object.entries(techClusters).map(([clusterName, cluster]) => {
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
            {/* Cluster background glow with fade-in */}
            <div
              className={`absolute inset-0 w-52 h-36 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl -translate-x-12 -translate-y-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            />

            {/* Cluster icons with staggered fade-in */}
            {cluster.icons.map((iconData, index) => {
              const IconComponent =
                iconComponents[iconData.icon as keyof typeof iconComponents];
              return (
                <div
                  key={`${clusterName}-${iconData.icon}`}
                  className={`absolute transition-all duration-700 ease-out group ${
                    isVisible
                      ? "opacity-75 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-75"
                  } hover:opacity-100`}
                  style={{
                    left: iconData.x,
                    top: iconData.y,
                    transitionDelay: `${iconData.delay}s`,
                  }}
                >
                  <div
                    className="p-3 rounded-full backdrop-blur-sm bg-zinc-900/50 border border-zinc-800/60 group-hover:border-zinc-700/80 group-hover:bg-zinc-800/60 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{
                      boxShadow: `0 0 20px ${iconData.color}20, 0 0 40px ${iconData.color}10`,
                    }}
                  >
                    <IconComponent
                      size={iconData.size}
                      style={{
                        color: iconData.color,
                        filter: `drop-shadow(0 0 8px ${iconData.color}40)`,
                      }}
                    />
                  </div>

                  {/* Individual icon glow on hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
                    style={{
                      background: `radial-gradient(circle, ${iconData.color}30 0%, transparent 70%)`,
                    }}
                  />

                  {/* Floating animation */}
                  <div
                    className="absolute inset-0 animate-bounce"
                    style={{
                      animationDuration: `${3 + index}s`,
                      animationDelay: `${iconData.delay}s`,
                    }}
                  />
                </div>
              );
            })}

            {/* Enhanced cluster label with fade-in */}
            <div
              className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                isVisible
                  ? "opacity-0 translate-y-0"
                  : "opacity-0 translate-y-4"
              } hover:opacity-70`}
            >
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-medium bg-zinc-900/90 px-3 py-1.5 rounded-full backdrop-blur-sm border border-zinc-800/50">
                {clusterName}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Enhanced floating geometry with better animations
const FloatingGeometry = () => {
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
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute blur-sm transition-all duration-1000 ease-out`}
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
const AnimatedParticles = () => {
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
    const initialParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      life: Math.random() * 1000,
      maxLife: 1500 + Math.random() * 2000,
      size: Math.random() * 2 + 1,
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          let newLife = particle.life + 16;

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
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const opacity =
          Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.4;
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

// Enhanced typewriter effect with pause after "Hello, I'm Roan"
const TypewriterText = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const firstPart = "Hello, I'm Roan";
  const secondPart = ".dev";
  const fullText = firstPart + secondPart;

  useEffect(() => {
    // Start typing after logo loads
    const startDelay = setTimeout(() => {
      if (currentIndex < firstPart.length && !isPaused) {
        const timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 30); // Fast typing speed
        return () => clearTimeout(timer);
      } else if (currentIndex === firstPart.length && !isPaused) {
        // Pause for 2 seconds after first part
        setIsPaused(true);
        const pauseTimer = setTimeout(() => {
          setIsPaused(false);
          setCurrentIndex(currentIndex + 1);
        }, 2000);
        return () => clearTimeout(pauseTimer);
      } else if (
        currentIndex > firstPart.length &&
        currentIndex < fullText.length
      ) {
        const timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 30); // Fast typing speed
        return () => clearTimeout(timer);
      }
    }, 100);

    return () => clearTimeout(startDelay);
  }, [currentIndex, fullText, firstPart.length, isPaused]);

  useEffect(() => {
    // Cursor blinking effect
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
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

export default function LandingSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full snap-start overflow-hidden bg-zinc-950">
      {/* Base gradient background with fade-in */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-950 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Enhanced grid background */}
      <GridBackground />

      {/* Clustered tech icons */}
      <ClusteredTechIcons />

      {/* Floating geometric shapes */}
      <FloatingGeometry />

      {/* Animated particles */}
      <AnimatedParticles />

      {/* Enhanced ambient lighting with animation */}
      <div
        className={`absolute inset-0 transition-all duration-2000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/4 rounded-full blur-3xl" />
      </div>

      {/* Main content with staggered animations */}
      <div className="relative z-20 flex h-full items-center justify-center">
        <div className="text-center px-8">
          {/* Simplified logo with clean animations */}
          <div
            className={`mb-10 flex justify-center transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 translate-y-8"
            }`}
          >
            <div className="relative group">
              {/* Simple background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl" />

              {/* Main logo with clean hover effects */}
              <Image
                src="/logo.png"
                alt="Roan Logo"
                width={80}
                height={80}
                className="relative z-10 opacity-90 drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                priority
              />
            </div>
          </div>

          {/* Enhanced typewriter text effect with pause */}
          <TypewriterText />

          {/* Subtitle with fade-in */}
          <p
            className={`text-lg md:text-xl text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.5s" }}
          >
            Full-stack developer crafting exceptional digital experiences
          </p>

          {/* Action buttons with staggered animation */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.8s" }}
          >
            <button className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-900 rounded-md transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg">
              View Projects
            </button>
            <button className="px-6 py-3 border border-zinc-600 hover:border-zinc-500 text-zinc-300 hover:text-zinc-200 rounded-md transition-all duration-300 hover:scale-105 hover:bg-zinc-800/50">
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced corner accent gradients */}
      <div
        className={`absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/15 to-transparent blur-3xl transition-all duration-2000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/15 to-transparent blur-3xl transition-all duration-2000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
