import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-lg shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};