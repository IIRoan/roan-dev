import {
  BriefcaseIcon,
  CodeIcon,
  PaletteIcon,
  GraduationCapIcon,
  CalendarIcon,
  MapPinIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCardGlow } from "@/hooks/useGlowEffect";

const iconMap = {
  code: CodeIcon,
  design: PaletteIcon,
  business: BriefcaseIcon,
  education: GraduationCapIcon,
} as const;

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  type?: string;
  description?: string;
  icon?: "code" | "design" | "business" | "education";
  skills?: string[];
  location?: string;
  isCurrent?: boolean;
};

export default function ExperienceItem({ item }: { item: ExperienceItem }) {
  const Icon = iconMap[item.icon || "business"];
  const { color: iconColor, classes, glowStyles, accentLineStyles, cardClasses } = useCardGlow(item.icon || "business");

  const getAccentColor = () => {
    switch (item.icon) {
      case "code":
        return "border-slate-600 bg-slate-700/80 text-slate-200";
      case "design":
        return "border-amber-700 bg-amber-800/80 text-amber-100";
      case "business":
        return "border-stone-600 bg-stone-700/80 text-stone-200";
      case "education":
        return "border-indigo-700 bg-indigo-800/80 text-indigo-100";
      default:
        return "border-zinc-600 bg-zinc-700/80 text-zinc-200";
    }
  };

  const accentColor = getAccentColor();

  return (
    <div className="group relative w-full">
      {/* Experience item */}
      <div className="relative flex gap-6 items-start">
        {/* Timeline line - starts at the bottom edge of the icon */}
        <div className="absolute left-6 top-12 w-0.5 h-full bg-zinc-800" />

        {/* Experience dot - centered on timeline line */}
        <div
          className={cn(
            "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border",
            accentColor
          )}
        >
          <Icon className="h-5 w-5" />
          {item.isCurrent && (
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pb-8">
          <div className={cardClasses}>
            {/* Glow effect on hover */}
            <div
              className={classes.glowElement}
              style={glowStyles}
            />
            {/* Bottom accent line on hover */}
            <div
              className={classes.accentLine}
              style={accentLineStyles}
            />
            {/* Header */}
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-zinc-100 mb-1">
                {item.title}
              </h3>
              <p className="text-zinc-300">{item.company}</p>
              <div className="flex items-center text-sm text-zinc-400 mt-2">
                <CalendarIcon className="h-3.5 w-3.5 mr-2" />
                <span>{item.period}</span>
                {item.type && (
                  <>
                    <span className="mx-2 text-zinc-600">•</span>
                    <span className="px-2 py-0.5 bg-zinc-800/50 rounded text-xs">
                      {item.type}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Location */}
            {item.location && (
              <div className="flex items-center gap-1.5 text-sm text-zinc-500 mb-3">
                <MapPinIcon className="h-3.5 w-3.5" />
                <span>{item.location}</span>
              </div>
            )}

            {/* Description */}
            {item.description && (
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Skills */}
            {item.skills && item.skills.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-zinc-800/50 border border-zinc-700/40 rounded-md text-zinc-300 transition-colors hover:bg-zinc-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
