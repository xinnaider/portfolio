# Manga Panels Theme — Dual Theme Portfolio

**Date:** 2026-03-31
**Status:** Approved
**Branch:** `feature/manga-theme`

## Summary

Add a second theme ("Manga Panels") to the existing portfolio, alongside the current violet theme. Users can switch between themes via a NavBar toggle or a floating manga panel easter egg. The transition uses a "Panel Shatter" animation where the page breaks into manga panels that fly apart and recompose in the new theme.

## Design Decisions

### Approach: Manga Panels (chosen over Editorial Manga and Dynamic Split)

- Sections displayed as manga panels with strong 2-3px borders
- Asymmetric grid layout (2fr/1fr)
- Black (#000) gutters between panels (4px gaps)
- Alternating dark/light panel backgrounds
- Sharp corners (border-radius: 0px)
- Halftone dots, speed lines, kanji watermarks, and onomatopoeia as decorative elements

### Style Direction

- **Neo-manga corporate**: Manga references in layout and details, clean professional structure
- **High contrast split**: Sections alternate between dark (#0a0a0a, #111) and light (#fff, #e5e5e5) panels
- **Display expressive typography**: Dela Gothic One for headings (manga lettering feel), Space Grotesk for body (already in use)
- **Bold decorative elements**: Panels, halftone, speed lines, onomatopoeia clearly visible

## Color Palette (Manga Theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--manga-black` | `#000000` | Borders, primary text, gutters |
| `--manga-surface-dark` | `#0a0a0a` | Dark panel backgrounds |
| `--manga-panel-dark` | `#111111` | Alternate dark panels |
| `--manga-gutter` | `#1a1a1a` | Panel gutter space |
| `--manga-border` | `#333333` | Secondary borders |
| `--manga-text-muted` | `#666666` | Secondary text |
| `--manga-paper` | `#e5e5e5` | Light panel backgrounds |
| `--manga-white` | `#ffffff` | Light panels, contrast text, accent |

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Hero title | Dela Gothic One | 400 | 48px |
| Section title | Dela Gothic One | 400 | 32px |
| Card heading | Space Grotesk | 700 | 20px |
| Body | Space Grotesk | 400 | 16px |
| Label/tag | Space Grotesk | 600 | 12px, uppercase, letter-spacing: 2px |

Dela Gothic One is loaded via Google Fonts. Single weight (400) — the font itself is heavy/display by nature.

## Manga Decorative Elements

### Halftone Dots
- CSS `radial-gradient(circle, color 1.5px, transparent 1.5px)` with `background-size: 8px 8px`
- Positioned in corners of panels
- Opacity: 5-15% (dark panels use white dots, light panels use black dots)

### Speed Lines
- CSS pseudo-elements or divs with thin backgrounds
- Rotated slightly (-5deg to -20deg range), varying widths
- Opacity: 3-8%, positioned in backgrounds
- Hero and Contact sections use these prominently

### Kanji Watermarks
- Decorative Japanese characters at ultra-low opacity (3-5%)
- 開発者 (developer) in Hero, 力 (power) in About, 技術 (technology) in Tech Stack
- `writing-mode: vertical-rl` for vertical placement

### Onomatopoeia
- バン! (bang), ドドド (menace), ドン (boom)
- Very low opacity (3-6%), rotated slightly
- Contact section and easter egg panel

## Section Designs

### NavBar
- Logo "JF" in a bordered box + kanji ポートフォリオ (portfolio) subtitle
- Links: uppercase, letter-spacing 2px, active state = white underline 2px
- Theme toggle pill added (violet icon ✦ vs kanji 墨)
- Language toggle and CV button with bordered style
- Scroll progress bar: solid #fff (instead of violet gradient)
- Mobile: hamburger with thick lines, fullscreen panel-style menu

### Hero Section
- Full-width dark panel with 2px border
- Speed lines in background (right side, parallax on mouse move)
- Kanji 開発者 vertical watermark (opacity 3%)
- Halftone dots in bottom-left corner
- Name in Dela Gothic One ultra-bold with typing effect (cursor = 3px white bar)
- CTAs: bordered buttons (solid white border primary, gray border secondary)
- Scroll indicator: vertical "SCROLL" text + line

### About Section
- Asymmetric grid: 2fr (light panel, text) / 1fr (dark panel, stats)
- Light panel: white background, black text, highlights as sub-panels in 2-column grid
- Dark panel: animated counters (3+ years, 4 companies, 2 languages), kanji 力 watermark
- Halftone in corner of light panel (black dots, low opacity)
- Mobile: stacks vertically, about first then stats

### Experience Section
- Full-width dark panel
- Timeline as panel sequence: date column (80px) | white vertical gutter (3px) | content panel
- Each job is a bordered sub-panel with tech tags as bordered badges
- Current position has brighter border (#fff vs #333)
- Promotions indicated with badge in panel corner
- Halftone in bottom-right corner

### Tech Stack Section
- Grid 1fr/1fr: title panel (left) / 4 mini-panels in 2x2 grid (right)
- Mini-panels alternate dark/light (checkerboard pattern)
- Each category has bold label with underline, tech items listed
- Marquee scroll maintained inside each panel
- Kanji 技術 watermark in title panel
- Mobile: title full-width, categories in 2-column grid below

### Education Section
- Light panel (contrast with dark Experience above)
- Entries as bordered sub-panels
- Badge type (GRAD/CERT) in manga tag style (solid black bg or bordered)
- Halftone decorative in corner (black dots on white)

### Contact Section
- Full-width dark panel with white border (prominent final panel)
- Speed lines radiating from center
- Onomatopoeia バン! and ドン decorative
- Centered text: "LET'S WORK TOGETHER" in Dela Gothic One
- CTA buttons: white bordered primary, gray bordered secondary
- Animation: speed lines expand on scroll reveal, text scale reveal

## Theme Switching

### Architecture

```
composables/
  useTheme.ts              — Reactive state, toggle fn, localStorage sync
  useThemeTransition.ts    — Panel shatter animation logic

components/
  ThemeToggle.vue          — Toggle pill for NavBar
  FloatingPanel.vue        — Easter egg floating panel
  PanelShatter.vue         — Fullscreen transition overlay
  MangaDecorations.vue     — Shared halftone, speed lines, kanji components

assets/css/
  main.css                 — Base variables (violet = default)
  manga-theme.css          — [data-theme="manga"] variable overrides + manga styles
  panel-shatter.css        — Transition animation keyframes
```

### CSS Strategy

Theme applied via `data-theme="manga"` attribute on `<html>`. CSS custom properties switch via this selector:

```css
:root {
  --accent: #8b5cf6;
  --border-radius: 8px;
  --border-width: 1px;
  --shadow: 0 0 20px rgba(139,92,246,0.15);
  --font-display: 'Syne', sans-serif;
  /* ... other violet defaults */
}

[data-theme="manga"] {
  --accent: #ffffff;
  --border-radius: 0px;
  --border-width: 2px;
  --shadow: none;
  --font-display: 'Dela Gothic One', sans-serif;
  /* ... manga overrides */
}
```

Properties that switch via CSS variables: accent color, border-radius, border-width, shadows, font-display, background colors, progress bar color.

Properties that switch via conditional classes/v-if: layout grid structure (panels vs normal spacing), decorative elements (halftone, speed lines, kanji), light/dark panel alternation.

### Triggers

1. **NavBar Toggle**: Pill-style toggle next to language switcher. Left side = violet (✦ icon), right side = manga (墨 kanji). Clicking triggers theme switch + panel shatter animation.

2. **Floating Panel Easter Egg**: Fixed-position panel in bottom-right corner.
   - In violet theme: black panel with "バン!" text, white pulse dot, subtle bounce animation. Hover: border turns violet.
   - In manga theme: violet gradient panel with "✦" icon, violet pulse dot. Hover: border turns white.
   - Appears after 3 seconds on page load.
   - Clicking triggers the same theme switch + panel shatter.

### Panel Shatter Animation (~1.5s)

**Phase 1 (0ms):** Page freezes. Current viewport captured as overlay (position: fixed, covering entire screen).

**Phase 2 (0-200ms):** Overlay fragments into 6-8 panels using CSS clip-path polygons. Panels begin separating with slight rotation.

**Phase 3 (200-700ms):** Panels fly outward with staggered timing. Each panel animates independently: rotate (±5-15deg), translate (random directions 50-200px), scale (0.7-0.9), opacity fading. Speed line effect appears briefly at center.

**Phase 4 (700-1500ms):** Theme has swapped underneath. New panels fly in from edges, rotate to 0, translate to position, scale to 1, opacity to 1. Staggered recomposition. Overlay fades out and is removed from DOM.

**Implementation:** CSS transforms + opacity only (GPU accelerated). Overlay element with clip-path fragments. Each fragment uses independent CSS animation with varying delays (stagger 50-80ms). Theme swap happens at ~500ms while fragments are mid-flight.

**Reduced motion fallback:** Simple crossfade (opacity 1→0→1) over 300ms.

**Mobile optimization:** 4 fragments instead of 8. Shorter duration (~1s).

## Persistence

- Theme preference saved to `localStorage` key `portfolio-theme` (values: `"violet"` | `"manga"`)
- On page load: read localStorage, apply theme immediately (no animation)
- SSR default: violet theme. Client hydration applies saved preference
- No flash of wrong theme: inline script in `<head>` reads localStorage and sets `data-theme` before render

## Accessibility

- Toggle has `aria-label="Switch theme"` and `role="switch"` with `aria-checked`
- Floating panel has `aria-label="Switch to manga/violet theme"`
- `prefers-reduced-motion`: panel shatter → simple crossfade, floating panel loses bounce animation
- All contrast ratios maintained in both themes (manga uses B&W = inherently high contrast)
- Focus states: white outline (2px) in manga theme instead of violet

## Responsive Behavior

| Breakpoint | Manga Layout Changes |
|------------|---------------------|
| < 640px | All grids → 1 column. Panels stack vertically. Gutter gaps maintained at 4px. Titles ~30% smaller. Floating panel smaller. Shatter uses 4 fragments. |
| 640-1024px | 2fr/1fr grids → 1fr/1fr. Tech grid keeps 2x2. Reduced padding. |
| > 1024px | Full asymmetric layouts. Max-width 1200px. Parallax effects active. 8 shatter fragments. |

## What Does NOT Change Between Themes

- Content (text, links, data)
- Component structure and hierarchy
- Composables (useScrollReveal, useTypingEffect, useMouseParallax, useScrollProgress, useCounter, useDownloadCv)
- i18n system
- Page routing
- Mobile hamburger menu behavior (different styling, same UX)
- Scroll progress tracking
- Marquee animation in tech stack (different styling, same motion)
