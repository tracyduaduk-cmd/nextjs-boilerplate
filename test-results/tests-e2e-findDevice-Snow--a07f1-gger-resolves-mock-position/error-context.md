# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/e2e/findDevice.spec.ts >> Snow Find My Device & Spatial Location Suite >> Browser GPS Geolocation trigger resolves mock position
- Location: tests/e2e/findDevice.spec.ts:20:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: /LOCATE MY DEVICE/i }) resolved to 2 elements:
    1) <button type="button" class="px-4 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-sky-950/50 flex items-center gap-2 disabled:opacity-40">…</button> aka getByRole('button', { name: 'LOCATE MY DEVICE', exact: true })
    2) <button type="button" class="px-5 py-2.5 rounded-xl bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-sky-950/50">LOCATE MY DEVICE NOW</button> aka getByRole('button', { name: 'LOCATE MY DEVICE NOW' })

Call log:
  - waiting for getByRole('button', { name: /LOCATE MY DEVICE/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e3]:
    - banner:
      - navigation "Global Spatial Navigation" [ref=e4]:
        - link "SNOW STUDIO" [ref=e6] [cursor=pointer]:
          - /url: /
          - generic [ref=e11]:
            - generic [ref=e12]: SNOW
            - generic [ref=e14]: STUDIO
        - generic [ref=e15]:
          - link "Work" [ref=e16] [cursor=pointer]:
            - /url: /work
          - link "Services" [ref=e17] [cursor=pointer]:
            - /url: /#services
          - link "Care" [ref=e18] [cursor=pointer]:
            - /url: /care
          - link "Tools" [ref=e19] [cursor=pointer]:
            - /url: /tools
        - link "START PROJECT" [ref=e21] [cursor=pointer]:
          - /url: /request
    - main [ref=e26]:
      - generic [ref=e30]:
        - generic [ref=e31]:
          - generic [ref=e32]: NETWORK LAYER
          - generic [ref=e35]: Spatial / GPS
          - generic [ref=e38]: 100% Client-Side Isolation
          - generic [ref=e41]: Location Engine Ready • Standby
        - heading "Find My Device & Spatial Location Center" [level=1] [ref=e44]
        - paragraph [ref=e45]: Browser-native GPS geolocation, interactive spatial earth mapping, device recovery simulator, session location trail, and client-side device diagnostic instrumentation.
      - navigation "Snow Tool Command Navigation" [ref=e46]:
        - generic [ref=e47]:
          - generic [ref=e49]:
            - generic [ref=e52]: SNOW_CONSOLE
            - generic [ref=e55]: Find Device
          - generic [ref=e56]:
            - button "All Instruments" [ref=e57]
            - button "Build" [ref=e59]
            - button "Encode" [ref=e60]
            - button "Design" [ref=e61]
            - button "Website Lab" [ref=e62]
            - button "Network" [ref=e63]
            - button "Diagnostics" [ref=e64]
          - generic [ref=e65]:
            - link "Overview" [ref=e66] [cursor=pointer]:
              - /url: /tools
            - link "Network Live" [ref=e67] [cursor=pointer]:
              - /url: /network
              - generic [ref=e73]: Network
              - generic [ref=e74]: Live
            - link "Find Device GPS" [ref=e75] [cursor=pointer]:
              - /url: /network/find
              - generic [ref=e78]: Find Device
              - generic [ref=e79]: GPS
            - link "DNS" [ref=e80] [cursor=pointer]:
              - /url: /network/dns
            - link "IP Info" [ref=e85] [cursor=pointer]:
              - /url: /network/ip
            - link "Device" [ref=e91] [cursor=pointer]:
              - /url: /network/device
            - link "Speed" [ref=e95] [cursor=pointer]:
              - /url: /network/speed
            - link "JSON Local" [ref=e100] [cursor=pointer]:
              - /url: /tools/json
              - generic [ref=e105]: JSON
              - generic [ref=e106]: Local
            - link "Markdown GFM" [ref=e107] [cursor=pointer]:
              - /url: /tools/markdown
              - generic [ref=e111]: Markdown
              - generic [ref=e112]: GFM
            - link "Regex" [ref=e113] [cursor=pointer]:
              - /url: /tools/regex
            - link "Encoder UTF-8" [ref=e118] [cursor=pointer]:
              - /url: /tools/encode
              - generic [ref=e124]: Encoder
              - generic [ref=e125]: UTF-8
            - link "UUID Crypto" [ref=e126] [cursor=pointer]:
              - /url: /tools/uuid
              - generic [ref=e130]: UUID
              - generic [ref=e131]: Crypto
            - link "Hash Subtle" [ref=e132] [cursor=pointer]:
              - /url: /tools/hash
              - generic [ref=e136]: Hash
              - generic [ref=e137]: Subtle
            - link "Color WCAG" [ref=e138] [cursor=pointer]:
              - /url: /tools/color
              - generic [ref=e145]: Color
              - generic [ref=e146]: WCAG
            - link "QR Code" [ref=e147] [cursor=pointer]:
              - /url: /tools/qr
            - link "Screenshot Cloudflare" [ref=e155] [cursor=pointer]:
              - /url: /tools/website/screenshot
              - generic [ref=e159]: Screenshot
              - generic [ref=e160]: Cloudflare
            - link "PDF Export Cloudflare" [ref=e161] [cursor=pointer]:
              - /url: /tools/website/pdf
              - generic [ref=e165]: PDF Export
              - generic [ref=e166]: Cloudflare
            - link "Inspect Cloudflare" [ref=e167] [cursor=pointer]:
              - /url: /tools/website/inspect
              - generic [ref=e173]: Inspect
              - generic [ref=e174]: Cloudflare
            - link "Health Soon" [ref=e175] [cursor=pointer]:
              - /url: /tools/website-health
              - generic [ref=e178]: Health
              - generic [ref=e179]: Soon
            - link "Speed Soon" [ref=e180] [cursor=pointer]:
              - /url: /tools/speed
              - generic [ref=e184]: Speed
              - generic [ref=e185]: Soon
            - link "SEO Soon" [ref=e186] [cursor=pointer]:
              - /url: /tools/seo
              - generic [ref=e191]: SEO
              - generic [ref=e192]: Soon
            - link "Security Soon" [ref=e193] [cursor=pointer]:
              - /url: /tools/security
              - generic [ref=e196]: Security
              - generic [ref=e197]: Soon
            - link "AI Audit Soon" [ref=e198] [cursor=pointer]:
              - /url: /tools/ai-readiness
              - generic [ref=e202]: AI Audit
              - generic [ref=e203]: Soon
      - generic [ref=e204]:
        - generic [ref=e207]:
          - generic [ref=e212]:
            - generic [ref=e213]:
              - heading "Spatial Location Console" [level=3] [ref=e214]
              - generic [ref=e215]: READY
            - paragraph [ref=e216]: 100% Client-Side • Zero Database Retention
          - generic [ref=e217]:
            - button "LOCATE MY DEVICE" [ref=e218]
            - button "Reset Location Console" [ref=e222]
        - generic [ref=e227]:
          - generic:
            - generic [ref=e228]: LOCATION ENGINE READY
            - generic [ref=e234]:
              - button "MAP" [ref=e235]
              - button "SATELLITE" [ref=e236]
              - button "TERRAIN" [ref=e237]
              - button "EARTH" [ref=e238]
          - generic "Spatial Vector Map Stage" [ref=e240]
          - generic:
            - generic [ref=e241]:
              - generic [ref=e242]: 9.896500°, 8.858300°
              - generic [ref=e246]: 9° 53' 47.4" N | 8° 51' 29.9" E
            - button "Toggle Map Stage Size" [ref=e248]
        - tablist [ref=e255]:
          - tab "Real GPS Location" [selected] [ref=e256]
          - tab "Recovery Simulator" [ref=e259]
          - tab "Session Trail (0)" [ref=e261]
          - tab "Device Specs & Sensors" [ref=e263]
          - tab "IP vs GPS Location" [ref=e265]
        - generic [ref=e267]:
          - generic [ref=e268]:
            - generic [ref=e270]:
              - generic [ref=e271]:
                - generic [ref=e272]:
                  - heading "Browser GPS Geolocation Signal" [level=3] [ref=e277]
                  - generic [ref=e278]: Ready
                - generic [ref=e280]:
                  - heading "Real GPS Location Ready" [level=4] [ref=e284]
                  - paragraph [ref=e285]:
                    - text: Press
                    - strong [ref=e286]: LOCATE MY DEVICE
                    - text: to request browser location permission and resolve exact GPS coordinates.
                  - button "LOCATE MY DEVICE NOW" [ref=e288]
              - generic [ref=e289]: Navigator Geolocation API
            - generic [ref=e299]:
              - generic [ref=e300]:
                - generic [ref=e301]:
                  - heading "Spatial Location JSON Export" [level=3] [ref=e307]
                  - generic [ref=e308]: Client Local
                - generic [ref=e309]: "{ \"realLocation\": null, \"simulatedDevice\": null, \"sessionTrail\": [] }"
              - button "Copy" [ref=e313]
            - generic [ref=e318]:
              - heading "Mandatory Privacy & Non-Tracking Policy" [level=4] [ref=e319]
              - paragraph [ref=e323]:
                - strong [ref=e324]: "Zero Database Persistence:"
                - text: Snow never stores, logs, or transmits your GPS coordinates, IP address, or simulator inputs to any server. All calculations remain strictly in React state memory.
          - generic [ref=e325]:
            - generic [ref=e326]:
              - generic [ref=e327]:
                - generic [ref=e328]: SPATIAL ENGINE STANDBY
                - generic [ref=e330]: CLIENT-SIDE SECURE
              - generic "Interactive 3D Spatial Instrument - services" [ref=e333]
              - generic [ref=e334]:
                - paragraph [ref=e335]: Spatial Coordinate Pipeline
                - paragraph [ref=e336]: Combines W3C Geolocation API, spatial Three.js globe rendering, and deterministic local device recovery simulations.
              - generic [ref=e337]:
                - generic [ref=e338]:
                  - text: "SESSION FIXES:"
                  - strong [ref=e339]: 0 FIXES
                - generic [ref=e340]: ZERO TRANSMISSION
            - generic [ref=e342]:
              - heading "Console Status Summary" [level=4] [ref=e343]
              - generic [ref=e346]:
                - generic [ref=e347]:
                  - generic [ref=e348]: "GPS Engine:"
                  - generic [ref=e349]: READY
                - generic [ref=e350]:
                  - generic [ref=e351]: "Session Trail:"
                  - generic [ref=e352]: 0 Points
                - generic [ref=e353]:
                  - generic [ref=e354]: "Simulator Mode:"
                  - generic [ref=e355]: IDLE
                - generic [ref=e356]:
                  - generic [ref=e357]: "Database Storage:"
                  - generic [ref=e358]: Disabled / Local Only
        - generic [ref=e359]:
          - generic [ref=e360]:
            - generic [ref=e361]: Recommended Next Steps
            - generic [ref=e364]: DIAGNOSTIC HANDOFF
          - generic [ref=e365]:
            - 'heading "Recommended Solution: Spatial Web Application Engineering" [level=3] [ref=e366]'
            - paragraph [ref=e367]: Building high-performance spatial interfaces, real-time mapping applications, or custom WebGL components? Snow engineers high-precision web software.
          - generic [ref=e368]:
            - link "REQUEST SNOW CARE" [ref=e369] [cursor=pointer]:
              - /url: /request?service=snow-care&category=app-care&problem=Diagnostic%20result%3A%20Spatial%20Web%20Application%20Engineering%20findings%20requiring%20attention
            - link "Request Expert Service" [ref=e373] [cursor=pointer]:
              - /url: /request?service=app-care&problem=Diagnostic%20result%3A%20Spatial%20Web%20Application%20Engineering%20findings%20requiring%20attention
    - contentinfo [ref=e377]:
      - generic [ref=e380]:
        - generic [ref=e381]:
          - generic [ref=e382]: Connected Product Ecosystem
          - heading "Understand your system. Build with precision. Maintain with Care." [level=3] [ref=e383]
          - paragraph [ref=e384]: Whether you need a new web application, AI-powered automation, diagnostic checks, or long-term system Care, Snow provides end-to-end technical stewardship.
        - link "Request a Service ↗" [ref=e386] [cursor=pointer]:
          - /url: /request
      - generic [ref=e392]:
        - generic [ref=e393]:
          - generic [ref=e394]:
            - link "Snow Homepage" [ref=e395] [cursor=pointer]:
              - /url: /
              - generic [ref=e396]: SNOW
            - paragraph [ref=e402]: Snow is a modern technology studio engineering high-performance web applications, intelligent AI workflows, Care maintenance, and resilient digital infrastructure.
            - generic [ref=e403]:
              - paragraph [ref=e404]: "Location: Kwang, Jos, Plateau State, Nigeria"
              - paragraph [ref=e405]: "Email: dajinjihn@gmail.com"
              - paragraph [ref=e406]: "Phone: 07072299463"
          - generic [ref=e407]:
            - heading "Platform Ecosystem" [level=4] [ref=e408]
            - list [ref=e409]:
              - listitem [ref=e410]:
                - link "Services" [ref=e411] [cursor=pointer]:
                  - /url: /#services
              - listitem [ref=e412]:
                - link "Work Portfolio" [ref=e413] [cursor=pointer]:
                  - /url: /work
              - listitem [ref=e414]:
                - link "Snow Care" [ref=e415] [cursor=pointer]:
                  - /url: /care
              - listitem [ref=e416]:
                - link "Network Diagnostics" [ref=e417] [cursor=pointer]:
                  - /url: /network
              - listitem [ref=e418]:
                - link "Developer Tools" [ref=e419] [cursor=pointer]:
                  - /url: /tools
              - listitem [ref=e420]:
                - link "Editorial Insights" [ref=e421] [cursor=pointer]:
                  - /url: /insights
              - listitem [ref=e422]:
                - link "Request a Service" [ref=e423] [cursor=pointer]:
                  - /url: /request
          - generic [ref=e424]:
            - heading "Diagnostic Suite" [level=4] [ref=e425]
            - list [ref=e426]:
              - listitem [ref=e427]:
                - link "Network Diagnostics Hub" [ref=e428] [cursor=pointer]:
                  - /url: /network
              - listitem [ref=e429]:
                - link "DNS Lookup Utility" [ref=e430] [cursor=pointer]:
                  - /url: /network/dns
              - listitem [ref=e431]:
                - link "Public IP & Network Info" [ref=e432] [cursor=pointer]:
                  - /url: /network/ip
              - listitem [ref=e433]:
                - link "Device & Browser Diag" [ref=e434] [cursor=pointer]:
                  - /url: /network/device
              - listitem [ref=e435]:
                - link "Connection Speed Test" [ref=e436] [cursor=pointer]:
                  - /url: /network/speed
              - listitem [ref=e437]:
                - link "Website Health Check" [ref=e438] [cursor=pointer]:
                  - /url: /tools/website-health
          - generic [ref=e439]:
            - heading "Direct Contact" [level=4] [ref=e440]
            - paragraph [ref=e441]: Need emergency repair or a custom technology recommendation?
            - generic [ref=e442]:
              - link "✉ dajinjihn@gmail.com" [ref=e444] [cursor=pointer]:
                - /url: mailto:dajinjihn@gmail.com
              - link "💬 WhatsApp Us" [ref=e447] [cursor=pointer]:
                - /url: https://wa.me/2347072299463
        - generic [ref=e449]:
          - paragraph [ref=e450]: © 2026 SNOW Technology Studio. All rights reserved.
          - paragraph [ref=e451]: Based in Kwang, Jos, Plateau State, Nigeria.
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  |
  3  | test.describe("Snow Find My Device & Spatial Location Suite", () => {
  4  |   test("Location Console renders header, controls, and initial READY state", async ({ page }) => {
  5  |     await page.goto("/network/find");
  6  |     await expect(page.locator("h1")).toContainText("Find My Device & Spatial Location Center");
  7  |     await expect(page.getByText("Spatial Location Console")).toBeVisible();
  8  |     await expect(page.getByRole("button", { name: /LOCATE MY DEVICE/i })).toBeVisible();
  9  |     await expect(page.getByText("Location Engine Ready • Standby")).toBeVisible();
  10 |   });
  11 |
  12 |   test("Mode switching toggles MAP, SATELLITE, TERRAIN, and EARTH view", async ({ page }) => {
  13 |     await page.goto("/network/find");
  14 |     await page.getByRole("button", { name: "SATELLITE" }).click();
  15 |     await page.getByRole("button", { name: "TERRAIN" }).click();
  16 |     await page.getByRole("button", { name: "EARTH" }).click();
  17 |     await expect(page.getByText("SNOW SPATIAL EARTH GLOBE")).toBeVisible();
  18 |   });
  19 |
  20 |   test("Browser GPS Geolocation trigger resolves mock position", async ({ page, context }) => {
  21 |     await context.grantPermissions(["geolocation"]);
  22 |     await context.setGeolocation({ latitude: 9.8965, longitude: 8.8583, accuracy: 12 });
  23 |
  24 |     await page.goto("/network/find");
> 25 |     await page.getByRole("button", { name: /LOCATE MY DEVICE/i }).click();
     |                                                                   ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: /LOCATE MY DEVICE/i }) resolved to 2 elements:
  26 |
  27 |     await expect(page.getByText("9.896500°")).toBeVisible({ timeout: 10000 });
  28 |     await expect(page.getByText("8.858300°")).toBeVisible();
  29 |     await expect(page.getByText("LOCATED")).toBeVisible();
  30 |   });
  31 |
  32 |   test("Device Recovery Simulator executes with mandatory demo disclaimer", async ({ page }) => {
  33 |     await page.goto("/network/find");
  34 |     await page.getByText("Recovery Simulator").click();
  35 |
  36 |     await expect(page.getByText("SIMULATION / DEMO MODE — DOES NOT ACTUALLY TRACK DEVICES")).toBeVisible();
  37 |
  38 |     await page.fill("input[placeholder*='358249091234567']", "358249091234567");
  39 |     await page.getByRole("button", { name: /RUN RECOVERY SIMULATION/i }).click();
  40 |
  41 |     await expect(page.getByText("SIMULATED BEACON RESULT")).toBeVisible({ timeout: 10000 });
  42 |     await expect(page.getByRole("link", { name: /OPEN DEMO LOCATION/i })).toBeVisible();
  43 |   });
  44 |
  45 |   test("Session Trail updates and clear action works", async ({ page, context }) => {
  46 |     await context.grantPermissions(["geolocation"]);
  47 |     await context.setGeolocation({ latitude: 9.8965, longitude: 8.8583, accuracy: 15 });
  48 |
  49 |     await page.goto("/network/find");
  50 |     await page.getByRole("button", { name: /LOCATE MY DEVICE/i }).click();
  51 |
  52 |     await page.getByText("Session Trail (1)").click();
  53 |     await expect(page.getByText("Fix #1")).toBeVisible({ timeout: 10000 });
  54 |
  55 |     await page.getByRole("button", { name: /Clear Session/i }).click();
  56 |     await expect(page.getByText("No session trail points recorded yet.")).toBeVisible();
  57 |   });
  58 |
  59 |   test("Mobile Viewport 390x844 layout check", async ({ page }) => {
  60 |     await page.setViewportSize({ width: 390, height: 844 });
  61 |     await page.goto("/network/find");
  62 |     await expect(page.locator("h1")).toContainText("Find My Device & Spatial Location Center");
  63 |     await expect(page.getByRole("button", { name: /LOCATE MY DEVICE/i })).toBeVisible();
  64 |   });
  65 | });
  66 |
```