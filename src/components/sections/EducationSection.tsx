"use client";

import { useEffect, useState, useRef } from "react";
import TimelineSection from "@/components/timeline-section";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { type ExperienceItem } from "@/components/experience-item";
import { SectionHeaderDivider, Divider } from "@/components/ui/divider";

interface EducationSectionProps {
  isMobile: boolean;
}

const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: "1",
    title: "Junior Development & Automation Specialist",
    company: "Test-Correct",
    period: "2024 - Present",
    type: "Full-time",
    description: "Developing automations and software applications.",
    icon: "code",
    skills: [
      "Software Development",
      "Automation",
      "CI/CD",
      "JavaScript",
      "NextJS",
      "NestJS",
    ],
    isCurrent: true,
    location: "Rotterdam, Netherlands",
    url: "https://test-correct.nl",
  },
  {
    id: "2",
    title: "DevOps Intern",
    company: "De Pannekoek en De Kale (DPDK)",
    period: "2021 - 2022",
    type: "Internship",
    description:
      "Gained valuable hands-on experience with DevOps practices, CI/CD pipelines, and web development.",
    icon: "code",
    skills: ["DevOps", "CI/CD", "Docker", "Jenkins", "Linux", "VPN"],
    location: "Rotterdam, Netherlands",
    url: "https://www.dpdk.com",
  },
  {
    id: "3",
    title: "Part-time Employee",
    company: "Albert Heijn",
    period: "2018 - 2024",
    type: "Part-time",
    description: "Retail operations and customer service.",
    icon: "business",
    location: "Rotterdam, Netherlands",
  },
];

const EDUCATION_EXPERIENCE: ExperienceItem[] = [
  {
    id: "4",
    title: "Software Development",
    company: "Rotterdam University of Applied Sciences",
    period: "2023 - Present",
    type: "Full-time",
    description:
      "Currently studying modern software development with a focus on web technologies, software architecture, and agile methodologies.",
    icon: "education",
    skills: ["React", "Web Development", "Agile", "Python", "TypeScript"],
    isCurrent: true,
    location: "Rotterdam, Netherlands",
    url: "https://www.hogeschoolrotterdam.nl",
  },
  {
    id: "5",
    title: "Network & Media Management - IT",
    company: "Grafisch Lyceum Rotterdam",
    period: "2018 - 2022",
    type: "Full-time",
    description:
      "Specialized education in network management, system administration, and digital media technologies.",
    icon: "education",
    skills: [
      "Network Management",
      "Media Technologies",
      "IT Support",
      "Windows Server",
    ],
    location: "Rotterdam, Netherlands",
    url: "https://www.glr.nl",
  },
  {
    id: "6",
    title: "Mavo VMBO-TL",
    company: "Melanchthon de Blesewic",
    period: "2014 - 2018",
    type: "Full-time",
    description:
      "General secondary education with focus on theoretical learning (TL track).",
    icon: "education",
    location: "Rotterdam, Netherlands",
  },
];

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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(63,63,70,0.6) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(63,63,70,0.6) 1px, transparent 1px)`,
          backgroundSize: gridSize,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(63,63,70,0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(63,63,70,0.3) 1px, transparent 1px)`,
          backgroundSize: minorGridSize,
        }}
      />
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

export default function EducationSection({ isMobile }: EducationSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setSectionVisible(true);
        }),
      { threshold: isMobile ? 0.1 : 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="education"
      className={`relative w-full bg-zinc-950 ${
        isMobile ? "px-4 py-16" : "px-8 py-20 md:px-16"
      } overflow-hidden`}
    >
      <GridBackground isMobile={isMobile} />
      <div className="absolute inset-0 transition-all duration-3000">
        <div
          className={`absolute ${
            isMobile
              ? "top-1/4 left-1/4 w-64 h-64"
              : "top-1/4 left-1/4 w-96 h-96"
          } bg-purple-500/3 rounded-full blur-3xl`}
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
          } bg-amber-500/3 rounded-full blur-3xl`}
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
          } bg-indigo-500/3 rounded-full blur-3xl`}
          style={{
            transform: `translateY(${
              isVisible && !isMobile ? scrollY * 0.05 : 0
            }px)`,
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl">
        <Fade delay={0} className="transition-all duration-1000 ease-out">
          <SectionHeaderDivider className={isMobile ? "mb-4" : "mb-6"}>
            Journey
          </SectionHeaderDivider>

          <div
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2
              className={`${
                isMobile ? "text-3xl md:text-4xl" : "text-5xl md:text-6xl"
              } font-light text-zinc-100`}
            >
              <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-100 bg-clip-text text-transparent">
                Education & Experience
              </span>
            </h2>
          </div>
        </Fade>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 transition-all duration-1000 ease-out ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {/* Work Experience */}
          <div>
            <Fade delay={300}>
              <TimelineSection experiences={WORK_EXPERIENCE} />
            </Fade>
          </div>

          {/* Education */}
          <div>
            <Fade delay={400}>
              <TimelineSection experiences={EDUCATION_EXPERIENCE} reverse />
            </Fade>
          </div>
        </div>

        <div
          className={`mt-20 transition-all duration-1000 ease-out ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.8s" }}
        ></div>
      </div>

      {/* Decorative corner elements */}
      <div
        className={`absolute top-0 left-0 ${
          isMobile ? "w-48 h-48" : "w-64 h-64"
        } bg-gradient-to-br from-purple-500/8 to-transparent blur-3xl transition-all duration-3000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 ${
          isMobile ? "w-48 h-48" : "w-64 h-64"
        } bg-gradient-to-tl from-amber-500/8 to-transparent blur-3xl transition-all duration-3000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
