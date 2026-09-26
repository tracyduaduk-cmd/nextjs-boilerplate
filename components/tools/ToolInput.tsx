"use client";

import React, { useState, useId } from "react";

export interface ToolInputProps {
  placeholder?: string;
  buttonLabel?: string;
  onSubmit: (target: string) => void;
  isLoading?: boolean;
}

export const ToolInput: React.FC<ToolInputProps> = ({
  placeholder = "Enter website URL (e.g., https://yourcompany.com)",
  buttonLabel = "Run Diagnostic Check",
  onSubmit,
  isLoading = false,
}) => {
  const [value, setValue] = useState("");
  const inputId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto my-8">
      <div className="relative flex flex-col sm:flex-row items-center gap-3">
        <label htmlFor={inputId} className="sr-only">
          Website URL or target input
        </label>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full py-4 px-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold text-sm transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-950/40"
        >
          {isLoading ? "Running Diagnostic..." : buttonLabel}
        </button>
      </div>
    </form>
  );
};
