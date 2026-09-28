"use client";

import React, { useState, useMemo } from "react";
import { marked } from "marked";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolActions } from "@/components/tools/ToolActions";
import { ToolVisualStage } from "@/components/tools/ToolVisualStage";
import { ToolRecommendation } from "@/components/tools/ToolRecommendation";
import { Container } from "@/components/ui/Container";

const SAMPLE_MARKDOWN = `# Snow Markdown Utility

Welcome to the **Snow Live Markdown Previewer**.

## Key Features
- **GitHub-Flavored Markdown** support
- Headings, lists, tables, links, code blocks
- Live client-side rendering with HTML sanitization
- Clean document export & quick copy

### Example Code Block
\`\`\`typescript
interface Studio {
  name: string;
  focus: string[];
}

const snow: Studio = {
  name: "Snow Technology Studio",
  focus: ["Web", "Care", "Tools", "Infrastructure"]
};
\`\`\`

### Example Table
| Component | Status | Location |
| :--- | :--- | :--- |
| Core Engine | Active | Local Browser |
| Data Stream | Isolated | Zero Server Calls |

---
*Created for fast technical documentation.*
`;

function sanitizeHtml(dirtyHtml: string): string {
  if (!dirtyHtml) return "";
  let clean = dirtyHtml;
  // Strip dangerous tag blocks (script, iframe, object, embed, form, style, link, meta, base)
  clean = clean.replace(/<(script|iframe|object|embed|form|style|link|meta|base)\b[^>]*>([\s\S]*?)(<\/\1>)?/gi, "");
  // Strip self-closing or unclosed dangerous tags
  clean = clean.replace(/<(script|iframe|object|embed|form|style|link|meta|base)\b[^>]*\/?>/gi, "");
  // Strip all inline on* event handlers (e.g. onload, onerror, onclick)
  clean = clean.replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  // Neutralize javascript:, vbscript:, and non-image data: URIs in links or assets
  clean = clean.replace(/(href|src|data|action)\s*=\s*(?:"\s*(javascript|vbscript|data:(?!image\/)):[^"]*"|'\s*(javascript|vbscript|data:(?!image\/)):[^']*'|[^\s>]+)/gi, '$1="#"');
  // Strip srcdoc attributes
  clean = clean.replace(/\ssrcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  return clean;
}

export default function MarkdownToolPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);

  const renderedHtml = useMemo(() => {
    if (!markdown.trim()) return "";
    try {
      const rawHtml = marked.parse(markdown, { gfm: true, breaks: true }) as string;
      return sanitizeHtml(rawHtml);
    } catch (e: unknown) {
      console.error(e);
      return `<p class="text-rose-400">Failed to render Markdown.</p>`;
    }
  }, [markdown]);

  const handleDownload = () => {
    if (!markdown.trim()) return;
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell>
      <ToolHeader
        title="Markdown Live Preview & Editor"
        description="Write and preview GitHub-Flavored Markdown instantly with live client-side sanitization and export."
        category="BUILD UTILITY"
        badge="GFM Support"
      />
      <ToolNavigation />

      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Editor & Preview Column */}
          <div className="lg:col-span-8 space-y-6">
            <ToolInputPanel
              title="Markdown Source Editor"
              badge={`${markdown.length} Characters`}
              actions={
                <ToolActions
                  onSampleData={() => setMarkdown(SAMPLE_MARKDOWN)}
                  sampleLabel="Sample Markdown"
                  onClear={() => setMarkdown("")}
                  copyContent={markdown}
                  onDownload={markdown ? handleDownload : undefined}
                />
              }
            >
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Type or paste Markdown here..."
                rows={12}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-sky-200 font-mono text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all leading-relaxed resize-y"
              />
            </ToolInputPanel>

            <ToolOutputPanel
              title="Rendered HTML Output"
              badge="Sanitized Document"
              actions={<ToolActions copyContent={renderedHtml} sampleLabel="Copy Rendered HTML" />}
            >
              <div
                className="w-full p-6 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm overflow-x-auto min-h-[220px] max-h-[500px] overflow-y-auto leading-relaxed prose prose-invert max-w-none prose-headings:text-slate-100 prose-a:text-sky-400 prose-code:text-sky-300 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800"
                dangerouslySetInnerHTML={{ __html: renderedHtml || "<p class='text-slate-500 italic'>Rendered document preview will appear here...</p>" }}
              />
            </ToolOutputPanel>
          </div>

          {/* Right Visual / System Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <ToolVisualStage visualType="markdown"
              mode="design"
              statusLabel="DOCUMENT RENDER ACTIVE"
              metricLabel="CHAR COUNT"
              metricValue={String(markdown.length)}
              accentColor="#38bdf8"
            >
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <p className="font-semibold text-slate-200">XSS Protection & Sanitization</p>
                <p className="text-slate-400 leading-relaxed">
                  All generated HTML elements are stripped of executable scripts, inline event handlers (`onload`, `onclick`), iframes, and unsafe `javascript:` URIs.
                </p>
              </div>
            </ToolVisualStage>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Supported Elements
              </h4>
              <ul className="text-xs text-slate-300 space-y-1 font-mono">
                <li>• # Headings (H1 to H6)</li>
                <li>• **Bold**, *Italics*, ~Strikethrough~</li>
                <li>• [Links](https://snow.tech) & Images</li>
                <li>• Blockquotes & Code blocks</li>
                <li>• GFM Tables & Checklists</li>
              </ul>
            </div>
          </div>
        </div>

        <ToolRecommendation
          serviceName="Website & Portal Development"
          serviceSlug="website-care"
          serviceDescription="Need custom content publishing, technical documentation portals, or dynamic CMS integration for your business? Snow builds tailored web systems."
          careCategorySlug="website-care"
        />
      </Container>
    </ToolShell>
  );
}
