import ExperienceItem, { type ExperienceItem as ExperienceItemType } from "@/components/experience-item";
import { cn } from "@/lib/utils";

export default function TimelineSection({ 
  experiences,
  title,
  className,
  reverse = false 
}: {
  experiences: ExperienceItemType[];
  title?: string;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={cn("space-y-8", className)}>
      {title && (
        <h2 className="text-xl font-semibold text-zinc-100">{title}</h2>
      )}
      
      <div className={cn(
        "relative",
        reverse && "flex flex-col-reverse"
      )}>
        {/* Vertical timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-900" />
        
        <div className="space-y-8">
          {experiences.map((item, index) => (
            <ExperienceItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
