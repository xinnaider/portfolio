# Manga Theme Redesign — Complete Content Overhaul

**Date:** 2026-03-31
**Status:** Approved
**Branch:** `feature/manga-theme`
**Supersedes:** All existing `components/manga/Manga*Section.vue` files

## Summary

Replace all manga section components with a completely different visual experience: a black-and-white manga magazine layout. When the user switches to manga theme, the site looks like a different product entirely. Each section becomes a "manga page" with chapter/page indicators, speech bubbles, narration boxes, speed lines, halftone patterns, Japanese kanji decorations, and onomatopoeia. Zero color — pure black and white.

## Design Decisions

### Core Visual Language

- **Pure black and white** — no purple, no gradients, no glows. `#000` and `#fff` only, with `#f0f0f0` / `#e0e0e0` for halftone and backgrounds
- **Panels** — thick `3px` black borders, irregular proportions per row (not symmetric grids)
- **Speed lines** — `repeating-conic-gradient` radial from off-center for diagonal energy
- **Halftone** — `radial-gradient` dot pattern in background corners
- **Kanji decorations** — large, low-opacity, unique per section (開 hero, 現 experience, 自 about, 技 tech, 学 education, 連 contact)
- **Onomatopoeia** — ドン、ズーン、バン、終 large and semi-transparent as atmosphere

### Content Containers

Three types, used contextually:

1. **Narration box** — black background, white monospace text, full-width. Used for chapter introductions and transitions. Example: `▸ 5 ANOS. 3 EMPRESAS. INCONTÁVEIS SISTEMAS ENTREGUES.`
2. **Speech bubble (rect)** — black border, white bg, italic serif. Used for personal voice quotes.
3. **Thought bubble** — dashed border. Used for softer editorial commentary.

### Page Structure

Each "page" maps to one scroll-snap section:

| Page | Chapter | Content |
|------|---------|---------|
| 1 | CAP. 1 — O DESENVOLVEDOR | Hero splash |
| 2 | CAP. 2 — TRAJETÓRIA DE BATALHA | Experience (3 jobs) |
| 3 | CAP. 3 — PERFIL & ARSENAL | About + Tech stack |
| 4 | CAP. 4 — ORIGEM & CONTATO | Education + Contact |

Every page has:
- **Header bar** (black): `jfernando.dev · CAP. N — TÍTULO · PAG. N`
- **Page number** in bottom-right: `— N —`
- Opening **narration box** (except Hero)

### Panel Layouts Per Page

**Page 1 — Hero (full single panel, 100vh)**
- Radial speed lines centered right
- Halftone bottom-left
- Kanji 開 huge background
- Name: `J. FERNANDO` at 64px weight-900, top-left
- Status badge (black bg): `FULL STACK DEV` + tech list, top-right
- Onomatopeia `ドン！` bottom-left, rotated -4deg
- Speech bubble bottom-right: quote

**Page 2 — Experience (grid `2fr 1fr 1fr`)**
- Panel heights equal, ~140px desktop
- Job 1 (Nepen, current): larger, has halftone + kanji 現, narration inline
- Job 2: gray background `#f0f0f0`, thought bubble
- Job 3: white, kanji 始 bottom-right
- SFX divider row: ズーン + ▼ PRÓXIMO CAPÍTULO + バン

**Page 3 — About + Tech (two sub-rows)**
- Sub-row 1: `2fr 1fr` — About (bio + speech bubble) | Counters dark panel (5+ years, 20+ projects)
- Chapter bar divider: `— ARSENAL DE TECNOLOGIAS —`
- Sub-row 2: full width — Tech badges grouped by category (Backend · Frontend · Infra & DB), with vertical "STACK" label on left, kanji 技 background

**Page 4 — Education + Contact (grid `3fr 2fr`)**
- Education: 3 entries with descending border weight (4px solid → 2px → 1px dashed), kanji 学
- Contact: dark panel, GitHub + LinkedIn links, CTA button with double-border manga style
- Closing narration: `▸ FIM DO CAPÍTULO 4 — A HISTÓRIA CONTINUA...` with 終 kanji

### Typography Rules

- Section titles: `font-weight: 900`, `serif`, tight tracking (`letter-spacing: -1px` to `-3px`)
- Labels/meta: `'Courier New'`, `font-size: 8-10px`, `letter-spacing: 2-4px`, uppercase, `color: #888`
- Body text: `serif`, `font-size: 9-11px`, `line-height: 1.6-1.7`
- SFX / Kanji: `font-weight: 900`, `serif`, semi-transparent (`opacity: 0.1-0.3`)
- Narration boxes: `'Courier New'`, `font-size: 9px`, `letter-spacing: 1px`, white-on-black

### Scroll Behavior

- `MangaLayout.vue` scroll container: `scroll-snap-type: y mandatory`
- Each page (`.manga-page`): `height: 100vh`, `scroll-snap-align: start`, `overflow: hidden`
- No overflow within pages — content is designed to fit

### Mobile (< 640px)

- Panels stack vertically within each page
- Grid columns collapse to single column
- SFX elements hidden (`display: none`) to save space
- Kanji decorations remain (they're CSS, no layout impact)
- Page header truncates chapter title, keeps page number

## File Changes

### Delete (replaced entirely)
- `app/components/manga/MangaHeroSection.vue`
- `app/components/manga/MangaAboutSection.vue`
- `app/components/manga/MangaExperienceSection.vue`
- `app/components/manga/MangaTechStackSection.vue`
- `app/components/manga/MangaEducationSection.vue`
- `app/components/manga/MangaContactSection.vue`

### Replace with
- `app/components/manga/MangaPage1Hero.vue`
- `app/components/manga/MangaPage2Experience.vue`
- `app/components/manga/MangaPage3AboutTech.vue`
- `app/components/manga/MangaPage4EducationContact.vue`

### Modify
- `app/components/layouts/MangaLayout.vue` — update to use new page components, apply scroll-snap container styles
- `app/assets/css/manga-theme.css` — add manga-page shared styles (borders, narration boxes, speech bubbles, halftone, speed lines, SFX typography)

### No changes
- `app/composables/useTheme.ts`
- `app/composables/useThemeTransition.ts`
- `app/components/InkSplash.vue`
- `app/components/PanelShatter.vue`
- `app/components/layouts/VioletLayout.vue`
- `app/pages/index.vue`
- All violet `*Section.vue` components

## CSS Architecture

Shared manga styles go in `manga-theme.css` under `[data-theme="manga"]`:

```css
/* Page shell */
.manga-page { background: #fff; color: #000; height: 100vh; overflow: hidden; scroll-snap-align: start; }
.manga-page-header { background: #000; color: #fff; font-family: monospace; font-size: 10px; letter-spacing: 2px; display: flex; justify-content: space-between; padding: 5px 14px; }
.manga-page-num { position: absolute; bottom: 8px; right: 12px; font-size: 11px; font-family: monospace; }

/* Panels */
.manga-panel { border: 3px solid #000; position: relative; overflow: hidden; background: #fff; }
.manga-panel--dark { background: #111; color: #fff; }
.manga-panel--gray { background: #f0f0f0; }

/* Content containers */
.manga-narration { background: #000; color: #fff; font-family: monospace; font-size: 9px; padding: 5px 10px; letter-spacing: 1px; }
.manga-bubble { border: 3px solid #000; padding: 7px 10px; font-size: 10px; font-style: italic; line-height: 1.5; }
.manga-thought { border: 3px dashed #000; padding: 7px 10px; font-size: 9px; font-style: italic; }
.manga-chapter-bar { background: #000; color: #fff; font-family: monospace; font-size: 10px; letter-spacing: 4px; text-align: center; padding: 5px; }

/* Decorations */
.manga-speed-radial { position: absolute; inset: 0; background: repeating-conic-gradient(from 0deg at 65% 45%, #fff 0deg 1deg, #e0e0e0 1deg 2.5deg); opacity: 0.5; }
.manga-halftone { position: absolute; background: radial-gradient(circle, #bbb 1.5px, transparent 1.5px) 0 0 / 7px 7px; }
.manga-halftone--dark { background: radial-gradient(circle, #333 1.5px, transparent 1.5px) 0 0 / 7px 7px; }
.manga-kanji { position: absolute; color: #f0f0f0; font-weight: 900; line-height: 1; font-family: serif; user-select: none; }
.manga-sfx { font-weight: 900; font-family: serif; letter-spacing: -1px; line-height: 0.9; text-shadow: 3px 3px 0 #ccc; }
```

## i18n Strategy

Manga pages reuse existing i18n data keys for content (experience jobs, tech names, education entries, contact links) — no new data keys needed. New keys required only for manga-specific text:

- `manga.narration.hero` — narration box text on page 1
- `manga.narration.experience` — narration box text on page 2
- `manga.narration.aboutTech` — narration box text on page 3
- `manga.narration.educationContact` — narration box text on page 4
- `manga.chapter.N` — chapter titles (4 total)
- `manga.bubble.hero` — hero speech bubble quote
- `manga.bubble.about` — about speech bubble quote

## Composables in Manga Pages

Manga pages do **not** use `useScrollReveal` or `useTypingEffect` — panels are static by design (manga panels don't animate in). They do use:
- `useI18n` — for all text content
- `useCounter` (Page 3 About) — for the animated counters (+5 anos, +20 projetos)
- `useDownloadCv` (Page 1 Hero) — for the CV download action if present

## Accessibility

- Narration boxes and SFX are decorative — `aria-hidden="true"` on `.manga-narration` and `.manga-sfx` elements
- i18n: chapter titles and narration text go through `$t()`
- `prefers-reduced-motion`: speed line CSS patterns are static (no JS animation) — no fallback needed
- Color contrast: black-on-white and white-on-black both exceed WCAG AA

## What Does NOT Change

- Theme switching mechanism (ink splash / panel shatter)
- `useTheme`, `useThemeTransition`, `useScrollReveal`, `useScrollProgress`
- i18n content keys for experience, tech, education, contact data
- Violet theme — untouched
- localStorage persistence
- No-flash script
