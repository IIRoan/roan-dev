"use client";

import { useState, useEffect } from "react";

interface GridBackgroundProps {
  isMobile: boolean;
  opacity?: number;
}

const GridBackground = ({ isMobile, opacity = 10 }: GridBackgroundProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const gridSize = isMobile ? "60px 60px" : "100px 100px";
  const minorGridSize = isMobile ? "15px 15px" : "25px 25px";

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-2000 ${
        isVisible ? `opacity-${opacity}` : "opacity-0"
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

export default GridBackground;
