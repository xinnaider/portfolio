# Separate Theme Layouts — Dual Page Architecture

**Date:** 2026-03-31
**Status:** Approved
**Branch:** `feature/manga-theme`
**Supersedes:** Inline `v-if="isManga"` approach in existing sections

## Summary

Separate the manga and violet themes into completely distinct layout components instead of sharing sections with `v-if` toggles. Each theme gets its own layout component with independent section components. The manga layout uses an asymmetric panel grid with scroll snap. Theme switching uses asymmetric transitions: ink splash (violet→manga) and panel shatter (manga→violet). A `Theme` enum replaces all hardcoded theme strings.

## Design Decisions

### Architecture: Two Layout Components on Same Route

- Single route `/` — no URL change on theme switch
- `index.vue` orchestrates which layout to render via `<component :is="currentLayout">`
- `VioletLayout.vue` — extracted from current index.vue (no layout changes)
- `MangaLayout.vue` — new asymmetric grid with scroll snap
- `NavBar` remains shared, rendered outside layouts in `index.vue`

### Why Not Nuxt Layouts or Separate Routes

- **Nuxt layouts** are wrappers (navbar/footer), not page content — forcing full content into a layout distorts the pattern
- **Separate routes** conflicts with single-URL requirement and duplicates i18n/meta config

## Theme Enum

```typescript
// composables/useTheme.ts
export enum Theme {
  VIOLET = 'violet',
  MANGA = 'manga',
}
```

Used everywhere — `useTheme`, `useThemeTransition`, `NavBar`, `ThemeToggle`, `FloatingPanel`, no-flash script. Zero hardcoded theme strings. All comparisons use `Theme.VIOLET` / `Theme.MANGA`.

## File Structure

```
app/
├── pages/index.vue                        → orchestrator: <component :is="currentLayout">
├── components/
│   ├── layouts/
│   │   ├── VioletLayout.vue               → current sections extracted (violet only)
│   │   └── MangaLayout.vue                → asymmetric grid + scroll snap
│   ├── manga/                             → manga-specific sections
│   │   ├── MangaHeroSection.vue
│   │   ├── MangaAboutSection.vue
│   │   ├── MangaExperienceSection.vue
│   │   ├── MangaTechStackSection.vue
│   │   ├── MangaEducationSection.vue
│   │   └── MangaContactSection.vue
│   ├── HeroSection.vue                    → violet only (v-if="isManga" removed)
│   ├── AboutSection.vue                   → violet only (v-if="isManga" removed)
│   ├── ExperienceSection.vue              → violet only (v-if="isManga" removed)
│   ├── TechStackSection.vue               → violet only (v-if="isManga" removed)
│   ├── EducationSection.vue               → violet only (v-if="isManga" removed)
│   ├── ContactSection.vue                 → violet only (v-if="isManga" removed)
│   ├── NavBar.vue                         → shared (uses Theme enum for logo)
│   ├── ThemeToggle.vue                    → shared
│   ├── FloatingPanel.vue                  → shared
│   ├── PanelShatter.vue                   → kept (manga→violet transition)
│   ├── InkSplash.vue                      → NEW (violet→manga transition)
│   ├── MangaHalftone.vue                  → kept (used by manga sections)
│   ├── MangaKanji.vue                     → kept
│   └── MangaSpeedLines.vue                → kept
├── composables/
│   ├── useTheme.ts                        → adds Theme enum, exports it
│   └── useThemeTransition.ts              → dispatches ink splash vs panel shatter
├── assets/css/
│   ├── main.css                           → no changes
│   ├── manga-theme.css                    → no changes
│   ├── panel-shatter.css                  → no changes
│   └── ink-splash.css                     → NEW keyframes for ink animation
```

## index.vue Orchestration

```vue
<template>
  <NavBar />
  <component :is="currentLayout" :key="theme" />
  <FloatingPanel />
  <PanelShatter />
  <InkSplash />
</template>
```

- `currentLayout` is a computed returning `VioletLayout` or `MangaLayout` based on `useTheme().theme`
- Transition overlays (`PanelShatter`, `InkSplash`) sit outside layouts — they cover the full viewport
- `NavBar` and `FloatingPanel` are shared and always rendered

## Manga Layout: Asymmetric Grid + Scroll Snap

### Desktop (lg+): 3 Rows, Each 100vh

**Row 1 — Hero:**
- Full-width dark panel, 2px white border
- `scroll-snap-align: start`

**Row 2 — About + Experience + Tech:**
- CSS Grid: `grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr`
- About panel spans 2 rows (left, `grid-row: 1/3`)
- Experience panel (top-right, 1fr)
- Tech panel (bottom-right, 1fr)
- 4px gaps between panels
- `scroll-snap-align: start`

**Row 3 — Education + Projects + Contact:**
- CSS Grid: `grid-template-columns: 1fr 1fr 1fr`
- Three equal panels
- 4px gaps
- `scroll-snap-align: start`

### Mobile (< 640px): Stacked

- Single column, each section = one panel
- Each panel is a snap point
- Panels maintain 4px gap and 2px borders

### Scroll Container

```css
.manga-layout {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.manga-row {
  height: 100vh;
  scroll-snap-align: start;
}
```

## Asymmetric Transitions

### Violet → Manga: Ink Splash

**New component:** `InkSplash.vue`

1. User clicks toggle
2. Fullscreen overlay appears with 5-8 SVG `<circle>` blobs at random positions
3. Each blob animates `r` from 0 → large enough to cover viewport, `ease-in`, staggered 30-50ms
4. ~400ms: screen fully covered in black
5. Theme swaps (layout component changes)
6. Blobs retract with `ease-out` animation, revealing manga layout
7. ~800ms total

**CSS:** `ink-splash.css` with `@keyframes inkGrow` and `@keyframes inkShrink`

### Manga → Violet: Panel Shatter (existing)

1. User clicks toggle
2. `PanelShatter.vue` generates 4-8 fragments
3. Fragments fly outward with rotation/scale/translate (~700ms)
4. Theme swaps
5. Fragments recompose (~800ms)
6. ~1500ms total

No changes needed to PanelShatter.vue.

### Dispatch Logic in useThemeTransition.ts

```typescript
import { Theme } from './useTheme'

function triggerTransition(onSwap: () => void) {
  if (theme.value === Theme.VIOLET) {
    triggerInkSplash(onSwap)
  } else {
    triggerPanelShatter(onSwap)
  }
}
```

### Reduced Motion Fallback

Both transitions fall back to a 300ms opacity crossfade when `prefers-reduced-motion: reduce` is detected. Already exists for panel shatter, same logic applies to ink splash.

## Migration Strategy

### Violet Sections (clean up)

Each existing `*Section.vue` loses its `v-if="isManga"` / `v-else` blocks. Only the violet template remains. No layout changes to the violet side.

### Manga Sections (extract)

The `v-if="isManga"` template blocks from each section are extracted into new `components/manga/Manga*Section.vue` files. They keep the same decorative elements (halftone, kanji, speed lines) and content but are adapted to work within the asymmetric grid (the parent `MangaLayout.vue` controls the grid; sections fill their grid cells).

### NavBar

Stays shared. Uses `Theme` enum instead of `v-if="isManga"` for logo rendering:
```vue
<template v-if="theme === Theme.MANGA">JF + kanji</template>
<template v-else>jfernando.dev</template>
```

### Composables

- `useTheme.ts` — adds `Theme` enum export, replaces string literals
- `useThemeTransition.ts` — refactored to dispatch between ink splash and panel shatter using `Theme` enum
- All other composables unchanged

### CSS

- `main.css` — no changes
- `manga-theme.css` — no changes (CSS vars still work via `[data-theme="manga"]`)
- `panel-shatter.css` — no changes
- **New:** `ink-splash.css` — keyframes for ink splash animation

## What Does NOT Change

- Content (text, links, data)
- i18n system
- URL structure (single route `/`)
- CSS variable strategy (`[data-theme="manga"]`)
- Composables: useScrollReveal, useTypingEffect, useMouseParallax, useScrollProgress, useCounter, useDownloadCv
- Persistence: localStorage `portfolio-theme`
- No-flash inline script in `<head>` (updated to use enum values)
- Accessibility: aria attributes, reduced motion fallbacks, contrast ratios

## Accessibility

- Theme toggle: `role="switch"`, `aria-checked`, `aria-label`
- Floating panel: `aria-label="Switch to manga/violet theme"`
- `prefers-reduced-motion`: both transitions → 300ms crossfade
- Scroll snap respects user scroll preferences
- High contrast maintained in both themes

## Responsive Behavior

| Breakpoint | Manga Layout |
|------------|-------------|
| < 640px | Stacked single column, each section = snap point, 4 fragments in shatter |
| 640-1024px | 2-column grid (1fr/1fr instead of 2fr/1fr), simplified asymmetry |
| > 1024px | Full asymmetric 2fr/1fr grid, 3 rows of 100vh, 8 shatter fragments |
