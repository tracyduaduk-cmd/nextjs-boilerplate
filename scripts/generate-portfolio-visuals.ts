import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const OUTPUT_DIR = path.resolve(process.cwd(), "public/assets/portfolio");

function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Common HTML header with Tailwind CSS & Google Fonts (Inter, JetBrains Mono)
const HTML_HEAD = `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #020617; color: #f8fafc; }
    .glass { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(16px); border: 1px solid rgba(51, 65, 85, 0.6); }
    .glass-card { background: rgba(30, 41, 59, 0.5); backdrop-filter: blur(12px); border: 1px solid rgba(71, 85, 105, 0.4); }
    .glow-cyan { box-shadow: 0 0 40px -10px rgba(6, 182, 212, 0.3); }
    .glow-sky { box-shadow: 0 0 40px -10px rgba(14, 165, 233, 0.3); }
    .glow-indigo { box-shadow: 0 0 40px -10px rgba(99, 102, 241, 0.3); }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 antialiased overflow-hidden">
`;

const HTML_FOOT = `</body></html>`;

// Helpers to build browser window frame
function wrapInBrowserFrame(title: string, url: string, content: string) {
  return `
    <div class="w-full h-full p-6 flex flex-col justify-center items-center bg-slate-950">
      <div class="w-full max-w-[1360px] h-[820px] rounded-2xl glass flex flex-col overflow-hidden shadow-2xl shadow-slate-950 border border-slate-800">
        <!-- Browser Header Chrome -->
        <div class="h-11 bg-slate-900/90 border-b border-slate-800/90 px-4 flex items-center justify-between shrink-0 select-none">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-rose-500/90"></div>
            <div class="w-3 h-3 rounded-full bg-amber-500/90"></div>
            <div class="w-3 h-3 rounded-full bg-emerald-500/90"></div>
          </div>
          <div class="flex-1 max-w-md mx-4 h-7 bg-slate-950/80 rounded-lg border border-slate-800 flex items-center justify-center px-3 text-xs font-mono text-slate-400 gap-2">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <span class="text-slate-200 font-medium">${url}</span>
          </div>
          <div class="flex items-center gap-2 text-slate-500 text-xs font-mono">
            <span>SSL 256-bit</span>
          </div>
        </div>
        <!-- Browser Body Content -->
        <div class="flex-1 overflow-hidden relative bg-slate-950 flex flex-col">
          ${content}
        </div>
      </div>
    </div>
  `;
}

function wrapInPhoneFrame(content: string) {
  return `
    <div class="w-full h-full p-4 flex flex-col justify-center items-center bg-slate-950">
      <div class="w-[360px] h-[780px] rounded-[48px] bg-slate-900 p-3 shadow-2xl shadow-slate-950 border-4 border-slate-700/80 relative flex flex-col overflow-hidden">
        <!-- Phone Speaker & Camera Notch -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center gap-2">
          <div class="w-3 h-3 rounded-full bg-slate-900"></div>
          <div class="w-2 h-2 rounded-full bg-slate-800"></div>
        </div>
        <!-- Phone Screen -->
        <div class="w-full h-full rounded-[38px] bg-slate-950 overflow-hidden flex flex-col pt-6 relative border border-slate-800">
          ${content}
        </div>
        <!-- Phone Home Bar -->
        <div class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-500/50 rounded-full z-50"></div>
      </div>
    </div>
  `;
}

function wrapInHeroComposition(
  projectName: string,
  categoryBadge: string,
  desktopContent: string,
  mobileContent: string,
  accentGlow: string = "bg-sky-500/20"
) {
  return `
    <div class="w-full h-full p-8 relative flex items-center justify-center bg-slate-950 overflow-hidden">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full ${accentGlow} blur-3xl"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"></div>

      <!-- Spatial Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <!-- Content Container -->
      <div class="relative z-10 w-full max-w-[1500px] h-[900px] flex items-center justify-between gap-8">

        <!-- Desktop Window (Left/Center Main) -->
        <div class="w-[1050px] h-[680px] rounded-2xl glass shadow-2xl shadow-sky-950/50 border border-slate-700/80 overflow-hidden flex flex-col transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          <div class="h-9 bg-slate-900 px-4 flex items-center justify-between border-b border-slate-800">
            <div class="flex items-center gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            </div>
            <div class="text-[11px] font-mono text-slate-400">${projectName} — Desktop Concept</div>
            <div class="text-[10px] font-mono text-sky-400 px-2 py-0.5 rounded bg-sky-950 border border-sky-800">${categoryBadge}</div>
          </div>
          <div class="flex-1 overflow-hidden relative bg-slate-950">
            ${desktopContent}
          </div>
        </div>

        <!-- Mobile Window Overlay (Right Foreground) -->
        <div class="w-[320px] h-[620px] rounded-[40px] bg-slate-900 p-2.5 shadow-2xl shadow-slate-950 border-2 border-slate-700/90 relative overflow-hidden transform translate-y-8 rotate-2 hover:rotate-0 transition-transform duration-500 shrink-0">
          <div class="w-full h-full rounded-[32px] bg-slate-950 overflow-hidden flex flex-col pt-4 relative border border-slate-800">
            ${mobileContent}
          </div>
        </div>

      </div>
    </div>
  `;
}

// Generate templates for each project
const PROJECT_TEMPLATES: Record<
  string,
  {
    desktop: () => string;
    mobile: () => string;
    hero: () => string;
  }
> = {
  "aurora-commerce": {
    desktop: () =>
      wrapInBrowserFrame(
        "Aurora Commerce",
        "https://auroracommerce.studio",
        `
        <div class="flex flex-col h-full bg-slate-950 text-slate-100">
          <header class="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
            <div class="flex items-center gap-8">
              <div class="flex items-center gap-2 font-extrabold text-xl tracking-wider text-sky-400 font-mono">
                <span class="w-3 h-3 rounded-full bg-sky-400"></span>
                <span>AURORA</span>
              </div>
              <nav class="flex gap-6 text-xs font-mono text-slate-400">
                <a href="#" class="text-sky-400 font-semibold">STOREFRONT</a>
                <a href="#">AUDIO</a>
                <a href="#">APPAREL</a>
                <a href="#">HARDWARE</a>
                <a href="#">JOURNAL</a>
              </nav>
            </div>
            <div class="flex items-center gap-4">
              <div class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
                <span>Search collection...</span>
                <span class="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">⌘K</span>
              </div>
              <div class="px-3 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-sky-500/20">
                <span>BAG</span>
                <span class="w-4 h-4 rounded-full bg-slate-950 text-sky-400 text-[10px] flex items-center justify-center font-bold">3</span>
              </div>
            </div>
          </header>

          <main class="flex-1 p-8 grid grid-cols-12 gap-6 overflow-hidden">
            <div class="col-span-7 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 flex flex-col justify-between relative overflow-hidden group">
              <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl"></div>
              <div class="space-y-3 relative z-10">
                <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-400 text-xs font-mono">
                  <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                  <span>NEW RELEASE • SPATIAL AUDIO</span>
                </div>
                <h1 class="text-4xl font-extrabold text-slate-100 tracking-tight">Aurora ANC Studio Headphones</h1>
                <p class="text-sm text-slate-400 max-w-md leading-relaxed">Precision custom planar drivers with 3D spatial acoustic mapping and zero-latency wireless connectivity.</p>
              </div>

              <div class="flex items-center gap-6 pt-6 border-t border-slate-800/80 relative z-10">
                <div>
                  <div class="text-xs font-mono text-slate-500">EXPRESS PRICE</div>
                  <div class="text-3xl font-extrabold text-slate-100">$299.00</div>
                </div>
                <button class="px-6 py-3 rounded-xl bg-sky-400 text-slate-950 font-bold text-sm font-mono shadow-xl shadow-sky-400/20 hover:bg-sky-300">
                  ADD TO EXPRESS BAG →
                </button>
              </div>
            </div>

            <div class="col-span-5 grid grid-rows-2 gap-6">
              <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between">
                <div class="flex justify-between items-start">
                  <div>
                    <span class="text-[10px] font-mono text-emerald-400 uppercase">In Stock • 42 Units</span>
                    <h3 class="text-lg font-bold text-slate-200">Modular Aluminum Stand</h3>
                  </div>
                  <span class="text-lg font-mono font-bold text-sky-400">$89.00</span>
                </div>
                <div class="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>Matte Onyx Black</span>
                  <span class="text-sky-400 underline">Quick View</span>
                </div>
              </div>

              <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between">
                <div class="flex justify-between items-start">
                  <div>
                    <span class="text-[10px] font-mono text-sky-400 uppercase">MagSafe Audio Pod</span>
                    <h3 class="text-lg font-bold text-slate-200">Aurora Pocket Amp</h3>
                  </div>
                  <span class="text-lg font-mono font-bold text-sky-400">$149.00</span>
                </div>
                <div class="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>24-bit / 192kHz DAC</span>
                  <span class="text-sky-400 underline">Quick View</span>
                </div>
              </div>
            </div>
          </main>
        </div>
        `
      ),
    mobile: () =>
      wrapInPhoneFrame(`
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 p-4 justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="font-extrabold font-mono text-sky-400 text-sm">AURORA STORE</div>
              <div class="px-2 py-1 rounded bg-sky-500 text-slate-950 font-bold text-[10px]">BAG (3)</div>
            </div>

            <div class="rounded-xl bg-slate-900 p-4 border border-slate-800 space-y-2">
              <span class="text-[9px] font-mono text-sky-400">LIMITED EDITION</span>
              <h2 class="text-base font-bold text-slate-100">ANC Studio Headphones</h2>
              <div class="text-xl font-mono font-extrabold text-sky-400">$299.00</div>
              <div class="text-xs text-slate-400">3D Spatial Acoustic Mapping • 40h Battery</div>
            </div>

            <div class="rounded-xl bg-slate-900/80 p-3 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-slate-200">Express Checkout</div>
              <div class="w-full py-2 rounded-lg bg-white text-black font-bold text-xs text-center flex items-center justify-center gap-1">
                <span>Pay with Apple Pay</span>
              </div>
            </div>
          </div>

          <div class="p-2 rounded-xl bg-slate-900 border border-slate-800 flex justify-around text-[10px] font-mono text-slate-400">
            <span class="text-sky-400 font-bold">SHOP</span>
            <span>SEARCH</span>
            <span>BAG</span>
            <span>ACCOUNT</span>
          </div>
        </div>
      `),
    hero: () =>
      wrapInHeroComposition(
        "AURORA COMMERCE",
        "E-COMMERCE UI",
        PROJECT_TEMPLATES["aurora-commerce"].desktop(),
        PROJECT_TEMPLATES["aurora-commerce"].mobile(),
        "bg-sky-500/20"
      ),
  },

  "pulse-health": {
    desktop: () =>
      wrapInBrowserFrame(
        "Pulse Health",
        "https://portal.pulsehealth.io",
        `
        <div class="flex h-full bg-slate-950 text-slate-100">
          <!-- Sidebar -->
          <aside class="w-60 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
            <div class="space-y-6">
              <div class="flex items-center gap-2 font-mono font-extrabold text-emerald-400 text-lg">
                <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>PULSE HEALTH</span>
              </div>
              <nav class="space-y-1.5 text-xs font-mono">
                <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  <span>TELEMETRY DASHBOARD</span>
                </a>
                <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800">
                  <span>PATIENT RECORDS</span>
                </a>
                <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800">
                  <span>VITAL SIGN STREAM</span>
                </a>
                <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800">
                  <span>AI DIAGNOSTICS</span>
                </a>
              </nav>
            </div>
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono">
              <div class="text-slate-400">CLINICIAN ID</div>
              <div class="text-emerald-400 font-bold">DR. SARAH VANCE, M.D.</div>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="flex-1 p-6 space-y-6 overflow-hidden">
            <div class="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <h1 class="text-2xl font-bold text-slate-100">Live Cardiac & Vital Telemetry</h1>
                <p class="text-xs font-mono text-slate-400">PATIENT ID: #PH-89201 • ROOM 402 • BED 01</p>
              </div>
              <div class="flex gap-3">
                <div class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>LIVE STREAMING 60Hz</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
                <div class="flex justify-between items-center text-xs font-mono">
                  <span class="text-slate-400">ECG WAVEFORM MONITORING (LEAD II)</span>
                  <span class="text-emerald-400 font-bold">72 BPM • SINUS RHYTHM</span>
                </div>
                <!-- Simulated Waveform SVG -->
                <div class="h-32 rounded-xl bg-slate-950 border border-slate-800/80 p-3 flex items-center justify-center relative overflow-hidden">
                  <svg class="w-full h-full text-emerald-400" viewBox="0 0 500 100" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M 0 50 L 100 50 L 110 20 L 120 80 L 130 10 L 140 60 L 150 50 L 250 50 L 260 20 L 270 80 L 280 10 L 290 60 L 300 50 L 400 50 L 410 20 L 420 80 L 430 10 L 440 60 L 450 50 L 500 50" />
                  </svg>
                </div>
                <div class="grid grid-cols-3 gap-4 pt-2 text-center font-mono">
                  <div class="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <div class="text-[10px] text-slate-500">SpO2</div>
                    <div class="text-lg font-bold text-sky-400">98%</div>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <div class="text-[10px] text-slate-500">BLOOD PRESSURE</div>
                    <div class="text-lg font-bold text-emerald-400">120/80</div>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <div class="text-[10px] text-slate-500">RESPIRATION</div>
                    <div class="text-lg font-bold text-indigo-400">16 bpm</div>
                  </div>
                </div>
              </div>

              <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
                <div class="text-xs font-mono text-slate-400">AI RISK ASSESSMENT</div>
                <div class="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-2">
                  <div class="text-emerald-400 font-bold text-sm">OPTIMAL HEALTH INDEX</div>
                  <div class="text-2xl font-extrabold font-mono text-slate-100">98.4<span class="text-xs text-slate-400">/100</span></div>
                  <p class="text-xs text-slate-400 leading-snug">No arrhythmia or ischemia detected in past 24 hours.</p>
                </div>
                <div class="text-xs font-mono text-slate-400 pt-2">SCHEDULED CONSULTATION</div>
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                  <div class="text-slate-200 font-bold">10:30 AM — Video Follow-up</div>
                  <div class="text-slate-500">Dr. Marcus Vance</div>
                </div>
              </div>
            </div>
          </main>
        </div>
        `
      ),
    mobile: () =>
      wrapInPhoneFrame(`
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 p-4 justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="font-extrabold font-mono text-emerald-400 text-sm">PULSE APP</div>
              <div class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
            </div>

            <div class="rounded-xl bg-slate-900 p-4 border border-slate-800 space-y-2">
              <span class="text-[9px] font-mono text-emerald-400">PATIENT HEALTH APP</span>
              <h2 class="text-base font-bold text-slate-100">Daily Health Telemetry</h2>
              <div class="text-2xl font-mono font-extrabold text-emerald-400">72 <span class="text-xs font-sans text-slate-400">BPM</span></div>
              <div class="text-xs text-slate-400">ECG Normal • Synced 2m ago</div>
            </div>

            <div class="rounded-xl bg-slate-900/80 p-3 border border-slate-800 space-y-2">
              <div class="text-xs font-bold text-slate-200">Consult Specialist</div>
              <button class="w-full py-2 rounded-lg bg-emerald-400 text-slate-950 font-bold text-xs">
                START VIDEO CALL
              </button>
            </div>
          </div>

          <div class="p-2 rounded-xl bg-slate-900 border border-slate-800 flex justify-around text-[10px] font-mono text-slate-400">
            <span class="text-emerald-400 font-bold">VITALS</span>
            <span>RECORDS</span>
            <span>CALL</span>
            <span>SETTINGS</span>
          </div>
        </div>
      `),
    hero: () =>
      wrapInHeroComposition(
        "PULSE HEALTH",
        "HEALTHCARE UI",
        PROJECT_TEMPLATES["pulse-health"].desktop(),
        PROJECT_TEMPLATES["pulse-health"].mobile(),
        "bg-emerald-500/20"
      ),
  },

  "orbit-finance": {
    desktop: () =>
      wrapInBrowserFrame(
        "Orbit Finance",
        "https://terminal.orbitfinance.com",
        `
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 font-mono">
          <!-- Top Ticker Bar -->
          <div class="h-10 border-b border-slate-800 bg-slate-900/80 px-6 flex items-center justify-between text-xs">
            <div class="flex items-center gap-6">
              <span class="font-extrabold text-indigo-400 text-sm">ORBIT TERMINAL</span>
              <span class="text-slate-400">BTC/USD <span class="text-emerald-400 font-bold">$94,210.00 (+2.4%)</span></span>
              <span class="text-slate-400">ETH/USD <span class="text-emerald-400 font-bold">$3,450.50 (+1.8%)</span></span>
              <span class="text-slate-400">NVDA <span class="text-emerald-400 font-bold">$142.80 (+3.1%)</span></span>
            </div>
            <div class="text-slate-500 text-[11px]">LATENCY: 1.2ms • HIGH-FREQUENCY STREAM</div>
          </div>

          <!-- Main Layout -->
          <div class="flex-1 p-6 grid grid-cols-12 gap-6 overflow-hidden">
            <!-- Left Chart Column -->
            <div class="col-span-8 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between">
              <div class="flex justify-between items-center pb-4 border-b border-slate-800">
                <div>
                  <div class="text-[10px] text-slate-500">TOTAL PORTFOLIO VALUE</div>
                  <div class="text-3xl font-extrabold text-slate-100 font-sans">$2,480,920.45 <span class="text-sm font-mono text-emerald-400">+$34,120.10 (+1.4%)</span></div>
                </div>
                <div class="flex gap-2">
                  <span class="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs">1D</span>
                  <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs">1W</span>
                  <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs">1M</span>
                  <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs">1Y</span>
                </div>
              </div>

              <!-- Candlestick Graphic Placeholder -->
              <div class="h-48 rounded-xl bg-slate-950 border border-slate-800/80 p-4 flex items-end justify-between gap-2">
                <div class="w-full bg-emerald-500/30 border-t-2 border-emerald-400 rounded-t h-[40%]"></div>
                <div class="w-full bg-rose-500/30 border-t-2 border-rose-400 rounded-t h-[60%]"></div>
                <div class="w-full bg-emerald-500/30 border-t-2 border-emerald-400 rounded-t h-[80%]"></div>
                <div class="w-full bg-emerald-500/30 border-t-2 border-emerald-400 rounded-t h-[95%]"></div>
                <div class="w-full bg-rose-500/30 border-t-2 border-rose-400 rounded-t h-[70%]"></div>
                <div class="w-full bg-emerald-500/30 border-t-2 border-emerald-400 rounded-t h-[100%]"></div>
              </div>

              <div class="grid grid-cols-4 gap-4 text-center text-xs">
                <div class="p-2 rounded bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-500">SHARPE RATIO</div>
                  <div class="font-bold text-indigo-400">2.84</div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-500">MAX DRAWDOWN</div>
                  <div class="font-bold text-emerald-400">-3.2%</div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-500">ALPHA</div>
                  <div class="font-bold text-indigo-400">+4.12%</div>
                </div>
                <div class="p-2 rounded bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-500">WIN RATE</div>
                  <div class="font-bold text-emerald-400">76.4%</div>
                </div>
              </div>
            </div>

            <!-- Right Trading Widget Column -->
            <div class="col-span-4 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between">
              <div class="text-xs font-bold text-slate-300 pb-3 border-b border-slate-800">INSTANT ORDER EXECUTION</div>

              <div class="space-y-3 font-sans">
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="text-[10px] font-mono text-slate-500">YOU PAY</div>
                  <div class="flex justify-between items-center pt-1 font-mono">
                    <span class="text-xl font-bold">10,000.00</span>
                    <span class="text-xs text-indigo-400 font-bold bg-indigo-950 px-2 py-0.5 rounded">USDC</span>
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="text-[10px] font-mono text-slate-500">YOU RECEIVE (EST.)</div>
                  <div class="flex justify-between items-center pt-1 font-mono">
                    <span class="text-xl font-bold text-emerald-400">2.8985</span>
                    <span class="text-xs text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">ETH</span>
                  </div>
                </div>
              </div>

              <button class="w-full py-3 rounded-xl bg-indigo-500 text-slate-950 font-bold text-sm font-sans shadow-xl shadow-indigo-500/20">
                EXECUTE SWAP ORDER →
              </button>
            </div>
          </div>
        </div>
        `
      ),
    mobile: () =>
      wrapInPhoneFrame(`
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 p-4 justify-between font-mono">
          <div class="space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="font-extrabold text-indigo-400 text-sm">ORBIT MOBILE</div>
              <div class="px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 text-[9px] border border-indigo-800">BIOMETRIC OK</div>
            </div>

            <div class="rounded-xl bg-slate-900 p-4 border border-slate-800 space-y-2">
              <div class="text-[9px] text-slate-500">TOTAL PORTFOLIO</div>
              <div class="text-2xl font-extrabold text-slate-100">$2,480,920</div>
              <div class="text-xs text-emerald-400 font-bold">+$34,120.10 (Today)</div>
            </div>

            <div class="grid grid-cols-2 gap-2 font-sans">
              <button class="py-2.5 rounded-lg bg-indigo-500 text-slate-950 font-bold text-xs">DEPOSIT</button>
              <button class="py-2.5 rounded-lg bg-slate-800 text-slate-200 font-bold text-xs">WITHDRAW</button>
            </div>
          </div>

          <div class="p-2 rounded-xl bg-slate-900 border border-slate-800 flex justify-around text-[10px] text-slate-400">
            <span class="text-indigo-400 font-bold">HOME</span>
            <span>TRADE</span>
            <span>MARKETS</span>
            <span>ACCOUNT</span>
          </div>
        </div>
      `),
    hero: () =>
      wrapInHeroComposition(
        "ORBIT FINANCE",
        "FINTECH TERMINAL",
        PROJECT_TEMPLATES["orbit-finance"].desktop(),
        PROJECT_TEMPLATES["orbit-finance"].mobile(),
        "bg-indigo-500/20"
      ),
  },

  "nova-ai-assistant": {
    desktop: () =>
      wrapInBrowserFrame(
        "Nova AI Assistant",
        "https://app.nova.ai",
        `
        <div class="flex h-full bg-slate-950 text-slate-100">
          <!-- Sidebar -->
          <aside class="w-64 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
            <div class="space-y-6">
              <div class="flex items-center gap-2 font-mono font-extrabold text-purple-400 text-lg">
                <span class="w-3 h-3 rounded-full bg-purple-400"></span>
                <span>NOVA AI</span>
              </div>
              <button class="w-full py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold">+ NEW THREAD</button>
              <div class="space-y-1 text-xs text-slate-400 font-mono">
                <div class="p-2 rounded bg-slate-800/80 text-slate-200">Refactoring Rust Pipeline</div>
                <div class="p-2 rounded hover:bg-slate-800">Vector Search Latency</div>
                <div class="p-2 rounded hover:bg-slate-800">Database Indexing Study</div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
              <span>MODEL: NOVA-4 TURBO</span>
            </div>
          </aside>

          <!-- Main Workspace -->
          <main class="flex-1 p-6 flex flex-col justify-between overflow-hidden">
            <div class="space-y-4 overflow-y-auto">
              <!-- User Message -->
              <div class="flex gap-4 items-start">
                <div class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center font-bold">YOU</div>
                <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-sm max-w-2xl leading-relaxed">
                  Optimize our vector search indexing pipeline for sub-10ms query times over 10M embeddings.
                </div>
              </div>

              <!-- Nova AI Response -->
              <div class="flex gap-4 items-start">
                <div class="w-8 h-8 rounded-full bg-purple-500 text-slate-950 font-mono text-xs flex items-center justify-center font-extrabold">NOVA</div>
                <div class="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/80 text-sm max-w-2xl space-y-3">
                  <div class="flex items-center gap-2 text-xs font-mono text-purple-400">
                    <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                    <span>AGENT EXECUTED PGVECTOR INDEX INSPECTION (14ms)</span>
                  </div>
                  <p class="text-slate-300 leading-relaxed">I've analyzed your database schema and generated an optimized HNSW index configuration:</p>
                  <pre class="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">CREATE INDEX ON embeddings_table
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);</pre>
                </div>
              </div>
            </div>

            <!-- Input Bar -->
            <div class="pt-4 border-t border-slate-800">
              <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span class="text-xs text-slate-500 font-mono">Ask Nova to run benchmarks or execute agent tools...</span>
                <button class="px-4 py-1.5 rounded-lg bg-purple-500 text-slate-950 font-bold text-xs font-mono">SEND →</button>
              </div>
            </div>
          </main>
        </div>
        `
      ),
    mobile: () =>
      wrapInPhoneFrame(`
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 p-4 justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="font-extrabold font-mono text-purple-400 text-sm">NOVA AI MOBILE</div>
              <span class="text-[10px] font-mono text-purple-300">ONLINE</span>
            </div>

            <div class="rounded-xl bg-slate-900 p-3 border border-slate-800 space-y-2">
              <div class="text-[10px] font-mono text-purple-400">VOICE ASSISTANT</div>
              <div class="h-10 bg-slate-950 rounded-lg flex items-center justify-center gap-1">
                <div class="w-1 h-4 bg-purple-400 rounded-full animate-bounce"></div>
                <div class="w-1 h-6 bg-purple-400 rounded-full animate-bounce"></div>
                <div class="w-1 h-3 bg-purple-400 rounded-full animate-bounce"></div>
              </div>
              <div class="text-xs text-slate-300">"Streaming sub-10ms response..."</div>
            </div>
          </div>

          <div class="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs font-mono text-purple-400">
            HOLD TO SPEAK
          </div>
        </div>
      `),
    hero: () =>
      wrapInHeroComposition(
        "NOVA AI ASSISTANT",
        "AI WORKSPACE",
        PROJECT_TEMPLATES["nova-ai-assistant"].desktop(),
        PROJECT_TEMPLATES["nova-ai-assistant"].mobile(),
        "bg-purple-500/20"
      ),
  },

  "atlas-business-portal": {
    desktop: () =>
      wrapInBrowserFrame(
        "Atlas Business Portal",
        "https://atlas.enterprise.internal",
        `
        <div class="flex h-full bg-slate-950 text-slate-100 font-sans">
          <aside class="w-60 border-r border-slate-800 bg-slate-900/60 p-4 space-y-6">
            <div class="font-mono font-extrabold text-cyan-400 text-lg">ATLAS PORTAL</div>
            <nav class="space-y-2 text-xs font-mono text-slate-400">
              <div class="p-2 rounded bg-cyan-950 text-cyan-400 font-bold">OPERATIONS CENTER</div>
              <div class="p-2 rounded hover:bg-slate-800">GLOBAL CLUSTERS</div>
              <div class="p-2 rounded hover:bg-slate-800">USER PERMISSIONS</div>
              <div class="p-2 rounded hover:bg-slate-800">TELEMETRY LOGS</div>
            </nav>
          </aside>

          <main class="flex-1 p-6 space-y-6 overflow-hidden">
            <div class="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <h1 class="text-2xl font-bold">Enterprise Operations Telemetry</h1>
                <p class="text-xs font-mono text-slate-400">12 ACTIVE REGIONAL CLUSTERS • ALL OPERATIONAL</p>
              </div>
              <div class="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-mono">
                99.998% SYSTEM SLA
              </div>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div class="text-xs font-mono text-slate-500">LIVE SESSIONS</div>
                <div class="text-3xl font-extrabold font-mono text-cyan-400">14,290</div>
                <div class="text-xs text-slate-400">+12.4% from peak hour</div>
              </div>

              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div class="text-xs font-mono text-slate-500">THROUGHPUT</div>
                <div class="text-3xl font-extrabold font-mono text-slate-100">4.8 GB/s</div>
                <div class="text-xs text-slate-400">Edge network cached</div>
              </div>

              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div class="text-xs font-mono text-slate-500">ACTIVE INCIDENTS</div>
                <div class="text-3xl font-extrabold font-mono text-emerald-400">0</div>
                <div class="text-xs text-slate-400">Zero active alerts</div>
              </div>
            </div>
          </main>
        </div>
        `
      ),
    mobile: () =>
      wrapInPhoneFrame(`
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 p-4 justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="font-extrabold font-mono text-cyan-400 text-sm">ATLAS MOBILE</div>
              <span class="text-[10px] font-mono text-emerald-400">SLA 99.99%</span>
            </div>

            <div class="rounded-xl bg-slate-900 p-4 border border-slate-800 space-y-2">
              <div class="text-[9px] font-mono text-slate-500">EXECUTIVE METRICS</div>
              <div class="text-2xl font-extrabold font-mono text-cyan-400">14,290 Users</div>
              <div class="text-xs text-slate-400">All 12 clusters healthy</div>
            </div>
          </div>

          <div class="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs font-mono text-slate-400">
            EXECUTIVE VIEW
          </div>
        </div>
      `),
    hero: () =>
      wrapInHeroComposition(
        "ATLAS BUSINESS PORTAL",
        "ENTERPRISE SaaS",
        PROJECT_TEMPLATES["atlas-business-portal"].desktop(),
        PROJECT_TEMPLATES["atlas-business-portal"].mobile(),
        "bg-cyan-500/20"
      ),
  },

  "studio-landing": {
    desktop: () =>
      wrapInBrowserFrame(
        "Studio Landing",
        "https://snowstudio.design",
        `
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 p-8 justify-between">
          <header class="flex justify-between items-center pb-6 border-b border-slate-800">
            <div class="font-extrabold text-2xl tracking-tighter font-mono">SNOW ARCHITECTURE</div>
            <nav class="flex gap-6 text-xs font-mono text-slate-400">
              <span class="text-slate-100 font-bold">PROJECTS</span>
              <span>STUDIO</span>
              <span>PHILOSOPHY</span>
              <span>CONTACT</span>
            </nav>
          </header>

          <main class="my-auto space-y-6">
            <span class="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">SPATIAL DESIGN SHOWCASE</span>
            <h1 class="text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">Crafting Digital & Physical Spatial Experiences</h1>
            <p class="text-slate-400 max-w-xl text-lg">Uncompromising architectural detail meets high-speed web engine development.</p>
          </main>

          <footer class="pt-6 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
            <span>© 2026 SNOW STUDIO</span>
            <span>DESIGN EXPLORATION 01</span>
          </footer>
        </div>
        `
      ),
    mobile: () =>
      wrapInPhoneFrame(`
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 p-4 justify-between">
          <div class="space-y-4">
            <div class="font-extrabold font-mono text-sm border-b border-slate-800 pb-3">SNOW ARCHITECTURE</div>
            <h1 class="text-2xl font-extrabold leading-snug">Spatial Design Showcase</h1>
            <p class="text-xs text-slate-400">Digital and physical spatial craftsmanship.</p>
          </div>
          <div class="text-[10px] font-mono text-slate-500">SWIPE TO EXPLORE</div>
        </div>
      `),
    hero: () =>
      wrapInHeroComposition(
        "STUDIO LANDING",
        "SPATIAL DESIGN",
        PROJECT_TEMPLATES["studio-landing"].desktop(),
        PROJECT_TEMPLATES["studio-landing"].mobile(),
        "bg-slate-500/20"
      ),
  },

  "local-services-platform": {
    desktop: () =>
      wrapInBrowserFrame(
        "Local Services Platform",
        "https://services.local.app",
        `
        <div class="flex h-full bg-slate-950 text-slate-100">
          <div class="w-1/2 p-6 space-y-4 overflow-y-auto border-r border-slate-800">
            <div class="font-mono font-extrabold text-amber-400 text-lg">URBAN SERVICES</div>
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">Search local verified providers...</div>

            <div class="space-y-3">
              <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-slate-200">Apex Plumbing & Heating</span>
                  <span class="text-xs font-mono text-amber-400">4.9 ★ (120 reviews)</span>
                </div>
                <p class="text-xs text-slate-400">ETA: 12 mins • Licensed & Insured</p>
              </div>

              <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-slate-200">Metro Electric Masters</span>
                  <span class="text-xs font-mono text-amber-400">4.8 ★ (84 reviews)</span>
                </div>
                <p class="text-xs text-slate-400">ETA: 20 mins • Rapid Response</p>
              </div>
            </div>
          </div>

          <!-- Map View -->
          <div class="w-1/2 bg-slate-900 p-6 flex items-center justify-center relative">
            <div class="text-center font-mono space-y-2">
              <div class="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center font-bold text-lg">MAP</div>
              <div class="text-xs text-slate-400">VECTOR REGIONAL MAP LOADED</div>
            </div>
          </div>
        </div>
        `
      ),
    mobile: () =>
      wrapInPhoneFrame(`
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 p-4 justify-between">
          <div class="space-y-4">
            <div class="font-mono font-extrabold text-amber-400 text-sm border-b border-slate-800 pb-3">URBAN MOBILITY</div>
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <div class="font-bold">Apex Plumbing</div>
              <div class="text-[10px] text-slate-400">ETA 4 mins away</div>
            </div>
            <button class="w-full py-2.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs">BOOK INSTANTLY</button>
          </div>
          <div class="p-2 rounded-xl bg-slate-900 text-center text-[10px] font-mono text-slate-400">PWA OFFLINE-READY</div>
        </div>
      `),
    hero: () =>
      wrapInHeroComposition(
        "LOCAL SERVICES PLATFORM",
        "PWA MARKETPLACE",
        PROJECT_TEMPLATES["local-services-platform"].desktop(),
        PROJECT_TEMPLATES["local-services-platform"].mobile(),
        "bg-amber-500/20"
      ),
  },

  "secure-account-recovery": {
    desktop: () =>
      wrapInBrowserFrame(
        "Secure Account Recovery",
        "https://defense.snowsecurity.io",
        `
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 font-mono">
          <header class="h-12 border-b border-slate-800 bg-slate-900/80 px-6 flex items-center justify-between text-xs">
            <div class="flex items-center gap-2 text-rose-400 font-extrabold">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span>CYBER TRIAGE & RECOVERY TERMINAL</span>
            </div>
            <div class="text-slate-400">ZERO-TRUST AUDIT MODE</div>
          </header>

          <main class="flex-1 p-6 grid grid-cols-12 gap-6">
            <div class="col-span-8 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-400">SECURITY POSTURE INDEX</span>
                <span class="text-rose-400 font-bold text-sm">98 / 100 • HARDENED</span>
              </div>
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div>[09:41:02] MFA Enforcement Challenge: SUCCESS</div>
                <div>[09:41:05] Cryptographic Audit Log Signed: sha256_e38a...</div>
                <div>[09:41:10] Session Revocation Signal Broadcasted</div>
              </div>
            </div>

            <div class="col-span-4 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3 text-xs">
              <div class="font-bold text-slate-200">ACTIVE AUTH VERIFICATION</div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-xl text-rose-400 font-extrabold">
                842 910
              </div>
              <div class="text-[10px] text-slate-500 text-center">TOTP Passcode refreshes in 18s</div>
            </div>
          </main>
        </div>
        `
      ),
    mobile: () =>
      wrapInPhoneFrame(`
        <div class="flex flex-col h-full bg-slate-950 text-slate-100 p-4 justify-between font-mono">
          <div class="space-y-4">
            <div class="font-extrabold text-rose-400 text-sm border-b border-slate-800 pb-3">DEFENSE AUTH</div>
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <div class="text-[10px] text-slate-500">MFA CHALLENGE</div>
              <div class="text-2xl font-extrabold text-rose-400">842 910</div>
            </div>
          </div>
          <div class="p-2 rounded-xl bg-slate-900 text-center text-[10px] text-slate-400">ZERO-TRUST SECURED</div>
        </div>
      `),
    hero: () =>
      wrapInHeroComposition(
        "SECURE ACCOUNT RECOVERY",
        "CYBERSECURITY",
        PROJECT_TEMPLATES["secure-account-recovery"].desktop(),
        PROJECT_TEMPLATES["secure-account-recovery"].mobile(),
        "bg-rose-500/20"
      ),
  },
};

async function generateAllVisuals() {
  console.log("==================================================");
  console.log("Generating High-Fidelity Web/App Visuals for Snow");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const slugs = Object.keys(PROJECT_TEMPLATES);

  for (const slug of slugs) {
    console.log(`\n📷 Rendering project visuals: ${slug}`);
    const slugDir = path.join(OUTPUT_DIR, slug);
    ensureDirectoryExists(slugDir);

    const templates = PROJECT_TEMPLATES[slug];

    // 1. Desktop Visual (1440x900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.setContent(HTML_HEAD + templates.desktop() + HTML_FOOT, { waitUntil: "networkidle" });
    const desktopPath = path.join(slugDir, "desktop.webp");
    await page.screenshot({ path: desktopPath, type: "webp", quality: 90 });
    console.log(`  ✓ Created ${desktopPath}`);

    // 2. Mobile Visual (390x844)
    await page.setViewportSize({ width: 420, height: 860 });
    await page.setContent(HTML_HEAD + templates.mobile() + HTML_FOOT, { waitUntil: "networkidle" });
    const mobilePath = path.join(slugDir, "mobile.webp");
    await page.screenshot({ path: mobilePath, type: "webp", quality: 90 });
    console.log(`  ✓ Created ${mobilePath}`);

    // 3. Hero Visual (1600x1000)
    await page.setViewportSize({ width: 1600, height: 1000 });
    await page.setContent(HTML_HEAD + templates.hero() + HTML_FOOT, { waitUntil: "networkidle" });
    const heroPath = path.join(slugDir, "hero.webp");
    await page.screenshot({ path: heroPath, type: "webp", quality: 90 });
    console.log(`  ✓ Created ${heroPath}`);
  }

  await browser.close();
  console.log("\n==================================================");
  console.log("All 24 High-Fidelity Portfolio Visuals Generated!");
  console.log("==================================================\n");
}

generateAllVisuals().catch((err) => {
  console.error("Failed to generate visuals:", err);
  process.exit(1);
});
