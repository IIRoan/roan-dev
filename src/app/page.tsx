"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import LandingSection from "@/components/sections/LandingSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollTime = useRef(0);

  const SECTIONS_COUNT = 4;
  const SCROLL_COOLDOWN = 800;

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transform = `translateY(0%)`;
      setCurrentSection(0);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    container.style.transition = "";
    container.style.transform = `translateY(0vh)`;
    setCurrentSection(0);
  }, [isMobile]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const transitionToSection = useCallback((targetIndex: number) => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container || isTransitioning) return;

    const clampedIndex = Math.max(0, Math.min(targetIndex, SECTIONS_COUNT - 1));
    if (clampedIndex === currentSection) return;

    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;
    lastScrollTime.current = now;

    setIsTransitioning(true);
    setCurrentSection(clampedIndex);

    const translateY = -(clampedIndex * 100);
    container.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    container.style.transform = `translateY(${translateY}vh)`;

    const cleanup = () => {
      setIsTransitioning(false);
      container.style.transition = '';
    };

    setTimeout(cleanup, 800);
  }, [SECTIONS_COUNT, currentSection, isMobile, isTransitioning]);

  const scrollToSection = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, SECTIONS_COUNT - 1));
    const section = sectionRefs.current[clampedIndex];
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentSection(clampedIndex);
  }, [SECTIONS_COUNT]);

  const goToSection = useCallback((index: number) => {
    if (isMobile) {
      scrollToSection(index);
      return;
    }
    transitionToSection(index);
  }, [isMobile, scrollToSection, transitionToSection]);

  const getSectionElement = (index: number) => {
    return sectionRefs.current[index];
  };

  const isSectionScrollable = (sectionElement: HTMLElement | null) => {
    if (!sectionElement) return false;
    return sectionElement.scrollHeight > sectionElement.clientHeight;
  };

  const isAtBottomOfSection = (sectionElement: HTMLElement | null) => {
    if (!sectionElement) return true;
    const threshold = 5;
    return sectionElement.scrollTop + sectionElement.clientHeight >= 
           sectionElement.scrollHeight - threshold;
  };

  const isAtTopOfSection = (sectionElement: HTMLElement | null) => {
    if (!sectionElement) return true;
    return sectionElement.scrollTop <= 5;
  };

  const canTransitionFromSection = useCallback((direction: number) => {
    const currentSectionElement = getSectionElement(currentSection);
    const isScrollable = isSectionScrollable(currentSectionElement);
    
    if (!isScrollable) return true;
    
    if (direction > 0) {
      return isAtBottomOfSection(currentSectionElement);
    } else {
      return isAtTopOfSection(currentSectionElement);
    }
  }, [currentSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isMobile || isTransitioning) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      
      if (canTransitionFromSection(direction)) {
        e.preventDefault();
        const targetSection = currentSection + direction;
        transitionToSection(targetSection);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, isTransitioning, isMobile, transitionToSection, canTransitionFromSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          transitionToSection(currentSection + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          transitionToSection(currentSection - 1);
          break;
        case 'Home':
          e.preventDefault();
          transitionToSection(0);
          break;
        case 'End':
          e.preventDefault();
          transitionToSection(SECTIONS_COUNT - 1);
          break;
        default:
          const num = parseInt(e.key);
          if (num >= 1 && num <= SECTIONS_COUNT) {
            e.preventDefault();
            transitionToSection(num - 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isTransitioning, transitionToSection]);

  const assignSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <>
      <div
        className={`${isMobile ? "hidden" : "fixed"} right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4`}
      >
        {Array.from({ length: SECTIONS_COUNT }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            disabled={isTransitioning}
            className={`relative w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-700 ease-out nav-dot ${
              currentSection === index
                ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50 active"
                : "bg-zinc-600 hover:bg-zinc-400 hover:scale-110"
            } ${isTransitioning ? "opacity-50" : "opacity-100"}`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      <div className={isMobile ? "min-h-screen overflow-visible" : "h-screen overflow-hidden"}>
        <div
          ref={containerRef}
          className={isMobile ? "" : "h-full"}
        >
          <div 
            ref={assignSectionRef(0)}
            className={`${isMobile ? "min-h-screen overflow-y-visible" : "h-screen overflow-hidden"} overflow-x-hidden section-fade`}
          >
            <LandingSection onViewProjects={() => goToSection(3)} />
          </div>

          <div 
            ref={assignSectionRef(1)}
            className={`${
              isMobile
                ? "min-h-screen overflow-y-visible"
                : "h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
            } overflow-x-hidden section-fade`}
          >
            <TechnologiesSection isMobile={isMobile} />
          </div>

          <div 
            ref={assignSectionRef(2)}
            className={`${
              isMobile
                ? "min-h-screen overflow-y-visible"
                : "h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
            } overflow-x-hidden section-fade`}
          >
            <EducationSection isMobile={isMobile} />
          </div>

          <div 
            ref={assignSectionRef(3)}
            className={`${
              isMobile
                ? "min-h-screen overflow-y-visible"
                : "h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
            } overflow-x-hidden section-fade`}
          >
            <ProjectsSection isMobile={isMobile} />
          </div>
        </div>
      </div>
    </>
  );
}
