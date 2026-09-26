import os
import math
from PIL import Image, ImageDraw, ImageFont

FONT_DIR = "/usr/share/fonts/truetype/dejavu"
FONT_SANS = os.path.join(FONT_DIR, "DejaVuSans.ttf")
FONT_SANS_BOLD = os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf")
FONT_MONO = os.path.join(FONT_DIR, "DejaVuSansMono.ttf")
FONT_MONO_BOLD = os.path.join(FONT_DIR, "DejaVuSansMono-Bold.ttf")

def get_font(font_path, size):
    try:
        return ImageFont.truetype(font_path, size)
    except Exception:
        return ImageFont.load_default()

PROJECTS = [
    {
        "slug": "aurora-commerce",
        "title": "AURORA COMMERCE",
        "category": "E-commerce Storefront",
        "bg_color": (248, 246, 240), # Clean warm editorial cream
        "header_bg": (23, 23, 23),
        "card_bg": (255, 255, 255),
        "card_border": (220, 215, 200),
        "accent": (217, 119, 6), # Gold/Amber accent
        "primary_text": (28, 25, 23),
        "secondary_text": (120, 113, 108),
        "style_name": "Bright Luxury Editorial",
        "badge_bg": (254, 243, 199),
        "badge_text": (180, 83, 9)
    },
    {
        "slug": "pulse-health",
        "title": "PULSE HEALTH",
        "category": "Service & Health Portal",
        "bg_color": (240, 249, 250), # Crisp clinical light cyan
        "header_bg": (15, 23, 42),
        "card_bg": (255, 255, 255),
        "card_border": (207, 238, 244),
        "accent": (14, 165, 233), # Sky Blue / Emerald
        "primary_text": (15, 23, 42),
        "secondary_text": (100, 116, 139),
        "style_name": "Calm Clean Healthcare UI",
        "badge_bg": (224, 242, 254),
        "badge_text": (3, 105, 161)
    },
    {
        "slug": "orbit-finance",
        "title": "ORBIT FINANCE",
        "category": "Financial Dashboard",
        "bg_color": (10, 15, 30), # Deep navy cyber dark
        "header_bg": (15, 23, 42),
        "card_bg": (20, 30, 55),
        "card_border": (30, 50, 90),
        "accent": (56, 189, 248), # Neon Cyan
        "primary_text": (241, 245, 249),
        "secondary_text": (148, 163, 184),
        "style_name": "Dark Cyber Telemetry",
        "badge_bg": (12, 74, 110),
        "badge_text": (125, 211, 252)
    },
    {
        "slug": "nova-ai-assistant",
        "title": "NOVA AI ASSISTANT",
        "category": "AI Operational Workspace",
        "bg_color": (15, 12, 28), # Soft dark violet glass
        "header_bg": (24, 19, 43),
        "card_bg": (30, 25, 55),
        "card_border": (60, 50, 100),
        "accent": (168, 85, 247), # Purple / Violet glow
        "primary_text": (243, 232, 255),
        "secondary_text": (168, 162, 195),
        "style_name": "Futuristic Glass AI",
        "badge_bg": (88, 28, 135),
        "badge_text": (232, 121, 249)
    },
    {
        "slug": "atlas-business-portal",
        "title": "ATLAS ENTERPRISE",
        "category": "Business Portal",
        "bg_color": (241, 245, 249), # Clean corporate monochrome
        "header_bg": (15, 23, 42),
        "card_bg": (255, 255, 255),
        "card_border": (226, 232, 240),
        "accent": (37, 99, 235), # Deep Cobalt Blue
        "primary_text": (15, 23, 42),
        "secondary_text": (100, 116, 139),
        "style_name": "Minimal Corporate Architecture",
        "badge_bg": (219, 234, 254),
        "badge_text": (29, 78, 216)
    },
    {
        "slug": "studio-landing",
        "title": "STUDIO ARCHITECTURE",
        "category": "Warm Studio Landing",
        "bg_color": (28, 25, 23), # Obsidian / Obsidian stone
        "header_bg": (41, 37, 36),
        "card_bg": (44, 40, 37),
        "card_border": (78, 71, 65),
        "accent": (249, 115, 22), # Terracotta / Warm Sand
        "primary_text": (250, 250, 249),
        "secondary_text": (168, 162, 158),
        "style_name": "Warm Architectural Sand",
        "badge_bg": (124, 45, 18),
        "badge_text": (253, 186, 116)
    },
    {
        "slug": "local-services-platform",
        "title": "LOCAL SERVICES",
        "category": "Marketplace Directory",
        "bg_color": (245, 247, 250), # Soft colorful modern
        "header_bg": (15, 23, 42),
        "card_bg": (255, 255, 255),
        "card_border": (226, 232, 240),
        "accent": (20, 184, 166), # Teal & Coral
        "primary_text": (15, 23, 42),
        "secondary_text": (100, 116, 139),
        "style_name": "Vibrant Modern Marketplace",
        "badge_bg": (204, 251, 241),
        "badge_text": (15, 118, 110)
    },
    {
        "slug": "secure-account-recovery",
        "title": "SECURE RECOVERY",
        "category": "Auth & Identity System",
        "bg_color": (6, 20, 15), # Dark matrix green / terminal cipher
        "header_bg": (10, 30, 22),
        "card_bg": (12, 38, 28),
        "card_border": (20, 75, 52),
        "accent": (34, 197, 94), # High-contrast Emerald / Terminal
        "primary_text": (240, 253, 244),
        "secondary_text": (134, 239, 172),
        "style_name": "Cryptographic Technical UI",
        "badge_bg": (20, 83, 45),
        "badge_text": (134, 239, 172)
    }
]

def draw_header(draw, width, p_cfg, title_suffix=""):
    draw.rectangle([0, 0, width, 50], fill=p_cfg["header_bg"])
    draw.ellipse([20, 18, 32, 30], fill=(239, 68, 68))
    draw.ellipse([38, 18, 50, 30], fill=(245, 158, 11))
    draw.ellipse([56, 18, 68, 30], fill=(34, 197, 94))

    draw.rectangle([100, 10, width - 250, 40], fill=(0, 0, 0, 40), outline=(255, 255, 255, 30))
    font_mono_sm = get_font(FONT_MONO, 12)
    url_text = f"https://snow.dev/projects/{p_cfg['slug']}{title_suffix}"
    draw.text((115, 17), url_text, fill=(203, 213, 225), font=font_mono_sm)

    font_sans_sm = get_font(FONT_SANS_BOLD, 11)
    draw.text((width - 230, 17), f"SNOW.SYS // {p_cfg['category'].upper()}", fill=p_cfg["accent"], font=font_sans_sm)

def generate_hero(p_cfg):
    width, height = 1600, 1000
    img = Image.new("RGB", (width, height), p_cfg["bg_color"])
    draw = ImageDraw.Draw(img)

    draw_header(draw, width, p_cfg, " #hero")

    font_title = get_font(FONT_SANS_BOLD, 48)
    font_sub = get_font(FONT_SANS, 20)
    font_mono = get_font(FONT_MONO_BOLD, 14)
    font_sans_sm = get_font(FONT_SANS, 14)

    draw.rectangle([80, 90, 320, 125], fill=p_cfg["badge_bg"])
    draw.text((95, 98), f"SYSTEM RECORD • {p_cfg['slug']}", fill=p_cfg["badge_text"], font=font_mono)

    draw.text((80, 145), p_cfg["title"], fill=p_cfg["primary_text"], font=font_title)
    draw.text((80, 210), f"Architecture: {p_cfg['style_name']} | Sub-100ms Latency Engine", fill=p_cfg["secondary_text"], font=font_sub)

    draw.rectangle([80, 270, 1020, 910], fill=p_cfg["card_bg"], outline=p_cfg["card_border"], width=2)
    draw.rectangle([80, 270, 1020, 320], fill=p_cfg["header_bg"])
    draw.text((100, 288), "MAIN INTERFACE CANVAS // HIGH-PERFORMANCE PREVIEW", fill=(203, 213, 225), font=font_mono)

    if "FINANCE" in p_cfg["title"] or "RECOVERY" in p_cfg["title"] or "AI" in p_cfg["title"]:
        points = []
        for x in range(120, 980, 40):
            y = 600 - int(math.sin(x * 0.01) * 120 + math.cos(x * 0.02) * 60)
            points.append((x, y))
        for i in range(len(points) - 1):
            draw.line([points[i], points[i+1]], fill=p_cfg["accent"], width=4)
            draw.ellipse([points[i][0]-5, points[i][1]-5, points[i][0]+5, points[i][1]+5], fill=p_cfg["accent"])
        for y_g in range(360, 850, 80):
            draw.line([(100, y_g), (1000, y_g)], fill=p_cfg["card_border"], width=1)
    else:
        for row in range(2):
            for col in range(3):
                cx1 = 110 + col * 290
                cy1 = 350 + row * 260
                cx2 = cx1 + 270
                cy2 = cy1 + 230
                draw.rectangle([cx1, cy1, cx2, cy2], fill=p_cfg["bg_color"], outline=p_cfg["card_border"], width=1)
                draw.rectangle([cx1 + 15, cy1 + 15, cx2 - 15, cy1 + 120], fill=p_cfg["header_bg"])
                draw.text((cx1 + 20, cy1 + 135), f"Module #{row*3+col+1}", fill=p_cfg["primary_text"], font=font_sans_sm)
                draw.rectangle([cx1 + 20, cy1 + 165, cx2 - 20, cy1 + 185], fill=p_cfg["accent"])

    draw.rectangle([1060, 270, 1520, 910], fill=p_cfg["card_bg"], outline=p_cfg["card_border"], width=2)
    draw.rectangle([1060, 270, 1520, 320], fill=p_cfg["header_bg"])
    draw.text((1080, 288), "TELEMETRY & SPECIFICATION", fill=(203, 213, 225), font=font_mono)

    metrics = [
        ("RESPONSE TIME", "< 45 ms"),
        ("LIGHTHOUSE SCORE", "100 / 100"),
        ("DATA REFRESH", "Real-time SSE"),
        ("CACHE LATENCY", "Sub-10ms Edge"),
        ("SECURITY MODEL", "RLS + HMAC"),
        ("DEPLOYMENT", "Production Vercel")
    ]
    for idx, (label, val) in enumerate(metrics):
        my = 350 + idx * 85
        draw.rectangle([1080, my, 1500, my + 70], fill=p_cfg["bg_color"], outline=p_cfg["card_border"])
        draw.text((1095, my + 12), label, fill=p_cfg["secondary_text"], font=font_mono)
        draw.text((1095, my + 38), val, fill=p_cfg["accent"], font=get_font(FONT_SANS_BOLD, 18))

    out_dir = f"public/assets/portfolio/{p_cfg['slug']}"
    os.makedirs(out_dir, exist_ok=True)
    img.save(os.path.join(out_dir, "hero.webp"), "WEBP", quality=92)

def generate_desktop(p_cfg):
    width, height = 1600, 1000
    img = Image.new("RGB", (width, height), p_cfg["bg_color"])
    draw = ImageDraw.Draw(img)

    draw_header(draw, width, p_cfg, " #desktop-view")

    font_mono = get_font(FONT_MONO_BOLD, 14)
    font_sm = get_font(FONT_SANS, 14)

    draw.rectangle([0, 50, 260, 1000], fill=p_cfg["header_bg"], outline=p_cfg["card_border"])
    draw.text((30, 80), f"SNOW.NAV", fill=p_cfg["accent"], font=font_mono)
    nav_items = ["01. Overview", "02. Analytics", "03. Workflows", "04. Integrations", "05. Audit Log", "06. Settings"]
    for i, item in enumerate(nav_items):
        y = 140 + i * 50
        if i == 0:
            draw.rectangle([15, y - 8, 245, y + 28], fill=p_cfg["accent"])
            draw.text((30, y), item, fill=(255, 255, 255), font=font_sm)
        else:
            draw.text((30, y), item, fill=(148, 163, 184), font=font_sm)

    for i in range(4):
        x1 = 290 + i * 320
        x2 = x1 + 300
        draw.rectangle([x1, 80, x2, 200], fill=p_cfg["card_bg"], outline=p_cfg["card_border"], width=1)
        draw.text((x1 + 20, 100), f"KPI MATRIX 0{i+1}", fill=p_cfg["secondary_text"], font=font_mono)
        draw.text((x1 + 20, 135), f"${(i+1)*124},500", fill=p_cfg["primary_text"], font=get_font(FONT_SANS_BOLD, 26))
        draw.text((x1 + 20, 172), "↑ +18.4% vs last cycle", fill=p_cfg["accent"], font=font_sm)

    draw.rectangle([290, 230, 1570, 950], fill=p_cfg["card_bg"], outline=p_cfg["card_border"], width=2)
    draw.rectangle([290, 230, 1570, 280], fill=p_cfg["header_bg"])
    draw.text((310, 250), "DETAILED SYSTEM RECORDS & DYNAMIC FEED", fill=(203, 213, 225), font=font_mono)

    headers = ["ID", "TIMESTAMP", "ENTITY / COMPONENT", "STATUS", "LATENCY", "ACTION"]
    h_x = [310, 420, 680, 1050, 1250, 1420]
    for idx, h in enumerate(headers):
        draw.text((h_x[idx], 300), h, fill=p_cfg["secondary_text"], font=font_mono)
    draw.line([(290, 325), (1570, 325)], fill=p_cfg["card_border"], width=1)

    for r in range(10):
        y = 345 + r * 58
        draw.text((h_x[0], y), f"REF-0{r+101}", fill=p_cfg["primary_text"], font=font_mono)
        draw.text((h_x[1], y), f"2026-03-26 11:{r*5+10:02d}:00", fill=p_cfg["secondary_text"], font=font_sm)
        draw.text((h_x[2], y), f"{p_cfg['title']} Module Component {r+1}", fill=p_cfg["primary_text"], font=font_sm)
        draw.rectangle([h_x[3], y - 4, h_x[3] + 110, y + 22], fill=p_cfg["badge_bg"])
        draw.text((h_x[3] + 10, y), "VERIFIED", fill=p_cfg["badge_text"], font=font_mono)
        draw.text((h_x[4], y), f"{12 + r * 2} ms", fill=p_cfg["accent"], font=font_mono)
        draw.rectangle([h_x[5], y - 4, h_x[5] + 80, y + 22], fill=p_cfg["accent"])
        draw.text((h_x[5] + 15, y), "Inspect", fill=(255, 255, 255), font=font_mono)
        draw.line([(290, y + 36), (1570, y + 36)], fill=p_cfg["card_border"], width=1)

    out_dir = f"public/assets/portfolio/{p_cfg['slug']}"
    img.save(os.path.join(out_dir, "desktop.webp"), "WEBP", quality=92)

def generate_mobile(p_cfg):
    width, height = 900, 1600
    img = Image.new("RGB", (width, height), p_cfg["bg_color"])
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, width, 80], fill=p_cfg["header_bg"])
    font_mono = get_font(FONT_MONO_BOLD, 16)
    font_title = get_font(FONT_SANS_BOLD, 32)
    font_sub = get_font(FONT_SANS, 18)
    font_sm = get_font(FONT_SANS, 16)

    draw.text((40, 28), "9:41", fill=(255, 255, 255), font=font_mono)
    draw.text((width - 220, 28), "SNOW.MOBILE", fill=p_cfg["accent"], font=font_mono)

    draw.rectangle([40, 110, width - 40, 260], fill=p_cfg["card_bg"], outline=p_cfg["card_border"], width=2)
    draw.text((70, 135), p_cfg["title"], fill=p_cfg["primary_text"], font=font_title)
    draw.text((70, 190), f"Mobile Responsive Layout • {p_cfg['category']}", fill=p_cfg["secondary_text"], font=font_sub)

    for i in range(4):
        y1 = 290 + i * 280
        y2 = y1 + 250
        draw.rectangle([40, y1, width - 40, y2], fill=p_cfg["card_bg"], outline=p_cfg["card_border"], width=2)
        draw.rectangle([40, y1, width - 40, y1 + 50], fill=p_cfg["header_bg"])
        draw.text((70, y1 + 15), f"MOBILE FEED ITEM #{i+1}", fill=(203, 213, 225), font=font_mono)

        draw.text((70, y1 + 75), f"Responsive System Action {i+1}", fill=p_cfg["primary_text"], font=get_font(FONT_SANS_BOLD, 22))
        draw.text((70, y1 + 115), "Optimized for touch interaction and low latency.", fill=p_cfg["secondary_text"], font=font_sm)

        draw.rectangle([70, y1 + 170, width - 70, y1 + 220], fill=p_cfg["accent"])
        draw.text((width // 2 - 100, y1 + 185), "Execute Mobile Action", fill=(255, 255, 255), font=get_font(FONT_SANS_BOLD, 16))

    draw.rectangle([0, height - 120, width, height], fill=p_cfg["header_bg"], outline=p_cfg["card_border"])
    tabs = ["Home", "Search", "Activity", "Profile"]
    for idx, tab in enumerate(tabs):
        tx = 60 + idx * 210
        if idx == 0:
            draw.rectangle([tx, height - 100, tx + 160, height - 30], fill=p_cfg["accent"])
            draw.text((tx + 40, height - 72), tab, fill=(255, 255, 255), font=get_font(FONT_SANS_BOLD, 18))
        else:
            draw.text((tx + 30, height - 72), tab, fill=(148, 163, 184), font=get_font(FONT_SANS, 18))

    out_dir = f"public/assets/portfolio/{p_cfg['slug']}"
    img.save(os.path.join(out_dir, "mobile.webp"), "WEBP", quality=92)

print("Generating 24 WebP portfolio media assets across 8 projects...")
for proj in PROJECTS:
    print(f"  -> Generating assets for {proj['slug']} ({proj['style_name']})...")
    generate_hero(proj)
    generate_desktop(proj)
    generate_mobile(proj)

print("Done generating 24 portfolio media WebP assets!")
