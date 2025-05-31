"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import LandingSection from "@/components/sections/LandingSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasInitialized = useRef(false);

  const sections = 4; // Landing, Technologies, Education, Projects+Footer
  const SWIPE_THRESHOLD = 50;
  const SWIPE_TIME_THRESHOLD = 500;

  // Force scroll to top on page load/reload
  useEffect(() => {
    if (hasInitialized.current) return;

    const initializeScroll = () => {
      const container = containerRef.current;
      if (container) {
        // Immediately scroll to top without animation
        container.scrollTo({ top: 0 });
        setCurrentSection(0);
        hasInitialized.current = true;
      }

      // Also ensure window is at top
      window.scrollTo({ top: 0 });
    };

    // Try immediately
    initializeScroll();

    // Also try after a short delay in case the ref isn't ready
    const timeoutId = setTimeout(initializeScroll, 10);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const scrollToSection = useCallback(
    (sectionIndex: number) => {
      const container = containerRef.current;
      if (!container || isScrolling) return;

      const targetIndex = Math.max(0, Math.min(sectionIndex, sections - 1));
      if (targetIndex === currentSection) return;

      setIsScrolling(true);

      const startY = container.scrollTop;
      const targetY = targetIndex * window.innerHeight;
      const distance = targetY - startY;
      const duration = 1200;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        setScrollProgress(easedProgress);

        const currentY = startY + distance * easedProgress;
        container.scrollTo({ top: currentY });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrentSection(targetIndex);
          setIsScrolling(false);
          setScrollProgress(0);
        }
      };

      requestAnimationFrame(animate);
    },
    [currentSection, isScrolling, sections]
  );

  const isSectionScrollable = (sectionElement: HTMLElement | null) => {
    if (!sectionElement) return false;
    return sectionElement.scrollHeight > sectionElement.clientHeight;
  };

  const isAtBottomOfSection = (sectionElement: HTMLElement | null) => {
    if (!sectionElement) return false;
    const threshold = 5;
    return (
      sectionElement.scrollTop + sectionElement.clientHeight >=
      sectionElement.scrollHeight - threshold
    );
  };

  const isAtTopOfSection = (sectionElement: HTMLElement | null) => {
    if (!sectionElement) return true;
    return sectionElement.scrollTop <= 5;
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isMobile || isScrolling) return;

      const currentSectionElement = sectionRefs.current[currentSection];
      const isScrollable = isSectionScrollable(currentSectionElement);

      if (isScrollable && currentSectionElement) {
        const scrollingDown = e.deltaY > 0;
        const atBottom = isAtBottomOfSection(currentSectionElement);
        const atTop = isAtTopOfSection(currentSectionElement);

        if ((scrollingDown && !atBottom) || (!scrollingDown && !atTop)) {
          return;
        }

        e.preventDefault();

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          const delta = Math.sign(e.deltaY);
          const targetSection = currentSection + delta;
          scrollToSection(targetSection);
        }, 100);
      } else {
        e.preventDefault();

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          const delta = Math.sign(e.deltaY);
          const targetSection = currentSection + delta;
          scrollToSection(targetSection);
        }, 100);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSection, isScrolling, isMobile, scrollToSection]);

  useEffect(() => {
    if (!isMobile) return;

    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchTime = Date.now() - touchStartTime;
      const deltaY = touchStartY - touchEndY;
      const absDeltaY = Math.abs(deltaY);

      const currentSectionElement = sectionRefs.current[currentSection];
      const isScrollable = isSectionScrollable(currentSectionElement);

      if (absDeltaY > SWIPE_THRESHOLD && touchTime < SWIPE_TIME_THRESHOLD) {
        const swipingDown = deltaY > 0;

        if (isScrollable && currentSectionElement) {
          const atBottom = isAtBottomOfSection(currentSectionElement);
          const atTop = isAtTopOfSection(currentSectionElement);

          if ((swipingDown && atBottom) || (!swipingDown && atTop)) {
            const direction = swipingDown ? 1 : -1;
            const targetSection = currentSection + direction;
            scrollToSection(targetSection);
          }
        } else {
          const direction = deltaY > 0 ? 1 : -1;
          const targetSection = currentSection + direction;
          scrollToSection(targetSection);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection, isScrolling, isMobile, scrollToSection]);

  useEffect(() => {
    const updateCurrentSection = () => {
      if (isScrolling) return;

      const container = containerRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const newSection = Math.round(scrollTop / sectionHeight);

      if (
        newSection !== currentSection &&
        newSection >= 0 &&
        newSection < sections
      ) {
        setCurrentSection(newSection);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", updateCurrentSection, {
        passive: true,
      });
      return () =>
        container.removeEventListener("scroll", updateCurrentSection);
    }
  }, [currentSection, isScrolling, sections]);

  const assignSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <>
      {/* Navigation dots */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {Array.from({ length: sections }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            disabled={isScrolling}
            className={`relative w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-700 ease-out nav-dot ${
              currentSection === index
                ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50 active"
                : "bg-zinc-600 hover:bg-zinc-400 hover:scale-110"
            } ${isScrolling ? "opacity-50" : "opacity-100"}`}
            aria-label={`Go to section ${index + 1}`}
          ></button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="h-screen overflow-y-auto overflow-x-hidden smooth-scroll-container"
      >
        {/* Section 1: Landing */}
        <div
          ref={assignSectionRef(0)}
          className="h-screen overflow-hidden section-fade"
          data-section="0"
          style={{ opacity: currentSection === 0 ? 1 : 0.8 }}
        >
          <LandingSection />
        </div>

        {/* Section 2: Technologies */}
        <div
          ref={assignSectionRef(1)}
          className="h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 section-fade"
          data-section="1"
          style={{ opacity: currentSection === 1 ? 1 : 0.8 }}
        >
          <TechnologiesSection isMobile={isMobile} />
        </div>

        {/* Section 3: Education & Experience */}
        <div
          ref={assignSectionRef(2)}
          className="h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 section-fade"
          data-section="2"
          style={{ opacity: currentSection === 2 ? 1 : 0.8 }}
        >
          <EducationSection isMobile={isMobile} />
        </div>

        {/* Section 4: Projects + Footer */}
        <div
          ref={assignSectionRef(3)}
          className="h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 section-fade"
          data-section="3"
          style={{ opacity: currentSection === 3 ? 1 : 0.8 }}
        >
          <ProjectsSection isMobile={isMobile} />
        </div>
      </div>
    </>
  );
}
