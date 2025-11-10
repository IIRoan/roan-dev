interface DividerProps {
  variant?: "section-header" | "section-footer" | "section-content";
  className?: string;
}

function Divider({ variant = "section-header", className = "" }: DividerProps) {
  const baseClasses = "h-px";
  
  const variantClasses = {
    "section-header": "bg-gradient-to-r from-transparent via-zinc-500 to-transparent",
    "section-footer": "bg-gradient-to-r from-transparent via-zinc-800 to-transparent", 
    "section-content": "bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

// For section headers with text in the middle
export function SectionHeaderDivider({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Divider variant="section-header" className="flex-1" />
      <span className="px-6 text-xs text-zinc-500 uppercase tracking-[0.3em]">
        {children}
      </span>
      <Divider variant="section-header" className="flex-1" />
    </div>
  );
}

// For decorative dividers between content
export function DecorativeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-500" />
      <div className="w-2 h-2 rounded-full bg-zinc-500" />
      <div className="h-px w-32 bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-500" />
      <div className="w-2 h-2 rounded-full bg-zinc-500" />
      <div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent" />
    </div>
  );
}

// Export the Divider component as named export as well
export { Divider };
