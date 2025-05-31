"use client";

import { useEffect, useState, useRef } from "react";
import { FaGraduationCap, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

interface EducationSectionProps {
  isMobile: boolean;
}

interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  type: "education" | "work";
  description?: string;
  location?: string;
  current?: boolean;
}

const timelineData: TimelineItem[] = [
  {
    title: "Junior Development & Automation Specialist",
    organization: "Test-Correct",
    period: "2024 - Present",
    type: "work",
    description: "Developing automation solutions and software applications.",
    location: "Netherlands",
    current: true,
  },
  {
    title: "Software Developer",
    organization: "Rotterdam University of Applied Sciences",
    period: "2023 - Present",
    type: "education",
    description:
      "Studying modern software development practices and technologies.",
    location: "Rotterdam, NL",
    current: true,
  },
  {
    title: "Network & Media Management - IT",
    organization: "Grafisch Lyceum Rotterdam",
    period: "2018 - 2022",
    type: "education",
    description:
      "Specialized in network management and digital media technologies.",
    location: "Rotterdam, NL",
  },
  {
    title: "DevOps Intern",
    organization: "De Pannekoek en De Kale (DPDK)",
    period: "2021 - 2022",
    type: "work",
    description:
      "Gained hands-on experience with DevOps practices and cloud technologies.",
    location: "Netherlands",
  },
  {
    title: "Part-time Employee",
    organization: "Albert Heijn",
    period: "2018 - Present",
    type: "work",
    description: "Customer service and retail operations.",
    location: "Netherlands",
    current: true,
  },
  {
    title: "Mavo VMBO-TL",
    organization: "Melanchthon de Blesewic",
    period: "2014 - 2018",
    type: "education",
    description: "Foundation education with focus on technology.",
    location: "Netherlands",
  },
];

// Mobile Timeline Component
const MobileTimeline = ({
  items,
  isVisible,
}: {
  items: TimelineItem[];
  isVisible: boolean;
}) => {
  return (
    <div className="space-y-8">
      {items.map((item, index) => {
        const isEducation = item.type === "education";
        const IconComponent = isEducation ? FaGraduationCap : FaBriefcase;

        return (
          <div
            key={index}
            className={`flex gap-4 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Timeline Side */}
            <div className="flex flex-col items-center">
              {/* Dot */}
              <div
                className={`w-4 h-4 rounded-full border-4 border-zinc-950 ${
                  isEducation
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                    : "bg-gradient-to-br from-purple-500 to-pink-500"
                } relative z-10`}
              >
                <div
                  className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                    isEducation ? "bg-blue-400" : "bg-purple-400"
                  }`}
                />
              </div>

              {/* Connecting Line */}
              {index < items.length - 1 && (
                <div className="w-0.5 h-16 bg-gradient-to-b from-zinc-600 to-zinc-700 mt-2" />
              )}
            </div>

            {/* Card */}
            <div className="flex-1 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/60 rounded-xl p-4 relative group hover:border-opacity-100 transition-all duration-300">
              {item.current && (
                <div className="absolute -top-2 -right-2">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                      isEducation
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gradient-to-r from-purple-500 to-pink-500"
                    }`}
                  >
                    Current
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isEducation
                      ? "bg-blue-500/20 border border-blue-500/30"
                      : "bg-purple-500/20 border border-purple-500/30"
                  }`}
                >
                  <IconComponent
                    className={`w-4 h-4 ${
                      isEducation ? "text-blue-400" : "text-purple-400"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-zinc-300 text-sm font-medium">
                    {item.organization}
                  </p>
                </div>
              </div>

              {item.description && (
                <p className="text-zinc-400 text-xs mb-3 leading-relaxed">
                  {item.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-zinc-500">
                    <FaCalendarAlt className="w-3 h-3" />
                    <span>{item.period}</span>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1 text-zinc-500">
                      <HiLocationMarker className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isEducation
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  }`}
                >
                  {isEducation ? "Education" : "Work"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Desktop Timeline Component
const DesktopTimeline = ({
  items,
  isVisible,
}: {
  items: TimelineItem[];
  isVisible: boolean;
}) => {
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Central Line */}
      <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />

      <div className="space-y-12">
        {items.map((item, index) => {
          const isEducation = item.type === "education";
          const IconComponent = isEducation ? FaGraduationCap : FaBriefcase;
          const isLeft = index % 2 === 0;

          return (
            <div key={index} className="relative flex items-center">
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <div
                  className={`w-4 h-4 rounded-full border-4 border-zinc-950 ${
                    isEducation
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : "bg-gradient-to-br from-purple-500 to-pink-500"
                  } relative transition-all duration-300 hover:scale-125`}
                >
                  <div
                    className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                      isEducation ? "bg-blue-400" : "bg-purple-400"
                    }`}
                  />
                </div>
              </div>

              {/* Card Container */}
              <div
                className={`w-full flex ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-5/12 ${isLeft ? "pr-12" : "pl-12"} relative`}
                >
                  {/* Connecting Line */}
                  <div
                    className={`absolute top-6 ${
                      isLeft ? "-right-2" : "-left-2"
                    } w-14 h-0.5 ${
                      isEducation
                        ? isLeft
                          ? "bg-gradient-to-r from-blue-500 to-zinc-600"
                          : "bg-gradient-to-l from-blue-500 to-zinc-600"
                        : isLeft
                        ? "bg-gradient-to-r from-purple-500 to-zinc-600"
                        : "bg-gradient-to-l from-purple-500 to-zinc-600"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/60 rounded-xl p-6 relative group hover:border-opacity-100 transition-all duration-500 hover:scale-[1.02] ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${
                        isEducation
                          ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                          : "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                      }`}
                    />

                    {item.current && (
                      <div className="absolute -top-2 -right-2">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                            isEducation
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                              : "bg-gradient-to-r from-purple-500 to-pink-500"
                          }`}
                        >
                          Current
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                          isEducation
                            ? "bg-blue-500/20 border border-blue-500/30"
                            : "bg-purple-500/20 border border-purple-500/30"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${
                            isEducation ? "text-blue-400" : "text-purple-400"
                          } transition-colors duration-300 group-hover:brightness-110`}
                        />
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`text-white font-semibold text-lg mb-1 transition-colors duration-300 ${
                            isEducation
                              ? "group-hover:text-blue-300"
                              : "group-hover:text-purple-300"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-zinc-300 font-medium">
                          {item.organization}
                        </p>
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-zinc-400 text-sm mb-4 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-zinc-500">
                          <FaCalendarAlt className="w-3 h-3" />
                          <span>{item.period}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-1 text-zinc-500">
                            <HiLocationMarker className="w-3 h-3" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>

                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isEducation
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        }`}
                      >
                        {isEducation ? "Education" : "Work"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-zinc-950 px-4 md:px-8 py-16 md:py-24 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? "50px 50px" : "80px 80px",
          }}
        />
      </div>

      {/* Ambient Lighting */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-purple-500/8 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-purple-500/50 flex-1 max-w-32" />
            <span className="px-6 text-xs text-zinc-500 uppercase tracking-[0.4em] font-medium">
              My Journey
            </span>
            <div className="h-px bg-gradient-to-l from-transparent via-purple-500/50 to-blue-500/50 flex-1 max-w-32" />
          </div>

          <h2 className="text-4xl md:text-6xl font-light text-zinc-100 mb-6">
            Education &{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A timeline of my academic achievements and professional growth in
            software development.
          </p>
        </div>

        {/* Timeline */}
        {isMobile ? (
          <MobileTimeline items={timelineData} isVisible={itemsVisible} />
        ) : (
          <DesktopTimeline items={timelineData} isVisible={itemsVisible} />
        )}

        {/* Footer */}
        <div
          className={`text-center mt-16 md:mt-20 transition-all duration-1000 ${
            itemsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center space-x-4">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            <div className="h-px w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>
          <p className="text-zinc-500 text-sm mt-4 italic">
            The journey continues...
          </p>
        </div>
      </div>
    </section>
  );
}
