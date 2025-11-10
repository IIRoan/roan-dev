"use client";

import { WorkExperience } from "@/components/work-experience";
import type { ExperienceItemType } from "@/components/work-experience";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import GridBackground from "@/components/ui/GridBackground";

interface EducationSectionProps {
  isMobile: boolean;
}

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "1",
    companyName: "Test-Correct",
    isCurrentEmployer: true,
    positions: [
      {
        id: "1-1",
        title: "Junior Development & Automation Specialist",
        employmentPeriod: "2024 - Present",
        employmentType: "Full-time",
        description:
          "Developing automation solutions and software applications.",
        icon: "code",
        skills: ["Software Development", "Automation"],
        isExpanded: true,
      },
    ],
  },
  {
    id: "2",
    companyName: "De Pannekoek en De Kale (DPDK)",
    positions: [
      {
        id: "2-1",
        title: "DevOps Intern",
        employmentPeriod: "2021 - 2022",
        employmentType: "Internship",
        description:
          "Gained hands-on experience with DevOps practices and development.",
        icon: "code",
        skills: ["DevOps", "Development", "Internship"],
      },
    ],
  },
  {
    id: "3",
    companyName: "Albert Heijn",
    positions: [
      {
        id: "3-1",
        title: "Part-time Employee",
        employmentPeriod: "2018 - 2024",
        employmentType: "Part-time",
        description:
          "Retail operations and customer service.",
        icon: "business",
      },
    ],
  },
];

const EDUCATION_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "4",
    companyName: "Rotterdam University of Applied Sciences",
    isCurrentEmployer: true,
    positions: [
      {
        id: "4-1",
        title: "Software Development",
        employmentPeriod: "2023 - Present",
        employmentType: "Full-time",
        description:
          "Studying modern software development and technologies.",
        icon: "education",
        skills: ["Software Engineering", "Web Development"],
        isExpanded: true,
      },
    ],
  },
  {
    id: "5",
    companyName: "Grafisch Lyceum Rotterdam",
    positions: [
      {
        id: "5-1",
        title: "Network & Media Management - IT",
        employmentPeriod: "2018 - 2022",
        employmentType: "Full-time",
        description:
          "Specialized in network management and digital media technologies.",
        icon: "education",
        skills: ["Network Management", "Media Technologies", "IT"],
      },
    ],
  },
  {
    id: "6",
    companyName: "Melanchthon de Blesewic",
    positions: [
      {
        id: "6-1",
        title: "Mavo VMBO-TL",
        employmentPeriod: "2014 - 2018",
        employmentType: "Full-time",
        description:
          "Middleschool education.",
        icon: "education",
      },
    ],
  },
];

export default function EducationSection({ isMobile }: EducationSectionProps) {
  return (
    <section id="education" className={`relative w-full bg-zinc-950 ${isMobile ? "px-4 py-16" : "px-8 py-20 md:px-16"}`}>
      <GridBackground isMobile={isMobile} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Fade delay={0} className="transition-all duration-1000 ease-out">
          <div className={`flex items-center ${isMobile ? "mb-4" : "mb-6"}`}>
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent flex-1" />
            <span
              className={`${isMobile ? "px-4" : "px-6"} text-xs text-zinc-500 uppercase tracking-[0.3em]`}
            >
              Journey
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent flex-1" />
          </div>
          
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-100">Education & Experience</h2>
          </div>
        </Fade>

        <Fade delay={200} className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
          My academic and professional development journey
        </Fade>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">Work Experience</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </h3>
            <Fade delay={300}>
              <div className="max-w-4xl mx-auto">
                <WorkExperience experiences={WORK_EXPERIENCE} />
              </div>
            </Fade>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">Education</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </h3>
            <Fade delay={400}>
              <div className="max-w-4xl mx-auto">
                <WorkExperience experiences={EDUCATION_EXPERIENCE} />
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}