# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/e2e/findDevice.spec.ts >> Snow Find My Device & Spatial Location Suite >> Mobile Viewport 390x844 layout check
- Location: tests/e2e/findDevice.spec.ts:59:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /LOCATE MY DEVICE/i })
Expected: visible
Error: strict mode violation: getByRole('button', { name: /LOCATE MY DEVICE/i }) resolved to 2 elements:
    1) <button type="button" class="px-4 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-sky-950/50 flex items-center gap-2 disabled:opacity-40">…</button> aka getByRole('button', { name: 'LOCATE MY DEVICE', exact: true })
    2) <button type="button" class="px-5 py-2.5 rounded-xl bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-sky-950/50">LOCATE MY DEVICE NOW</button> aka getByRole('button', { name: 'LOCATE MY DEVICE NOW' })

Call log:
  - Expect "toBeVisible" getByRole('button', { name: /LOCATE MY DEVICE/i }) with timeout 5000ms
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
          - link "Start" [ref=e16] [cursor=pointer]:
            - /url: /request
          - button "Open menu" [ref=e17]
    - main [ref=e19]:
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]: NETWORK LAYER
          - generic [ref=e28]: Spatial / GPS
          - generic [ref=e31]: 100% Client-Side Isolation
          - generic [ref=e34]: Location Engine Ready • Standby
        - heading "Find My Device & Spatial Location Center" [level=1] [ref=e37]
        - paragraph [ref=e38]: Browser-native GPS geolocation, interactive spatial earth mapping, device recovery simulator, session location trail, and client-side device diagnostic instrumentation.
      - navigation "Snow Tool Command Navigation" [ref=e39]:
        - generic [ref=e40]:
          - generic [ref=e41]:
            - generic [ref=e42]:
              - generic [ref=e45]: SNOW_CONSOLE
              - generic [ref=e48]: Find Device
            - generic [ref=e49]:
              - button "All Instruments" [ref=e50]
              - button "Build" [ref=e51]
              - button "Encode" [ref=e52]
              - button "Design" [ref=e53]
              - button "Website Lab" [ref=e54]
              - button "Network" [ref=e55]
              - button "Diagnostics" [ref=e56]
          - generic [ref=e57]:
            - link "Overview" [ref=e58] [cursor=pointer]:
              - /url: /tools
            - link "Network Live" [ref=e59] [cursor=pointer]:
              - /url: /network
              - generic [ref=e65]: Network
              - generic [ref=e66]: Live
            - link "Find Device GPS" [ref=e67] [cursor=pointer]:
              - /url: /network/find
              - generic [ref=e70]: Find Device
              - generic [ref=e71]: GPS
            - link "DNS" [ref=e72] [cursor=pointer]:
              - /url: /network/dns
            - link "IP Info" [ref=e77] [cursor=pointer]:
              - /url: /network/ip
            - link "Device" [ref=e83] [cursor=pointer]:
              - /url: /network/device
            - link "Speed" [ref=e87] [cursor=pointer]:
              - /url: /network/speed
            - link "JSON Local" [ref=e92] [cursor=pointer]:
              - /url: /tools/json
              - generic [ref=e97]: JSON
              - generic [ref=e98]: Local
            - link "Markdown GFM" [ref=e99] [cursor=pointer]:
              - /url: /tools/markdown
              - generic [ref=e103]: Markdown
              - generic [ref=e104]: GFM
            - link "Regex" [ref=e105] [cursor=pointer]:
              - /url: /tools/regex
            - link "Encoder UTF-8" [ref=e110] [cursor=pointer]:
              - /url: /tools/encode
              - generic [ref=e116]: Encoder
              - generic [ref=e117]: UTF-8
            - link "UUID Crypto" [ref=e118] [cursor=pointer]:
              - /url: /tools/uuid
              - generic [ref=e122]: UUID
              - generic [ref=e123]: Crypto
            - link "Hash Subtle" [ref=e124] [cursor=pointer]:
              - /url: /tools/hash
              - generic [ref=e128]: Hash
              - generic [ref=e129]: Subtle
            - link "Color WCAG" [ref=e130] [cursor=pointer]:
              - /url: /tools/color
              - generic [ref=e137]: Color
              - generic [ref=e138]: WCAG
            - link "QR Code" [ref=e139] [cursor=pointer]:
              - /url: /tools/qr
            - link "Screenshot Cloudflare" [ref=e147] [cursor=pointer]:
              - /url: /tools/website/screenshot
              - generic [ref=e151]: Screenshot
              - generic [ref=e152]: Cloudflare
            - link "PDF Export Cloudflare" [ref=e153] [cursor=pointer]:
              - /url: /tools/website/pdf
              - generic [ref=e157]: PDF Export
              - generic [ref=e158]: Cloudflare
            - link "Inspect Cloudflare" [ref=e159] [cursor=pointer]:
              - /url: /tools/website/inspect
              - generic [ref=e165]: Inspect
              - generic [ref=e166]: Cloudflare
            - link "Health Soon" [ref=e167] [cursor=pointer]:
              - /url: /tools/website-health
              - generic [ref=e170]: Health
              - generic [ref=e171]: Soon
            - link "Speed Soon" [ref=e172] [cursor=pointer]:
              - /url: /tools/speed
              - generic [ref=e176]: Speed
              - generic [ref=e177]: Soon
            - link "SEO Soon" [ref=e178] [cursor=pointer]:
              - /url: /tools/seo
              - generic [ref=e183]: SEO
              - generic [ref=e184]: Soon
            - link "Security Soon" [ref=e185] [cursor=pointer]:
              - /url: /tools/security
              - generic [ref=e188]: Security
              - generic [ref=e189]: Soon
            - link "AI Audit Soon" [ref=e190] [cursor=pointer]:
              - /url: /tools/ai-readiness
              - generic [ref=e194]: AI Audit
              - generic [ref=e195]: Soon
      - generic [ref=e196]:
        - generic [ref=e199]:
          - generic [ref=e204]:
            - generic [ref=e205]:
              - heading "Spatial Location Console" [level=3] [ref=e206]
              - generic [ref=e207]: READY
            - paragraph [ref=e208]: 100% Client-Side • Zero Database Retention
          - generic [ref=e209]:
            - button "LOCATE MY DEVICE" [ref=e210]
            - button "Reset Location Console" [ref=e214]
        - generic [ref=e219]:
          - generic:
            - generic [ref=e220]: LOCATION ENGINE READY
            - generic [ref=e226]:
              - button "MAP" [ref=e227]
              - button "SATELLITE" [ref=e228]
              - button "TERRAIN" [ref=e229]
              - button "EARTH" [ref=e230]
          - generic "Spatial Vector Map Stage" [ref=e232]
          - generic:
            - generic [ref=e233]:
              - generic [ref=e234]: 9.896500°, 8.858300°
              - generic [ref=e238]: 9° 53' 47.4" N | 8° 51' 29.9" E
            - button "Toggle Map Stage Size" [ref=e240]
        - tablist [ref=e247]:
          - tab "Real GPS Location" [selected] [ref=e248]
          - tab "Recovery Simulator" [ref=e251]
          - tab "Session Trail (0)" [ref=e253]
          - tab "Device Specs & Sensors" [ref=e255]
          - tab "IP vs GPS Location" [ref=e257]
        - generic [ref=e259]:
          - generic [ref=e260]:
            - generic [ref=e262]:
              - generic [ref=e263]:
                - generic [ref=e264]:
                  - heading "Browser GPS Geolocation Signal" [level=3] [ref=e269]
                  - generic [ref=e270]: Ready
                - generic [ref=e272]:
                  - heading "Real GPS Location Ready" [level=4] [ref=e276]
                  - paragraph [ref=e277]:
                    - text: Press
                    - strong [ref=e278]: LOCATE MY DEVICE
                    - text: to request browser location permission and resolve exact GPS coordinates.
                  - button "LOCATE MY DEVICE NOW" [ref=e280]
              - generic [ref=e281]: Navigator Geolocation API
            - generic [ref=e291]:
              - generic [ref=e292]:
                - generic [ref=e293]:
                  - heading "Spatial Location JSON Export" [level=3] [ref=e299]
                  - generic [ref=e300]: Client Local
                - generic [ref=e301]: "{ \"realLocation\": null, \"simulatedDevice\": null, \"sessionTrail\": [] }"
              - button "Copy" [ref=e305]
            - generic [ref=e310]:
              - heading "Mandatory Privacy & Non-Tracking Policy" [level=4] [ref=e311]
              - paragraph [ref=e315]:
                - strong [ref=e316]: "Zero Database Persistence:"
                - text: Snow never stores, logs, or transmits your GPS coordinates, IP address, or simulator inputs to any server. All calculations remain strictly in React state memory.
          - generic [ref=e317]:
            - generic [ref=e318]:
              - generic [ref=e319]:
                - generic [ref=e320]: SPATIAL ENGINE STANDBY
                - generic [ref=e322]: CLIENT-SIDE SECURE
              - generic "Interactive 3D Spatial Instrument - services" [ref=e325]
              - generic [ref=e326]:
                - paragraph [ref=e327]: Spatial Coordinate Pipeline
                - paragraph [ref=e328]: Combines W3C Geolocation API, spatial Three.js globe rendering, and deterministic local device recovery simulations.
              - generic [ref=e329]:
                - generic [ref=e330]:
                  - text: "SESSION FIXES:"
                  - strong [ref=e331]: 0 FIXES
                - generic [ref=e332]: ZERO TRANSMISSION
            - generic [ref=e334]:
              - heading "Console Status Summary" [level=4] [ref=e335]
              - generic [ref=e338]:
                - generic [ref=e339]:
                  - generic [ref=e340]: "GPS Engine:"
                  - generic [ref=e341]: READY
                - generic [ref=e342]:
                  - generic [ref=e343]: "Session Trail:"
                  - generic [ref=e344]: 0 Points
                - generic [ref=e345]:
                  - generic [ref=e346]: "Simulator Mode:"
                  - generic [ref=e347]: IDLE
                - generic [ref=e348]:
                  - generic [ref=e349]: "Database Storage:"
                  - generic [ref=e350]: Disabled / Local Only
        - generic [ref=e351]:
          - generic [ref=e352]:
            - generic [ref=e353]: Recommended Next Steps
            - generic [ref=e356]: DIAGNOSTIC HANDOFF
          - generic [ref=e357]:
            - 'heading "Recommended Solution: Spatial Web Application Engineering" [level=3] [ref=e358]'
            - paragraph [ref=e359]: Building high-performance spatial interfaces, real-time mapping applications, or custom WebGL components? Snow engineers high-precision web software.
          - generic [ref=e360]:
            - link "REQUEST SNOW CARE" [ref=e361] [cursor=pointer]:
              - /url: /request?service=snow-care&category=app-care&problem=Diagnostic%20result%3A%20Spatial%20Web%20Application%20Engineering%20findings%20requiring%20attention
            - link "Request Expert Service" [ref=e365] [cursor=pointer]:
              - /url: /request?service=app-care&problem=Diagnostic%20result%3A%20Spatial%20Web%20Application%20Engineering%20findings%20requiring%20attention
    - contentinfo [ref=e369]:
      - generic [ref=e372]:
        - generic [ref=e373]:
          - generic [ref=e374]: Connected Product Ecosystem
          - heading "Understand your system. Build with precision. Maintain with Care." [level=3] [ref=e375]
          - paragraph [ref=e376]: Whether you need a new web application, AI-powered automation, diagnostic checks, or long-term system Care, Snow provides end-to-end technical stewardship.
        - link "Request a Service ↗" [ref=e378] [cursor=pointer]:
          - /url: /request
      - generic [ref=e384]:
        - generic [ref=e385]:
          - generic [ref=e386]:
            - link "Snow Homepage" [ref=e387] [cursor=pointer]:
              - /url: /
              - generic [ref=e388]: SNOW
            - paragraph [ref=e394]: Snow is a modern technology studio engineering high-performance web applications, intelligent AI workflows, Care maintenance, and resilient digital infrastructure.
            - generic [ref=e395]:
              - paragraph [ref=e396]: "Location: Kwang, Jos, Plateau State, Nigeria"
              - paragraph [ref=e397]: "Email: dajinjihn@gmail.com"
              - paragraph [ref=e398]: "Phone: 07072299463"
          - generic [ref=e399]:
            - heading "Platform Ecosystem" [level=4] [ref=e400]
            - list [ref=e401]:
              - listitem [ref=e402]:
                - link "Services" [ref=e403] [cursor=pointer]:
                  - /url: /#services
              - listitem [ref=e404]:
                - link "Work Portfolio" [ref=e405] [cursor=pointer]:
                  - /url: /work
              - listitem [ref=e406]:
                - link "Snow Care" [ref=e407] [cursor=pointer]:
                  - /url: /care
              - listitem [ref=e408]:
                - link "Network Diagnostics" [ref=e409] [cursor=pointer]:
                  - /url: /network
              - listitem [ref=e410]:
                - link "Developer Tools" [ref=e411] [cursor=pointer]:
                  - /url: /tools
              - listitem [ref=e412]:
                - link "Editorial Insights" [ref=e413] [cursor=pointer]:
                  - /url: /insights
              - listitem [ref=e414]:
                - link "Request a Service" [ref=e415] [cursor=pointer]:
                  - /url: /request
          - generic [ref=e416]:
            - heading "Diagnostic Suite" [level=4] [ref=e417]
            - list [ref=e418]:
              - listitem [ref=e419]:
                - link "Network Diagnostics Hub" [ref=e420] [cursor=pointer]:
                  - /url: /network
              - listitem [ref=e421]:
                - link "DNS Lookup Utility" [ref=e422] [cursor=pointer]:
                  - /url: /network/dns
              - listitem [ref=e423]:
                - link "Public IP & Network Info" [ref=e424] [cursor=pointer]:
                  - /url: /network/ip
              - listitem [ref=e425]:
                - link "Device & Browser Diag" [ref=e426] [cursor=pointer]:
                  - /url: /network/device
              - listitem [ref=e427]:
                - link "Connection Speed Test" [ref=e428] [cursor=pointer]:
                  - /url: /network/speed
              - listitem [ref=e429]:
                - link "Website Health Check" [ref=e430] [cursor=pointer]:
                  - /url: /tools/website-health
          - generic [ref=e431]:
            - heading "Direct Contact" [level=4] [ref=e432]
            - paragraph [ref=e433]: Need emergency repair or a custom technology recommendation?
            - generic [ref=e434]:
              - link "✉ dajinjihn@gmail.com" [ref=e436] [cursor=pointer]:
                - /url: mailto:dajinjihn@gmail.com
              - link "💬 WhatsApp Us" [ref=e439] [cursor=pointer]:
                - /url: https://wa.me/2347072299463
        - generic [ref=e441]:
          - paragraph [ref=e442]: © 2026 SNOW Technology Studio. All rights reserved.
          - paragraph [ref=e443]: Based in Kwang, Jos, Plateau State, Nigeria.
  - alert [ref=e444]
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
  25 |     await page.getByRole("button", { name: /LOCATE MY DEVICE/i }).click();
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
> 63 |     await expect(page.getByRole("button", { name: /LOCATE MY DEVICE/i })).toBeVisible();
     |                                                                           ^ Error: expect(locator).toBeVisible() failed
  64 |   });
  65 | });
  66 |
```