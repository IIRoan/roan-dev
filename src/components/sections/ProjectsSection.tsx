"use client";

import { useEffect, useState, useRef } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import FooterSection from "./FooterSection";

interface ProjectsSectionProps {
  isMobile: boolean;
}

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language?: string;
  stargazers_count: number;
  topics?: string[];
}

const GridBackground = ({ isMobile }: { isMobile: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

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

const ProjectCard = ({
  project,
  index,
  isVisible,
  isMobile,
}: {
  project: Project;
  index: number;
  isVisible: boolean;
  isMobile: boolean;
}) => {
  return (
    <div
      className={`group relative rounded-xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm ${
        isMobile ? "p-4" : "p-6"
      } transition-all duration-700 ease-out hover:scale-[1.02] hover:border-zinc-700/80 hover:bg-zinc-800/40 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />

      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-zinc-100 text-lg group-hover:text-white transition-colors duration-300 capitalize">
          {project.name.replace(/-/g, " ")}
        </h3>
        <div className="flex items-center space-x-2">
          {project.stargazers_count > 0 && (
            <span className="text-xs text-zinc-400 flex items-center">
              ⭐ {project.stargazers_count}
            </span>
          )}
          {project.language && (
            <span className="text-xs px-2 py-1 rounded-full bg-zinc-800/60 text-zinc-400 border border-zinc-700/50">
              {project.language}
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 mb-4 line-clamp-3">
        {project.description || "No description available"}
      </p>

      {project.topics && project.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {project.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center space-x-3 mt-auto">
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
        >
          <FaGithub size={16} />
          <span className="text-sm">Code</span>
        </a>
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-zinc-400 hover:text-blue-400 transition-colors duration-300"
          >
            <FaExternalLinkAlt size={14} />
            <span className="text-sm">Live</span>
          </a>
        )}
      </div>

      <div
        className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(to right, transparent, rgba(59, 130, 246, 0.6), transparent)`,
        }}
      />
    </div>
  );
};

export default function ProjectsSection({ isMobile }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsVisible(true);
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

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          "https://api.github.com/users/iiroan/repos"
        );
        const data = await response.json();

        // Sort by stars (descending) and filter out profile repos
        const sortedProjects = data
          .filter((project: Project) => !project.name.includes("iiroan"))
          .sort(
            (a: Project, b: Project) => b.stargazers_count - a.stargazers_count
          )
          .slice(0, 6);

        setProjects(sortedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen w-full bg-zinc-950 ${
        isMobile ? "px-4 py-16" : "px-8 py-24 md:px-16"
      } overflow-hidden flex flex-col`}
    >
      <GridBackground isMobile={isMobile} />

      {/* Ambient lighting */}
      <div
        className={`absolute inset-0 transition-all duration-3000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      {/* Projects Content */}
      <div className="relative z-10 mx-auto max-w-7xl flex-1">
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
              Portfolio
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
            These are my{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              projects
            </span>
          </h2>

          <p
            className={`${
              isMobile ? "text-base" : "text-lg"
            } text-zinc-400 text-center max-w-2xl mx-auto`}
          >
            Showcasing my most starred repositories - feel free to explore them
            and check out the source code
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-zinc-400">Loading projects...</span>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              isMobile
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            } mb-20`}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={cardsVisible}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer integrated at bottom */}
      <div className="mt-auto">
        <FooterSection />
      </div>
    </section>
  );
}
