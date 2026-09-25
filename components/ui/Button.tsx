import Link from "next/link";
import React from "react";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      icon,
      iconPosition = "right",
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none rounded-lg active:scale-[0.98]";

    const variants = {
      primary:
        "bg-slate-100 text-slate-950 hover:bg-white hover:shadow-[0_0_20px_rgba(248,250,252,0.2)] border border-slate-200 font-semibold",
      secondary:
        "bg-slate-900/90 text-slate-100 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-500 shadow-sm",
      outline:
        "bg-transparent text-slate-200 border border-slate-700 hover:border-sky-400/80 hover:text-sky-300 hover:bg-sky-500/10",
      ghost:
        "bg-transparent text-slate-300 hover:text-slate-100 hover:bg-slate-800/60",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const defaultArrow = (
      <svg
        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    );

    const iconContent = icon !== undefined ? icon : variant === "primary" ? defaultArrow : null;

    const content = (
      <span className="inline-flex items-center gap-2 group">
        {iconPosition === "left" && iconContent}
        <span>{children}</span>
        {iconPosition === "right" && iconContent}
      </span>
    );

    if ("href" in props && props.href) {
      const { href, external, ...linkProps } = props as ButtonAsLink;

      if (external || href.startsWith("http")) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
            {...linkProps}
          >
            {content}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...(linkProps as Omit<ButtonAsLink, "href" | "external">)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...(props as ButtonAsButton)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
