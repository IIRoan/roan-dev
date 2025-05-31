"use client";

import { useEffect, useState, useRef } from "react";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

interface EducationSectionProps {
  isMobile: boolean;
}

// Grid Background Component
const GridBackground = ({ isMobile }: { isMobile: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const gridSize = isMobile ? "60px 60px" : "100px 100px";
  const minorGridSize = isMobile ? "15px 15px" : "25px 25px";

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-2000 ${
        isVisible ? "opacity-10" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(63, 63, 70, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(63, 63, 70, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: gridSize,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(63, 63, 70, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(63, 63, 70, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: minorGridSize,
        }}
      />
    </div>
  );
};

interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  type: "education" | "work";
}

const timelineData: TimelineItem[] = [
  {
    title: "Software Developer",
    organization: "Rotterdam University of Applied Sciences",
    period: "2023 - Current",
    type: "education",
  },
  {
    title: "Network & Media Management - IT",
    organization: "Grafisch Lyceum Rotterdam",
    period: "2018 - 2022",
    type: "education",
  },
  {
    title: "Mavo VMBO-TL",
    organization: "Melanchthon de Blesewic",
    period: "2014 - 2018",
    type: "education",
  },
  {
    title: "Junior development & automation specialist",
    organization: "Test-Correct",
    period: "2024 - Current",
    type: "work",
  },
  {
    title: "DevOps Intern",
    organization: "De Pannekoek en De Kale (DPDK)",
    period: "2021 - 2022",
    type: "work",
  },
  {
    title: "Part-time Employee",
    organization: "Albert Heijn",
    period: "2018 - Current",
    type: "work",
  },
];

export default function EducationSection({ isMobile }: EducationSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setItemsVisible(true);
          }
        });
      },
      { threshold: isMobile ? 0.1 : 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  const educationItems = timelineData.filter(
    (item) => item.type === "education"
  );
  const workItems = timelineData.filter((item) => item.type === "work");

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen w-full bg-zinc-950 ${
        isMobile ? "px-4 py-16" : "px-8 py-24 md:px-16"
      } overflow-hidden`}
    >
      {/* Background elements */}
      <GridBackground isMobile={isMobile} />

      {/* Ambient lighting */}
      <div
        className={`absolute inset-0 transition-all duration-3000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div
          className={`${
            isMobile ? "mb-12" : "mb-20"
          } transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className={`flex items-center ${isMobile ? "mb-4" : "mb-6"}`}>
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent flex-1" />
            <span
              className={`${
                isMobile ? "px-4" : "px-6"
              } text-xs text-zinc-500 uppercase tracking-[0.3em]`}
            >
              Journey
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
            This is my{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>

          <p
            className={`${
              isMobile ? "text-base" : "text-lg"
            } text-zinc-400 text-center`}
          >
            Software Developer student @ Rotterdam Academy
          </p>
        </div>

        {/* Timeline Grid */}
        <div
          className={`grid ${
            isMobile ? "grid-cols-1 gap-8" : "md:grid-cols-2 gap-12"
          }`}
        >
          {/* Education Column */}
          <div
            className={`transition-all duration-700 ease-out ${
              itemsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div
              className={`flex items-center ${
                isMobile ? "mb-6" : "mb-8"
              } group`}
            >
              <div
                className={`flex items-center justify-center ${
                  isMobile ? "w-12 h-12" : "w-14 h-14"
                } rounded-full bg-zinc-900/80 border border-zinc-800/60 group-hover:border-zinc-700/80 transition-all duration-300`}
              >
                <FaGraduationCap
                  className="text-blue-400"
                  size={isMobile ? 20 : 24}
                />
              </div>
              <h3
                className={`${
                  isMobile ? "ml-3 text-xl" : "ml-4 text-2xl"
                } font-light text-zinc-100`}
              >
                Education
              </h3>
            </div>

            <div className="relative">
              {educationItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative pl-14 ${
                    index !== educationItems.length - 1 ? "pb-8" : ""
                  } transition-all duration-700 ease-out ${
                    itemsVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                >
                  {/* Timeline line */}
                  {index !== educationItems.length - 1 && (
                    <div className="absolute left-6 top-3 bottom-0 w-px bg-zinc-800/60" />
                  )}

                  {/* Timeline dot */}
                  <div className="absolute left-5 top-2 w-3 h-3 bg-blue-400 rounded-full ring-4 ring-zinc-950" />

                  {/* Content */}
                  <div className="group cursor-pointer">
                    <h4
                      className={`${
                        isMobile ? "text-base" : "text-lg"
                      } font-medium text-zinc-100 group-hover:text-blue-400 transition-colors duration-300`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`${
                        isMobile ? "text-sm" : "text-base"
                      } text-zinc-400 mt-1`}
                    >
                      {item.organization}
                    </p>
                    <span
                      className={`${
                        isMobile ? "text-xs" : "text-sm"
                      } text-zinc-500 inline-block mt-2`}
                    >
                      {item.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience Column */}
          <div
            className={`transition-all duration-700 ease-out ${
              itemsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div
              className={`flex items-center ${
                isMobile ? "mb-6" : "mb-8"
              } group`}
            >
              <div
                className={`flex items-center justify-center ${
                  isMobile ? "w-12 h-12" : "w-14 h-14"
                } rounded-full bg-zinc-900/80 border border-zinc-800/60 group-hover:border-zinc-700/80 transition-all duration-300`}
              >
                <FaBriefcase
                  className="text-purple-400"
                  size={isMobile ? 20 : 24}
                />
              </div>
              <h3
                className={`${
                  isMobile ? "ml-3 text-xl" : "ml-4 text-2xl"
                } font-light text-zinc-100`}
              >
                Work Experience
              </h3>
            </div>

            <div className="relative">
              {workItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative pl-14 ${
                    index !== workItems.length - 1 ? "pb-8" : "pb-8"
                  } transition-all duration-700 ease-out ${
                    itemsVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${0.5 + index * 0.1}s` }}
                >
                  {/* Timeline line - extends through all items including placeholder */}
                  <div className="absolute left-6 top-3 bottom-0 w-px bg-zinc-800/60" />

                  {/* Timeline dot */}
                  <div className="absolute left-5 top-2 w-3 h-3 bg-purple-400 rounded-full ring-4 ring-zinc-950" />

                  {/* Content */}
                  <div className="group cursor-pointer">
                    <h4
                      className={`${
                        isMobile ? "text-base" : "text-lg"
                      } font-medium text-zinc-100 group-hover:text-purple-400 transition-colors duration-300`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`${
                        isMobile ? "text-sm" : "text-base"
                      } text-zinc-400 mt-1`}
                    >
                      {item.organization}
                    </p>
                    <span
                      className={`${
                        isMobile ? "text-xs" : "text-sm"
                      } text-zinc-500 inline-block mt-2`}
                    >
                      {item.period}
                    </span>
                  </div>
                </div>
              ))}

              {/* Placeholder for future experiences */}
              <div
                className={`relative pl-14 transition-all duration-700 ease-out ${
                  itemsVisible
                    ? "opacity-50 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: "0.7s" }}
              >
                <div className="absolute left-5 top-2 w-3 h-3 bg-zinc-600 rounded-full ring-4 ring-zinc-950" />
                <div className="cursor-pointer">
                  <h4
                    className={`${
                      isMobile ? "text-base" : "text-lg"
                    } font-medium text-zinc-600`}
                  >
                    ...
                  </h4>
                  <p
                    className={`${
                      isMobile ? "text-sm" : "text-base"
                    } text-zinc-600 mt-1`}
                  >
                    ...
                  </p>
                  <span
                    className={`${
                      isMobile ? "text-xs" : "text-sm"
                    } text-zinc-600 inline-block mt-2`}
                  >
                    ...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className={`${
            isMobile ? "mt-12" : "mt-20"
          } flex justify-center transition-all duration-1000 ease-out ${
            itemsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.8s" }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <div className="h-px w-32 bg-gradient-to-r from-blue-400 to-purple-400" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
        </div>
      </div>

      {/* Corner accent gradients */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/8 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/8 to-transparent blur-3xl" />
    </section>
  );
}
