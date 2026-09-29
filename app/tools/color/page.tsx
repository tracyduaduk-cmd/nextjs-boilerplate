"use client";

import React, { useState, useMemo } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolActions } from "@/components/tools/ToolActions";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { Container } from "@/components/ui/Container";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleanHex = hex.trim().replace(/^#/, "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split("").map((c) => c + c).join("");
  }
  if (cleanHex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
    return null;
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const R = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const G = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const B = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function calculateContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export default function ColorToolPage() {
  const [hexColor, setHexColor] = useState("#0ea5e9");
  const [bgColor, setBgColor] = useState("#020617");

  const colorData = useMemo(() => {
    const fgRgb = hexToRgb(hexColor);
    const bgRgb = hexToRgb(bgColor);

    if (!fgRgb) {
      return { fgRgb: null, fgHsl: null, contrastRatio: null, error: "Invalid foreground HEX color" };
    }
    if (!bgRgb) {
      return { fgRgb: null, fgHsl: null, contrastRatio: null, error: "Invalid background HEX color" };
    }

    const fgHsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b);
    const fgLum = getRelativeLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const bgLum = getRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const contrastRatio = calculateContrastRatio(fgLum, bgLum);

    return {
      fgRgb,
      fgHsl,
      contrastRatio: Math.round(contrastRatio * 100) / 100,
      error: null,
    };
  }, [hexColor, bgColor]);

  return (
    <ToolShell>
      <ToolHeader
        title="Color Utility & WCAG Contrast Auditor"
        description="Convert HEX, RGB, and HSL colors and verify WCAG AA / AAA accessibility contrast compliance."
        category="DESIGN UTILITY"
        badge="WCAG 2.1 Ready"
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Workspace Column */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Color Pickers & Conversions"
              actions={
                <ToolActions
                  onSampleData={() => {
                    setHexColor("#0ea5e9");
                    setBgColor("#020617");
                  }}
                  sampleLabel="Reset Snow Brand Colors"
                />
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Foreground Color Selector */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-300 font-bold">Foreground Text Color:</label>
                    <input
                      type="color"
                      value={hexColor.startsWith("#") ? hexColor : "#0ea5e9"}
                      onChange={(e) => setHexColor(e.target.value)}
                      className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    value={hexColor}
                    onChange={(e) => setHexColor(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sky-300 font-mono text-xs focus:outline-none focus:border-sky-500"
                  />
                  {colorData.fgRgb && colorData.fgHsl && (
                    <div className="text-xs font-mono text-slate-400 space-y-1 pt-1">
                      <p>RGB: <span className="text-slate-200">{`rgb(${colorData.fgRgb.r}, ${colorData.fgRgb.g}, ${colorData.fgRgb.b})`}</span></p>
                      <p>HSL: <span className="text-slate-200">{`hsl(${colorData.fgHsl.h}, ${colorData.fgHsl.s}%, ${colorData.fgHsl.l}%)`}</span></p>
                    </div>
                  )}
                </div>

                {/* Background Color Selector */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-300 font-bold">Background Surface Color:</label>
                    <input
                      type="color"
                      value={bgColor.startsWith("#") ? bgColor : "#020617"}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sky-300 font-mono text-xs focus:outline-none focus:border-sky-500"
                  />
                  {hexToRgb(bgColor) && (
                    <div className="text-xs font-mono text-slate-400 space-y-1 pt-1">
                      {(() => {
                        const bgRgb = hexToRgb(bgColor)!;
                        const bgHsl = rgbToHsl(bgRgb.r, bgRgb.g, bgRgb.b);
                        return (
                          <>
                            <p>RGB: <span className="text-slate-200">{`rgb(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b})`}</span></p>
                            <p>HSL: <span className="text-slate-200">{`hsl(${bgHsl.h}, ${bgHsl.s}%, ${bgHsl.l}%)`}</span></p>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </ToolInputPanel>

            <ToolOutputPanel
              title="WCAG Accessibility & Contrast Results"
              badge={colorData.contrastRatio ? `${colorData.contrastRatio} : 1 Ratio` : "Invalid Input"}
              error={colorData.error}
            >
              {colorData.contrastRatio && (
                <div className="space-y-6">
                  {/* Live Sample Box */}
                  <div
                    className="p-6 rounded-2xl border transition-colors flex flex-col justify-center items-center text-center space-y-2 min-h-[140px]"
                    style={{ backgroundColor: bgColor, color: hexColor, borderColor: hexColor + "40" }}
                  >
                    <p className="text-lg font-bold font-sans">Sample Headline Text</p>
                    <p className="text-xs font-sans max-w-md">
                      This sample text renders using your selected foreground and background color combination.
                    </p>
                  </div>

                  {/* Contrast Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">Contrast Ratio</p>
                      <p className="text-xl font-bold font-mono text-sky-400">{colorData.contrastRatio} : 1</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">AA Normal Text (&gt;= 4.5:1)</p>
                      <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full ${
                        colorData.contrastRatio >= 4.5
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-rose-950 text-rose-400 border border-rose-800"
                      }`}>
                        {colorData.contrastRatio >= 4.5 ? "PASS (AA)" : "FAIL"}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">AA Large Text (&gt;= 3.0:1)</p>
                      <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full ${
                        colorData.contrastRatio >= 3.0
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-rose-950 text-rose-400 border border-rose-800"
                      }`}>
                        {colorData.contrastRatio >= 3.0 ? "PASS (AA)" : "FAIL"}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">AAA Normal Text (&gt;= 7.0:1)</p>
                      <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full ${
                        colorData.contrastRatio >= 7.0
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-rose-950 text-rose-400 border border-rose-800"
                      }`}>
                        {colorData.contrastRatio >= 7.0 ? "PASS (AAA)" : "FAIL"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </ToolOutputPanel>
          </div>

          {/* Right Visual / System Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage pageKey="tools_color" slotKey="visual_stage" visualType="color"
              mode="design"
              statusLabel="ACCESSIBILITY AUDITOR ACTIVE"
              metricLabel="CONTRAST"
              metricValue={colorData.contrastRatio ? `${colorData.contrastRatio}:1` : "N/A"}
              accentColor={hexColor}
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">WCAG 2.1 Contrast Standards</p>
                <p className="text-slate-400 leading-relaxed">
                  Web Content Accessibility Guidelines require a minimum contrast ratio of <strong className="text-slate-200">4.5:1</strong> for normal body text to ensure readability for visually impaired users.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Design System Advice
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Prioritize passing WCAG AA across all primary navigation links, buttons, and form labels before deploying production themes.
              </p>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="UI/UX & Design System Architecture"
          serviceSlug="website-care"
          serviceDescription="Building accessible web applications or custom brand design systems? Snow creates WCAG AA compliant digital interfaces."
          careCategorySlug="website-care"
        />
      </Container>
    </ToolShell>
  );
}
