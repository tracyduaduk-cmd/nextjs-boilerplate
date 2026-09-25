import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "mark-only";
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  variant = "full",
  href = "/",
}) => {
  const sizeClasses = {
    sm: "h-6 text-sm gap-2",
    md: "h-8 text-base gap-2.5",
    lg: "h-10 text-xl gap-3",
  };

  const markSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const content = (
    <div className={`inline-flex items-center font-bold tracking-tight text-slate-50 transition-opacity hover:opacity-90 ${sizeClasses[size]} ${className}`}>
      {/* Snow Brand Mark SVG: Modern Geometric Crystal / Technology Node */}
      <span className={`relative inline-flex items-center justify-center rounded-lg bg-slate-900 border border-slate-700/80 text-sky-400 shadow-sm ${markSizes[size]}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-1/2 h-1/2 text-sky-400"
          aria-hidden="true"
        >
          {/* Hexagonal snowflake node emblem */}
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" className="text-sky-300" />
        </svg>
      </span>

      {variant === "full" && (
        <span className="font-semibold tracking-widest text-slate-100 uppercase font-sans">
          SNOW
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Snow Homepage" className="focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};
