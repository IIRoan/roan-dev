import { useMemo } from "react";

const colorMapping = {
  react: "#61DAFB",
  typescript: "#3178C6",
  nextjs: "#FFFFFF",
  tailwind: "#06B6D4",
  node: "#339933",
  python: "#3776AB",
  postgresql: "#4169E1",
  git: "#F05032",
  docker: "#2496ED",
  linux: "#FCC624",
  traefik: "#24A1C1",
  expo: "#FFFFFF",
  
  code: "#64748b",
  design: "#f59e0b",
  business: "#78716c",
  education: "#6366f1",
  default: "#71717a",
} as const;

type ColorKeys = keyof typeof colorMapping;
type ColorValue = string;

export interface UseGlowEffectOptions {
  color?: ColorValue | ColorKeys;
  opacity?: number;
  spread?: number;
  duration?: number;
  iconSize?: "sm" | "md" | "lg";
  variant?: "card" | "icon";
}

export interface GlowEffectClasses {
  glowElement: string;
  accentLine: string;
  iconContainer: string;
}

const GLOW_CONFIG = {
  OPACITY: 0.12,
  SPREAD: 70,
  DURATION: 500,
  CARD_SCALE: "hover:scale-[1.02]",
  ICON_SCALE: "group-hover:scale-110",
  SHADOW_INNER: "33",
  SHADOW_OUTER: "1a",
  ICON_FILTER: "66",
} as const;

export function useGlowEffect({
  color = "default",
  opacity = GLOW_CONFIG.OPACITY,
  spread = GLOW_CONFIG.SPREAD,
  duration = GLOW_CONFIG.DURATION,
  iconSize = "md",
  variant = "card"
}: UseGlowEffectOptions = {}): {
  color: ColorValue;
  colorMapping: typeof colorMapping;
  classes: GlowEffectClasses;
  glowStyles: {
    background: string;
  };
  accentLineStyles: {
    background: string;
  };
  iconStyles: {
    boxShadow: string;
    filter: string;
  };
  cardClasses: string;
} {
  const resolvedColor: ColorValue = useMemo(() => {
    if (colorMapping[color as ColorKeys]) {
      return colorMapping[color as ColorKeys];
    }
    return color;
  }, [color]);

  const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
  
  const glowStyles = useMemo(() => ({
    background: `radial-gradient(circle at center, ${resolvedColor}${opacityHex} 0%, transparent ${spread}%)`,
  }), [resolvedColor, opacityHex, spread]);

  const accentLineStyles = useMemo(() => ({
    background: `linear-gradient(to right, transparent, ${resolvedColor}99, transparent)`,
  }), [resolvedColor]);

  const iconStyles = useMemo(() => ({
    boxShadow: `0 0 20px ${resolvedColor}${GLOW_CONFIG.SHADOW_INNER}, 0 0 40px ${resolvedColor}${GLOW_CONFIG.SHADOW_OUTER}`,
    filter: `drop-shadow(0 0 8px ${resolvedColor}${GLOW_CONFIG.ICON_FILTER})`,
  }), [resolvedColor]);

  const iconSizes = {
    sm: "h-10 w-10",
    md: "h-12 w-12", 
    lg: "h-14 w-14"
  };

  const classes: GlowEffectClasses = {
    glowElement: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10",
    accentLine: "absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-all duration-500",
    iconContainer: `flex ${iconSizes[iconSize]} shrink-0 items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-800/60 group-hover:border-zinc-700/80 transition-all duration-300 ${variant === 'icon' ? '' : GLOW_CONFIG.ICON_SCALE}`,
  };

  const cardClasses = `group relative rounded-xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm p-6 transition-all duration-700 ease-out ${GLOW_CONFIG.CARD_SCALE} hover:border-zinc-700/80 hover:bg-zinc-800/40 hover:shadow-lg`;

  return {
    color: resolvedColor,
    colorMapping,
    classes,
    glowStyles,
    accentLineStyles,
    iconStyles,
    cardClasses,
  };
}

export function getGlowColor(key: ColorKeys): ColorValue {
  return colorMapping[key] || colorMapping.default;
}

export function useCardGlow(color: ColorKeys | string = "default") {
  return useGlowEffect({ color, variant: "card" });
}

export function useIconGlow(color: ColorKeys | string = "default") {
  return useGlowEffect({ color, variant: "icon" });
}
