# Manga Panels Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dual-theme system (Violet ↔ Manga Panels) with a Panel Shatter transition animation and a floating easter egg trigger.

**Architecture:** Theme switching via `data-theme="manga"` on `<html>`, CSS custom properties for colors/radius/borders/shadows, conditional Vue classes and `v-if` for layout changes and decorative elements. Panel shatter animation uses a fixed overlay with CSS clip-path fragments. State persisted in localStorage.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, Tailwind CSS v4, Google Fonts (Dela Gothic One)

---

## File Structure

```
app/
  assets/css/
    main.css                      — MODIFY: refactor violet tokens to be theme-switchable
    manga-theme.css               — CREATE: [data-theme="manga"] overrides + manga-specific styles
    panel-shatter.css             — CREATE: keyframes for shatter animation
  composables/
    useTheme.ts                   — CREATE: reactive theme state, toggle, localStorage
    useThemeTransition.ts         — CREATE: panel shatter animation logic
  components/
    ThemeToggle.vue               — CREATE: pill toggle for NavBar
    FloatingPanel.vue             — CREATE: floating easter egg panel
    PanelShatter.vue              — CREATE: fullscreen transition overlay
    MangaHalftone.vue             — CREATE: halftone dot pattern decoration
    MangaSpeedLines.vue           — CREATE: speed lines decoration
    MangaKanji.vue                — CREATE: kanji watermark decoration
    NavBar.vue                    — MODIFY: add ThemeToggle, conditional manga styling
    HeroSection.vue               — MODIFY: conditional manga decorations + layout
    AboutSection.vue              — MODIFY: manga panel grid layout + light panel
    ExperienceSection.vue         — MODIFY: manga timeline panels
    TechStackSection.vue          — MODIFY: manga panel grid
    EducationSection.vue          — MODIFY: manga light panel
    ContactSection.vue            — MODIFY: manga dark panel + speed lines
  pages/
    index.vue                     — MODIFY: add FloatingPanel + PanelShatter
nuxt.config.ts                    — MODIFY: add Dela Gothic One font + manga-theme.css
```

---

### Task 1: Create branch and add Dela Gothic One font

**Files:**
- Modify: `nuxt.config.ts:49-59`

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b feature/manga-theme
```

- [ ] **Step 2: Add Dela Gothic One to Google Fonts link in nuxt.config.ts**

In `nuxt.config.ts`, update both font link tags (preload and stylesheet) to include Dela Gothic One. Change the `href` value from:

```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&display=swap
```

to:

```
https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&display=swap
```

This change applies to both the `rel: 'preload'` link (line ~53) and the `rel: 'stylesheet'` link (line ~57).

- [ ] **Step 3: Run dev server to verify font loads**

```bash
pnpm dev
```

Open browser DevTools → Network tab → filter "fonts.googleapis". Verify `Dela+Gothic+One` appears in the CSS response. Expected: font CSS includes `font-family: 'Dela Gothic One'`.

- [ ] **Step 4: Commit**

```bash
git add nuxt.config.ts
git commit -m "feat: add Dela Gothic One font for manga theme"
```

---

### Task 2: Create useTheme composable

**Files:**
- Create: `app/composables/useTheme.ts`

- [ ] **Step 1: Create the composable**

Create `app/composables/useTheme.ts`:

```typescript
type Theme = 'violet' | 'manga'

const theme = ref<Theme>('violet')

export function useTheme() {
  const isManga = computed(() => theme.value === 'manga')

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', newTheme === 'violet' ? '' : newTheme)
      localStorage.setItem('portfolio-theme', newTheme)
    }
  }

  function toggleTheme() {
    setTheme(theme.value === 'violet' ? 'manga' : 'violet')
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem('portfolio-theme') as Theme | null
      if (saved === 'manga') {
        setTheme('manga')
      }
    }
  }

  return { theme: readonly(theme), isManga, setTheme, toggleTheme, initTheme }
}
```

- [ ] **Step 2: Verify auto-import works**

Nuxt auto-imports composables from `app/composables/`. Run `pnpm dev` and check that there are no TypeScript errors. In browser console, verify the composable is available by temporarily adding `const { theme } = useTheme()` to any component.

- [ ] **Step 3: Commit**

```bash
git add app/composables/useTheme.ts
git commit -m "feat: create useTheme composable with localStorage persistence"
```

---

### Task 3: Create manga theme CSS

**Files:**
- Modify: `app/assets/css/main.css:1-21`
- Create: `app/assets/css/manga-theme.css`
- Modify: `nuxt.config.ts:9`

- [ ] **Step 1: Refactor main.css theme tokens to use CSS custom properties**

In `main.css`, replace the `@theme static` block (lines 1-21) with a version that uses both Tailwind theme tokens AND standard CSS custom properties that can be overridden:

```css
@import "tailwindcss";

@theme static {
  --font-sans: 'Space Grotesk', sans-serif;
  --font-display: 'Syne', sans-serif;

  --color-accent: #8b5cf6;
  --color-accent-light: #a78bfa;
  --color-accent-dark: #7c3aed;

  --color-surface-black: #000000;
  --color-surface-dark: #0a0a0a;
  --color-surface-light: #f5f5f5;
  --color-surface-white: #ffffff;

  --color-border-dark: #1a1a1a;
  --color-border-light: #e5e5e5;

  --color-text-muted: #737373;
  --color-text-muted-dark: #666666;
}

:root {
  --theme-accent: #8b5cf6;
  --theme-accent-light: #a78bfa;
  --theme-accent-dark: #7c3aed;
  --theme-border-radius: 12px;
  --theme-border-radius-sm: 8px;
  --theme-border-width: 1px;
  --theme-card-shadow: 0 0 20px rgba(139, 92, 246, 0.05);
  --theme-font-display: 'Syne', sans-serif;
  --theme-gutter: 0px;
  --theme-panel-border-color: rgba(255, 255, 255, 0.08);
}
```

Keep all remaining CSS in main.css unchanged (lines 23-203).

- [ ] **Step 2: Update scroll-progress and gradient-text to use theme variables**

In `main.css`, update `.scroll-progress` (line ~184) background:

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--theme-accent), var(--theme-accent-light));
  z-index: 100;
  transition: width 0.1s linear;
}
```

Update `.gradient-text` (line ~148):

```css
.gradient-text {
  background: linear-gradient(135deg, var(--theme-accent), var(--theme-accent-light), #c4b5fd, var(--theme-accent));
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 4s ease infinite;
}
```

Update `.gradient-border::before` (line ~162):

```css
.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), transparent, rgba(139, 92, 246, 0.3));
  background-size: 200% 200%;
  animation: gradient-shift 6s ease infinite;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  pointer-events: none;
}
```

Update `pulse-glow` keyframe (line ~129):

```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  50% { box-shadow: 0 0 20px 4px rgba(139, 92, 246, 0.15); }
}
```

Note: `pulse-glow` uses rgba directly in the keyframe — it stays violet-specific. The manga theme will override animation names where needed.

- [ ] **Step 3: Create manga-theme.css**

Create `app/assets/css/manga-theme.css`:

```css
/* Manga Panels Theme Overrides */
[data-theme="manga"] {
  --theme-accent: #ffffff;
  --theme-accent-light: #e5e5e5;
  --theme-accent-dark: #cccccc;
  --theme-border-radius: 0px;
  --theme-border-radius-sm: 0px;
  --theme-border-width: 2px;
  --theme-card-shadow: none;
  --theme-font-display: 'Dela Gothic One', sans-serif;
  --theme-gutter: 4px;
  --theme-panel-border-color: #333333;
}

/* Manga gradient-text override: white shimmer instead of violet */
[data-theme="manga"] .gradient-text {
  background: linear-gradient(135deg, #ffffff, #cccccc, #ffffff, #999999);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Manga gradient-border override */
[data-theme="manga"] .gradient-border::before {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent, rgba(255, 255, 255, 0.2));
  background-size: 200% 200%;
}

/* Manga scroll-progress override */
[data-theme="manga"] .scroll-progress {
  background: #ffffff;
}

/* Manga pulse-glow override */
[data-theme="manga"] .pulse-glow-manga {
  animation: pulse-glow-white 3s ease-in-out infinite;
}

@keyframes pulse-glow-white {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  50% { box-shadow: 0 0 20px 4px rgba(255, 255, 255, 0.15); }
}

/* Panel gutter background */
[data-theme="manga"] .manga-gutter {
  background: #000000;
  padding: 4px;
}

/* Manga panel base */
[data-theme="manga"] .manga-panel {
  border: 2px solid #333333;
  border-radius: 0;
}

[data-theme="manga"] .manga-panel-light {
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 0;
  color: #000000;
}

[data-theme="manga"] .manga-panel-dark {
  background: #0a0a0a;
  border: 2px solid #333333;
  border-radius: 0;
}

/* Halftone base */
.manga-halftone {
  position: absolute;
  pointer-events: none;
  background-size: 8px 8px;
}

.manga-halftone-light {
  background: radial-gradient(circle, #000000 1.5px, transparent 1.5px);
}

.manga-halftone-dark {
  background: radial-gradient(circle, #ffffff 1.5px, transparent 1.5px);
}

/* Speed line base */
.manga-speed-line {
  position: absolute;
  background: currentColor;
  pointer-events: none;
}

/* Floating panel animation */
@keyframes manga-float {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-8px) rotate(-3deg); }
}

@keyframes manga-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

/* Manga section label style (replaces violet accent line + text) */
[data-theme="manga"] .section-label-line {
  background: #ffffff;
}

[data-theme="manga"] .section-label-text {
  color: #888888;
}

/* Override rounded corners globally in manga theme */
[data-theme="manga"] .rounded-xl {
  border-radius: 0;
}

[data-theme="manga"] .rounded-lg {
  border-radius: 0;
}

[data-theme="manga"] .rounded-full {
  border-radius: 0;
}
```

- [ ] **Step 4: Register manga-theme.css in nuxt.config.ts**

In `nuxt.config.ts`, update the `css` array (line 9):

```typescript
css: ['~/assets/css/main.css', '~/assets/css/manga-theme.css'],
```

- [ ] **Step 5: Run dev server and verify themes work**

```bash
pnpm dev
```

Open browser console and run:
```javascript
document.documentElement.setAttribute('data-theme', 'manga')
```

Verify: scroll-progress bar turns white, gradient-text changes to white shimmer, rounded corners become sharp. Run:
```javascript
document.documentElement.removeAttribute('data-theme')
```

Verify: everything reverts to violet theme.

- [ ] **Step 6: Commit**

```bash
git add app/assets/css/main.css app/assets/css/manga-theme.css nuxt.config.ts
git commit -m "feat: add manga theme CSS with variable overrides"
```

---

### Task 4: Create manga decoration components

**Files:**
- Create: `app/components/MangaHalftone.vue`
- Create: `app/components/MangaSpeedLines.vue`
- Create: `app/components/MangaKanji.vue`

- [ ] **Step 1: Create MangaHalftone.vue**

Create `app/components/MangaHalftone.vue`:

```vue
<script setup lang="ts">
defineProps<{
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}>()

const { isManga } = useTheme()
</script>

<template>
  <div
    v-if="isManga"
    class="manga-halftone"
    :class="[
      variant === 'light' ? 'manga-halftone-light' : 'manga-halftone-dark',
      {
        'bottom-0 right-0': position === 'bottom-right' || !position,
        'bottom-0 left-0': position === 'bottom-left',
        'top-0 right-0': position === 'top-right',
        'top-0 left-0': position === 'top-left',
      },
      {
        'w-[60px] h-[40px]': size === 'sm',
        'w-[100px] h-[60px]': size === 'md' || !size,
        'w-[150px] h-[100px]': size === 'lg',
      }
    ]"
    :style="{ opacity: variant === 'light' ? 0.08 : 0.06 }"
  />
</template>
```

- [ ] **Step 2: Create MangaSpeedLines.vue**

Create `app/components/MangaSpeedLines.vue`:

```vue
<script setup lang="ts">
defineProps<{
  count?: number
  direction?: 'right' | 'center'
}>()

const { isManga } = useTheme()

const lines = computed(() => {
  const count = 6
  return Array.from({ length: count }, (_, i) => ({
    width: `${80 + Math.random() * 120}px`,
    height: `${1 + Math.random() * 1.5}px`,
    top: `${20 + (i * 60 / count) + Math.random() * 10}%`,
    rotation: -5 - Math.random() * 15,
    opacity: 0.03 + Math.random() * 0.05,
  }))
})
</script>

<template>
  <div v-if="isManga" class="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      v-for="(line, i) in lines"
      :key="i"
      class="manga-speed-line text-white"
      :style="{
        width: line.width,
        height: line.height,
        top: line.top,
        right: direction === 'center' ? '50%' : '-20px',
        transform: `rotate(${line.rotation}deg)`,
        opacity: line.opacity,
      }"
    />
  </div>
</template>
```

- [ ] **Step 3: Create MangaKanji.vue**

Create `app/components/MangaKanji.vue`:

```vue
<script setup lang="ts">
defineProps<{
  text: string
  position?: 'top-right' | 'top-left' | 'bottom-right'
  vertical?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

const { isManga } = useTheme()
</script>

<template>
  <div
    v-if="isManga"
    class="absolute pointer-events-none select-none font-bold text-white leading-none"
    :class="[
      {
        'top-5 right-8': position === 'top-right' || !position,
        'top-5 left-8': position === 'top-left',
        'bottom-5 right-8': position === 'bottom-right',
      },
      {
        'text-[28px]': size === 'sm',
        'text-[48px]': size === 'md' || !size,
        'text-[80px]': size === 'lg',
      }
    ]"
    :style="{
      opacity: 0.03,
      writingMode: vertical ? 'vertical-rl' : undefined,
    }"
  >
    {{ text }}
  </div>
</template>
```

- [ ] **Step 4: Verify components render only in manga mode**

Run `pnpm dev`. Add a temporary test to any section:

```vue
<MangaHalftone />
<MangaSpeedLines />
<MangaKanji text="開発" />
```

Toggle theme via console: `document.documentElement.setAttribute('data-theme', 'manga')`. Verify decorations appear. Remove `data-theme` — verify they disappear.

Remove the temporary test code.

- [ ] **Step 5: Commit**

```bash
git add app/components/MangaHalftone.vue app/components/MangaSpeedLines.vue app/components/MangaKanji.vue
git commit -m "feat: create manga decoration components (halftone, speed lines, kanji)"
```

---

### Task 5: Create ThemeToggle component and integrate in NavBar

**Files:**
- Create: `app/components/ThemeToggle.vue`
- Modify: `app/components/NavBar.vue`

- [ ] **Step 1: Create ThemeToggle.vue**

Create `app/components/ThemeToggle.vue`:

```vue
<script setup lang="ts">
const { theme, toggleTheme, isManga } = useTheme()
</script>

<template>
  <button
    role="switch"
    :aria-checked="isManga"
    :aria-label="isManga ? 'Switch to violet theme' : 'Switch to manga theme'"
    class="relative flex items-center w-14 h-7 rounded-full border transition-colors duration-300 cursor-pointer"
    :class="isManga
      ? 'bg-white/10 border-white/30'
      : 'bg-accent/10 border-accent/30'"
    @click="toggleTheme"
  >
    <span
      class="absolute w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-bold"
      :class="isManga
        ? 'translate-x-8 bg-white text-black'
        : 'translate-x-1 bg-accent text-white'"
    >
      {{ isManga ? '墨' : '✦' }}
    </span>
  </button>
</template>
```

- [ ] **Step 2: Add ThemeToggle to NavBar desktop menu**

In `app/components/NavBar.vue`, add the import of theme state in the script section (after line 2):

```typescript
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
```

Note: The existing `onMounted` already has the scroll listener. Merge them into one:

Replace lines 35-37:
```typescript
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
```

With:
```typescript
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  initTheme()
})
```

In the template, add `<ThemeToggle />` in the desktop nav area. Insert it after the language switcher div (after line 87, before the closing `</div>` of the `hidden md:flex` container):

```vue
        <ThemeToggle />
```

- [ ] **Step 3: Add ThemeToggle to NavBar mobile menu**

In the mobile menu section, add `<ThemeToggle />` after the language switcher (after the closing `</div>` of the language links, around line 158):

```vue
          <div class="flex items-center gap-3 pt-2">
            <ThemeToggle />
          </div>
```

- [ ] **Step 4: Add manga-conditional styling to NavBar**

Add `isManga` to the NavBar script:

```typescript
const { isManga } = useTheme()
```

Update the logo (line 50-52) to show kanji in manga mode:

```vue
      <a href="#" class="font-display font-extrabold text-xl text-white tracking-tight" :aria-label="$t('nav.backToTop')">
        <template v-if="isManga">
          <span class="border-2 border-white px-2 py-0.5">JF</span>
          <span class="text-xs text-white/40 ml-2">ポートフォリオ</span>
        </template>
        <template v-else>
          jfernando<span class="text-accent">.dev</span>
        </template>
      </a>
```

Update nav link hover classes to be theme-aware. Change the nav link class (line 59):

```vue
          class="text-sm text-text-muted transition-colors duration-200 py-2 px-1"
          :class="isManga ? 'hover:text-white uppercase tracking-widest text-xs' : 'hover:text-accent'"
```

Update the CV button (line 63-69):

```vue
        <button
          class="text-sm border px-4 py-1.5 transition-colors duration-200"
          :class="isManga
            ? 'text-white border-white/40 hover:bg-white/10 rounded-none'
            : 'text-accent border-accent/40 rounded-lg hover:bg-accent/10'"
          :disabled="isGenerating"
          @click="download"
        >
```

Update the active language link class (line 75):

```vue
            :class="locale === 'pt-BR'
              ? (isManga ? 'text-white font-semibold border border-white px-2' : 'text-accent font-semibold')
              : 'text-text-muted hover:text-white'"
```

And for EN (line 83):

```vue
            :class="locale === 'en'
              ? (isManga ? 'text-white font-semibold border border-white px-2' : 'text-accent font-semibold')
              : 'text-text-muted hover:text-white'"
```

- [ ] **Step 5: Verify NavBar theme toggle works**

Run `pnpm dev`. Click the theme toggle. Verify:
- Logo changes from "jfernando.dev" to bordered "JF" + kanji
- Nav links become uppercase/tracked
- CV button border becomes white, corners become sharp
- Toggle pill shows ✦ (violet) or 墨 (manga)

- [ ] **Step 6: Commit**

```bash
git add app/components/ThemeToggle.vue app/components/NavBar.vue
git commit -m "feat: add theme toggle to NavBar with manga-conditional styling"
```

---

### Task 6: Apply manga theme to HeroSection

**Files:**
- Modify: `app/components/HeroSection.vue`

- [ ] **Step 1: Add theme state and manga decorations**

In `app/components/HeroSection.vue`, add to the script section (after line 4):

```typescript
const { isManga } = useTheme()
```

- [ ] **Step 2: Update the section wrapper**

Replace the section tag (line 9):

```vue
  <section
    class="relative min-h-dvh flex items-center overflow-hidden"
    :class="isManga ? 'bg-surface-black' : 'bg-surface-black'"
  >
```

(Both themes use dark background for hero, so the class is the same — but the wrapper enables future changes.)

- [ ] **Step 3: Conditionally render violet decorations vs manga decorations**

Wrap the violet gradient orbs (lines 10-28) in a `v-if`:

```vue
    <!-- Violet theme decorations -->
    <template v-if="!isManga">
      <div
        class="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        :style="{
          background: 'radial-gradient(circle, #8b5cf6, #3b82f6, transparent)',
          left: `calc(60% + ${mouseX * 30}px)`,
          top: `calc(30% + ${mouseY * 30}px)`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out'
        }"
      />
      <div
        class="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
        :style="{
          background: 'radial-gradient(circle, #a78bfa, transparent)',
          left: `calc(20% + ${mouseX * -20}px)`,
          top: `calc(60% + ${mouseY * -20}px)`,
          transition: 'left 0.4s ease-out, top 0.4s ease-out'
        }"
      />
    </template>

    <!-- Manga theme decorations -->
    <template v-if="isManga">
      <MangaSpeedLines />
      <MangaKanji text="開発者" position="top-right" vertical size="lg" />
      <MangaHalftone position="bottom-left" variant="dark" size="lg" />
    </template>
```

- [ ] **Step 4: Update the background text**

Replace the DEVELOPER background text (line ~31):

```vue
    <div
      class="absolute right-[-40px] font-display font-extrabold text-white/[0.03] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :class="isManga ? 'text-[40px] sm:text-[80px] md:text-[120px] lg:text-[160px]' : 'text-[40px] sm:text-[80px] md:text-[120px] lg:text-[200px]'"
      :style="{ top: `calc(50% + ${scrollY * -0.15}px)`, transform: 'translateY(-50%)' }"
    >
      DEVELOPER
    </div>
```

- [ ] **Step 5: Conditionally render violet geometric shapes vs nothing in manga**

Wrap all the floating geometric shapes (lines 42-82) in `v-if="!isManga"`:

```vue
    <!-- Violet theme floating shapes -->
    <template v-if="!isManga">
      <!-- dot grid -->
      <div
        class="absolute inset-0 opacity-[0.03] pointer-events-none"
        style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 40px 40px;"
      />
      <!-- circle shape -->
      <div
        class="absolute top-[12%] left-[8%] w-12 md:w-20 h-12 md:h-20 border border-white/[0.06] rounded-full"
        :style="{ transform: `translate(${mouseX * 15}px, ${scrollY * 0.08 + mouseY * 10}px)` }"
        style="animation: float-1 6s ease-in-out infinite"
      />
      <!-- diamond shape -->
      <div
        class="absolute top-[65%] right-[12%] w-6 md:w-10 h-6 md:h-10 bg-accent/[0.06] rotate-45"
        :style="{ transform: `translate(${mouseX * -10}px, ${scrollY * -0.1 + mouseY * -8}px) rotate(45deg)` }"
        style="animation: float-2 8s ease-in-out infinite"
      />
      <!-- horizontal line -->
      <div
        class="hidden md:block absolute top-[28%] right-[20%] w-32 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
        :style="{ transform: `translate(${mouseX * 8}px, ${scrollY * 0.05 + mouseY * 5}px)` }"
        style="animation: float-3 5s ease-in-out infinite"
      />
      <!-- small diamond -->
      <div
        class="absolute bottom-[25%] left-[18%] w-4 md:w-6 h-4 md:h-6 border border-accent/[0.15] rotate-12"
        :style="{ transform: `translate(${mouseX * -12}px, ${scrollY * -0.06 + mouseY * -6}px) rotate(12deg)` }"
        style="animation: float-2 7s ease-in-out infinite"
      />
      <!-- pulse dot -->
      <div
        class="hidden lg:block absolute top-[18%] right-[6%] w-4 h-4 rounded-full bg-accent/20"
        :style="{ transform: `translate(${mouseX * 20}px, ${scrollY * 0.04 + mouseY * 12}px)` }"
        style="animation: float-1 4s ease-in-out infinite; animation-name: pulse-glow, float-1;"
      />
      <!-- spinning circle -->
      <svg
        class="hidden md:block absolute top-[40%] left-[5%] w-24 h-24 opacity-[0.04]"
        :style="{ transform: `translate(${mouseX * 10}px, ${mouseY * 8}px)` }"
        style="animation: spin-slow 30s linear infinite"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="8 4" />
      </svg>
      <!-- crosshair -->
      <div
        class="hidden md:block absolute bottom-[15%] right-[25%] opacity-[0.06]"
        :style="{ transform: `translate(${mouseX * -8}px, ${mouseY * 6}px)` }"
        style="animation: float-3 9s ease-in-out infinite"
      >
        <div class="w-8 h-[1px] bg-white absolute top-1/2 left-0" />
        <div class="w-[1px] h-8 bg-white absolute left-1/2 top-0" />
      </div>
    </template>
```

- [ ] **Step 6: Update cursor color**

Update the cursor span (line ~93):

```vue
          v-if="showCursor"
          class="inline-block w-[3px] h-[0.85em] ml-1 align-middle"
          :class="isManga ? 'bg-white' : 'bg-accent'"
          style="animation: blink 0.8s step-end infinite"
```

- [ ] **Step 7: Update the grow-line divider**

Update the grow-line div (line ~99):

```vue
      <div
        v-if="isComplete"
        class="h-[3px] mt-6"
        :class="isManga ? 'bg-white' : 'bg-accent'"
        style="animation: grow-line 0.4s ease-out forwards"
      />
```

- [ ] **Step 8: Update accent-colored elements**

Update the subtitle text (line ~86):

```vue
      <p
        class="font-sans font-semibold text-xs sm:text-sm tracking-[2px] sm:tracking-[4px] uppercase mb-4"
        :class="isManga ? 'text-white/60' : 'text-accent'"
      >
```

Update the labels and links throughout the hero to use conditional classes — any `text-accent` becomes `isManga ? 'text-white' : 'text-accent'`.

For the location/connect/resume labels (lines ~109, 113, 126):

```vue
          <p class="text-text-muted text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] mb-1">
```

These are already neutral (text-muted) so they don't need changes.

For the LinkedIn link hover (line ~118):

```vue
            class="inline-flex items-center gap-2 text-white transition-colors duration-200 text-sm sm:text-base"
            :class="isManga ? 'hover:text-white/60' : 'hover:text-accent'"
```

- [ ] **Step 9: Verify hero section in both themes**

Run `pnpm dev`. Toggle theme via the NavBar toggle. Verify:
- Violet: gradient orbs, geometric shapes, violet accents
- Manga: speed lines, kanji watermark, halftone dots, white accents, no geometric shapes

- [ ] **Step 10: Commit**

```bash
git add app/components/HeroSection.vue
git commit -m "feat: apply manga theme to HeroSection"
```

---

### Task 7: Apply manga theme to AboutSection

**Files:**
- Modify: `app/components/AboutSection.vue`

- [ ] **Step 1: Add theme state**

Add to script (after line 1):

```typescript
const { isManga } = useTheme()
```

- [ ] **Step 2: Update section background and layout**

Replace the section tag (line 34):

```vue
  <section
    id="sobre"
    class="relative py-16 sm:py-24 lg:py-36 overflow-hidden"
    :class="isManga ? 'bg-surface-black' : 'bg-surface-white'"
  >
```

Update the background text color (line 35):

```vue
    <div
      class="absolute right-[-30px] top-[20%] font-display font-extrabold text-[50px] sm:text-[100px] lg:text-[160px] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :class="isManga ? 'text-white/[0.02]' : 'text-black/[0.02]'"
    >
```

- [ ] **Step 3: Update manga panel layout for about grid**

The about section currently has a simple 2-column grid. For manga, we wrap it in a gutter container and make the left column a light panel and the right a dark panel.

Replace the grid container (line 49):

```vue
      <div
        class="grid lg:grid-cols-2 gap-8 sm:gap-16"
        :class="isManga ? 'lg:grid-cols-[2fr_1fr] gap-1 p-1 bg-black' : ''"
      >
        <div :class="isManga ? 'bg-white p-6 sm:p-8 border-2 border-black' : ''">
```

Close the wrapper div after the bio paragraphs:

```vue
        </div>

        <div :class="isManga ? 'bg-surface-dark p-6 sm:p-8 border-2 border-[#333]' : ''">
```

- [ ] **Step 4: Update text colors for manga light panel**

Update bio paragraph colors (lines 51, 54, 57):

```vue
          <p
            class="reveal text-sm sm:text-lg leading-relaxed"
            :class="isManga ? 'text-black/80' : 'text-black/70'"
            data-stagger="1"
          >
```

- [ ] **Step 5: Update section label and title colors**

Update the label line (line 41):

```vue
        <div class="reveal w-12 h-[1px]" :class="isManga ? 'bg-white' : 'bg-accent'" />
        <p
          class="reveal text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]"
          :class="isManga ? 'text-white/60' : 'text-accent'"
        >
```

Update the title (line 45):

```vue
      <h2
        class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 sm:mb-12"
        :class="isManga ? 'text-white' : 'text-black'"
      >
```

- [ ] **Step 6: Update counter styles for manga**

Update counter borders (line 67):

```vue
            <div class="reveal border-l-2 pl-3 sm:pl-6" :class="isManga ? 'border-white' : 'border-accent'" data-stagger="1">
              <span class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl" :class="isManga ? 'text-white' : 'text-black'">
```

For the other counters (lines 71, 75):

```vue
            <div class="reveal border-l-2 pl-3 sm:pl-6" :class="isManga ? 'border-white/20' : 'border-black/10'" data-stagger="2">
              <span class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl" :class="isManga ? 'text-white' : 'text-black'">
```

- [ ] **Step 7: Update highlight cards for manga**

Update highlight card styling (line 87):

```vue
          class="reveal-scale group p-4 sm:p-6 border transition-all duration-300"
          :class="isManga
            ? 'bg-surface-dark border-[#333] hover:border-white/40'
            : 'bg-white border-border-light rounded-xl hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5'"
```

Update icon container (line 90):

```vue
            <div
              class="w-10 h-10 flex items-center justify-center mb-4 transition-colors duration-300"
              :class="isManga
                ? 'bg-white/[0.05] group-hover:bg-white/10'
                : 'rounded-lg bg-surface-light group-hover:bg-accent/10'"
            >
```

Update SVG icon colors:

```vue
              <svg ... :class="isManga ? 'text-white' : 'text-accent'" ...>
```

Update highlight title (line 97):

```vue
          <h3 class="font-display font-bold text-sm sm:text-base mb-2" :class="isManga ? 'text-white' : 'text-black'">
```

Update highlight description:

```vue
          <p class="text-xs sm:text-sm leading-relaxed" :class="isManga ? 'text-white/60' : 'text-text-muted'">
```

- [ ] **Step 8: Add manga decorations**

Add inside the section, after the main content div:

```vue
    <MangaHalftone position="bottom-right" variant="light" size="md" />
    <MangaKanji text="力" position="top-right" size="md" />
```

- [ ] **Step 9: Verify About section in both themes**

Toggle theme. Verify:
- Violet: white background, black text, violet accents, rounded cards
- Manga: dark background with light/dark panel split, white text, sharp corners, halftone + kanji

- [ ] **Step 10: Commit**

```bash
git add app/components/AboutSection.vue
git commit -m "feat: apply manga theme to AboutSection with panel layout"
```

---

### Task 8: Apply manga theme to ExperienceSection

**Files:**
- Modify: `app/components/ExperienceSection.vue`

- [ ] **Step 1: Add theme state and update section**

Add to script:

```typescript
const { isManga } = useTheme()
```

- [ ] **Step 2: Update section label and title accent colors**

Replace the accent line + label (lines 47-49):

```vue
        <div class="reveal w-12 h-[1px]" :class="isManga ? 'bg-white' : 'bg-accent'" />
        <p class="reveal text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]" :class="isManga ? 'text-white/60' : 'text-accent'">
```

- [ ] **Step 3: Update timeline line**

Replace the gradient line (line 56):

```vue
        <div
          class="absolute left-0 lg:left-8 top-0 bottom-0 w-[1px]"
          :class="isManga ? 'bg-white w-[3px]' : 'bg-gradient-to-b from-accent/50 via-accent/20 to-transparent'"
        />
```

- [ ] **Step 4: Update timeline dots**

Replace the timeline dot (line 65):

```vue
              <div
                class="reveal-scale w-4 h-4 rounded-full"
                :class="isManga ? 'bg-white' : 'bg-accent'"
                :data-stagger="index"
                :style="isManga ? {} : { animation: 'pulse-glow 3s ease-in-out infinite' }"
              />
```

- [ ] **Step 5: Update period badges**

Replace the period badge (line 69):

```vue
            <div
              class="reveal inline-block px-3 py-1 text-xs font-semibold border mb-4"
              :class="isManga
                ? 'text-white border-white/30 rounded-none'
                : 'text-accent border-accent/30 rounded-full'"
              :data-stagger="index"
            >
```

- [ ] **Step 6: Update job cards**

Replace the card styling (line 76):

```vue
            <div
              class="reveal border p-4 sm:p-6 md:p-8 transition-all duration-300"
              :class="isManga
                ? 'bg-[#1a1a1a] border-[#333] hover:border-white/40 rounded-none'
                : 'bg-white/[0.04] border-white/[0.08] rounded-xl hover:border-accent/20'"
              :data-stagger="index"
            >
```

- [ ] **Step 7: Update badge, role, tags accent colors**

For the company badge (line 81):

```vue
                <span
                  class="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider border"
                  :class="isManga
                    ? 'border-white/40 text-white bg-white/10 rounded-none'
                    : 'border-accent/40 text-accent bg-accent/10 rounded-full'"
                >
```

For the role text (line 85):

```vue
              <p class="text-xs sm:text-sm mt-1 font-semibold" :class="isManga ? 'text-white/80' : 'text-accent'">
```

For list item arrows (line 93):

```vue
                  class="text-white/80 text-xs sm:text-[15px] leading-relaxed pl-5 relative"
                  :class="isManga
                    ? 'before:content-[\"▸\"] before:absolute before:left-0 before:top-[2px] before:text-white'
                    : 'before:content-[\"▹\"] before:absolute before:left-0 before:top-[2px] before:text-accent'"
```

For promotion box (line 98):

```vue
              <div v-if="exp.promotion" class="flex items-center gap-2 sm:gap-3 my-4 sm:my-5 py-2 sm:py-3 px-3 sm:px-4 border" :class="isManga ? 'bg-white/[0.04] border-white/15 rounded-none' : 'bg-accent/[0.06] border-accent/15 rounded-lg'">
```

For promotion text colors:

```vue
                  <span class="text-[11px] font-semibold whitespace-nowrap" :class="isManga ? 'text-white' : 'text-accent'">
```

For tags (line 109):

```vue
                <span
                  ...
                  class="px-3 py-1 text-xs border text-white/60 transition-colors duration-200"
                  :class="isManga
                    ? 'border-white/15 hover:border-white/40 hover:text-white rounded-none'
                    : 'border-white/15 hover:border-accent/40 hover:text-accent rounded-full'"
                >
```

- [ ] **Step 8: Conditionally hide violet decorations and add manga ones**

Wrap the floating circle and pulse dot (lines 35-43) in `v-if="!isManga"`.

Add manga decorations inside the section:

```vue
    <MangaHalftone position="bottom-right" variant="dark" size="md" />
```

- [ ] **Step 9: Verify and commit**

Toggle theme. Verify timeline uses white vertical line in manga, cards are sharp-cornered with gray borders, no violet accents.

```bash
git add app/components/ExperienceSection.vue
git commit -m "feat: apply manga theme to ExperienceSection"
```

---

### Task 9: Apply manga theme to TechStackSection

**Files:**
- Modify: `app/components/TechStackSection.vue`

- [ ] **Step 1: Add theme state**

Add to script:

```typescript
const { isManga } = useTheme()
```

- [ ] **Step 2: Update section background**

Replace the section tag (line 16):

```vue
  <section id="tech" class="relative py-16 sm:py-24 lg:py-36 overflow-hidden" :class="isManga ? 'bg-surface-dark' : 'bg-surface-light'">
```

- [ ] **Step 3: Update background text and label colors**

Background text (line 18):

```vue
      :class="isManga ? 'text-white/[0.02]' : 'text-black/[0.02]'"
```

Label line:

```vue
        <div class="reveal w-12 h-[1px]" :class="isManga ? 'bg-white' : 'bg-accent'" />
        <p class="reveal text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]" :class="isManga ? 'text-white/60' : 'text-accent'">
```

Title:

```vue
      <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6" :class="isManga ? 'text-white' : 'text-black'">
```

Description:

```vue
      <p class="reveal text-sm sm:text-lg max-w-xl mb-10 sm:mb-16" :class="isManga ? 'text-white/60' : 'text-text-muted'" data-stagger="1">
```

- [ ] **Step 4: Update tech category cards**

Replace card styling (line 45):

```vue
            <div
              class="p-4 sm:p-6 border transition-all duration-300 h-full"
              :class="isManga
                ? (catIndex % 2 === 0 ? 'bg-surface-dark border-[#333] hover:border-white/40' : 'bg-white border-black text-black hover:border-black/60')
                : 'bg-white rounded-xl border-border-light hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5'"
            >
```

Update icon container:

```vue
              <div
                class="w-10 h-10 flex items-center justify-center mb-4 transition-colors duration-300"
                :class="isManga
                  ? (catIndex % 2 === 0 ? 'bg-white/[0.05] group-hover:bg-white/10' : 'bg-black/[0.05] group-hover:bg-black/10')
                  : 'rounded-lg bg-surface-light group-hover:bg-accent/10'"
              >
```

Update SVG icon classes:

```vue
              <svg ... :class="isManga ? (catIndex % 2 === 0 ? 'text-white' : 'text-black') : 'text-accent'" ...>
```

Update category title:

```vue
              <h3
                class="font-display font-bold text-sm sm:text-base mb-3 sm:mb-5"
                :class="isManga ? (catIndex % 2 === 0 ? 'text-white' : 'text-black') : 'text-black'"
              >
```

Update tech tags:

```vue
                <span
                  ...
                  class="px-3 py-1.5 text-xs font-medium"
                  :class="isManga
                    ? (catIndex % 2 === 0 ? 'bg-white/[0.06] text-white/70 border border-white/10' : 'bg-black/[0.06] text-black/70 border border-black/10')
                    : 'bg-surface-light rounded-lg text-black/70'"
                >
```

- [ ] **Step 5: Update marquee section**

Replace the marquee container (line 72):

```vue
    <div
      class="mt-12 sm:mt-20 overflow-hidden border-t border-b py-3 sm:py-4"
      :class="isManga ? 'border-[#333]' : 'border-border-light'"
    >
```

Update marquee text colors:

```vue
          <span class="font-display font-extrabold text-lg sm:text-2xl tracking-tight" :class="isManga ? 'text-white/10' : 'text-black/10'">JAVA</span>
          <span :class="isManga ? 'text-white/20' : 'text-accent/20'">&bull;</span>
```

(Apply to all marquee items)

- [ ] **Step 6: Add manga decorations**

Add inside the section:

```vue
    <MangaKanji text="技術" position="top-right" size="md" />
```

- [ ] **Step 7: Verify and commit**

Toggle theme. Verify cards alternate dark/light in checkerboard, marquee text is white, no violet accents.

```bash
git add app/components/TechStackSection.vue
git commit -m "feat: apply manga theme to TechStackSection with checkerboard panels"
```

---

### Task 10: Apply manga theme to EducationSection

**Files:**
- Modify: `app/components/EducationSection.vue`

- [ ] **Step 1: Add theme state**

```typescript
const { isManga } = useTheme()
```

- [ ] **Step 2: Update section for manga (becomes light panel)**

Replace section tag (line 17):

```vue
  <section
    id="formacao"
    class="relative py-16 sm:py-24 lg:py-36 overflow-hidden"
    :class="isManga ? 'bg-white' : 'bg-surface-black'"
  >
```

Update background text:

```vue
      :class="isManga ? 'text-black/[0.02]' : 'text-white/[0.02]'"
```

- [ ] **Step 3: Update label, title, and card colors**

Label:

```vue
        <div class="reveal w-12 h-[1px]" :class="isManga ? 'bg-black' : 'bg-accent'" />
        <p class="reveal text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]" :class="isManga ? 'text-black/60' : 'text-accent'">
```

Title:

```vue
      <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 sm:mb-12" :class="isManga ? 'text-black' : 'text-white'">
```

- [ ] **Step 4: Update education cards**

Replace card styling (line 43):

```vue
          class="reveal border p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-300"
          :class="isManga
            ? 'bg-[#f5f5f5] border-2 border-black hover:border-black/60 rounded-none'
            : 'bg-white/[0.04] border-white/[0.08] rounded-xl hover:border-accent/20'"
```

Update badge container:

```vue
              class="hidden sm:flex w-14 h-14 items-center justify-center flex-shrink-0"
              :class="isManga
                ? (index === 0 ? 'bg-black' : 'border-2 border-black')
                : (index === 0 ? 'bg-accent/10 rounded-xl' : 'bg-white/[0.05] rounded-xl')"
```

Badge text:

```vue
                class="font-display font-bold text-lg"
                :class="isManga
                  ? (index === 0 ? 'text-white' : 'text-black')
                  : (index === 0 ? 'text-accent' : 'text-white/60')"
```

Title text:

```vue
              <p class="font-display font-bold text-base sm:text-xl md:text-2xl" :class="isManga ? 'text-black' : 'text-white'">
```

Institution text:

```vue
              <p class="text-xs sm:text-sm font-semibold mt-1" :class="isManga ? (index === 0 ? 'text-black/80' : 'text-black/60') : (index === 0 ? 'text-accent' : 'text-white/60')">
```

Status text:

```vue
              <p class="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest mt-1" :class="isManga ? 'text-black/60' : 'text-white/60'">
```

Description text:

```vue
              <p v-if="entry.description" class="text-xs sm:text-[15px] mt-3 sm:mt-4 leading-relaxed" :class="isManga ? 'text-black/80' : 'text-white/80'">
```

- [ ] **Step 5: Hide violet floating decoration in manga, add halftone**

Wrap the floating shape (lines 26-29) in `v-if="!isManga"`.

Add:

```vue
    <MangaHalftone position="bottom-right" variant="light" size="md" />
```

- [ ] **Step 6: Verify and commit**

Toggle theme. Verify: education becomes a white/light section with black text, sharp-cornered cards with black borders, black badges.

```bash
git add app/components/EducationSection.vue
git commit -m "feat: apply manga theme to EducationSection as light panel"
```

---

### Task 11: Apply manga theme to ContactSection

**Files:**
- Modify: `app/components/ContactSection.vue`

- [ ] **Step 1: Add theme state**

```typescript
const { isManga } = useTheme()
```

- [ ] **Step 2: Update section background**

Replace section tag (line 10):

```vue
  <section
    id="contato"
    class="relative py-16 sm:py-24 lg:py-36 overflow-hidden"
    :class="isManga ? 'bg-surface-dark border-t-2 border-white' : 'bg-surface-white'"
  >
```

- [ ] **Step 3: Conditionally render decorations**

Wrap the violet gradient blob (lines 11-19) in `v-if="!isManga"`.

Add manga decorations:

```vue
    <template v-if="isManga">
      <MangaSpeedLines direction="center" />
      <MangaKanji text="バン!" position="top-left" size="sm" />
      <MangaKanji text="ドン" position="bottom-right" size="sm" />
    </template>
```

- [ ] **Step 4: Update label, title, and text colors**

Label:

```vue
        <div class="reveal w-12 h-[1px]" :class="isManga ? 'bg-white' : 'bg-accent'" />
        <p class="reveal text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]" :class="isManga ? 'text-white/60' : 'text-accent'">
```

Title:

```vue
      <h2 class="reveal font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter leading-[0.9]" :class="isManga ? 'text-white' : 'text-black'">
```

For the gradient-text span — in manga mode, use plain white:

```vue
        <span :class="isManga ? 'text-white' : 'gradient-text'">{{ $t('contact.title2') }}</span>
```

Description:

```vue
      <p class="reveal text-sm sm:text-lg mt-6 sm:mt-8 max-w-lg" :class="isManga ? 'text-white/60' : 'text-text-muted'" data-stagger="1">
```

- [ ] **Step 5: Update buttons**

LinkedIn button:

```vue
          class="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold group transition-colors duration-300"
          :class="isManga
            ? 'bg-white text-black hover:bg-white/80 rounded-none'
            : 'bg-black text-white rounded-xl hover:bg-accent'"
```

Website button:

```vue
          class="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 border-2 text-sm sm:text-base font-semibold transition-colors duration-300"
          :class="isManga
            ? 'border-white/40 text-white hover:border-white hover:text-white rounded-none'
            : 'border-black text-black rounded-xl hover:border-accent hover:text-accent'"
```

- [ ] **Step 6: Update location and footer**

Location text:

```vue
        <p class="text-sm sm:text-base flex items-center gap-2" :class="isManga ? 'text-white/60' : 'text-text-muted'">
```

Footer border:

```vue
      <div class="reveal mt-16 sm:mt-24 pt-6 sm:pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4" :class="isManga ? 'border-white/10' : 'border-border-light'" data-stagger="4">
        <p class="text-sm" :class="isManga ? 'text-white/40' : 'text-text-muted'">
```

Footer logo:

```vue
        <p class="font-display font-bold text-sm" :class="isManga ? 'text-white/20' : 'text-black/20'">
          jfernando<span :class="isManga ? 'text-white/40' : 'text-accent/40'">.dev</span>
        </p>
```

- [ ] **Step 7: Verify and commit**

Toggle theme. Verify: dark background, white border top, speed lines, onomatopoeia kanji, white buttons.

```bash
git add app/components/ContactSection.vue
git commit -m "feat: apply manga theme to ContactSection with speed lines"
```

---

### Task 12: Create FloatingPanel easter egg

**Files:**
- Create: `app/components/FloatingPanel.vue`
- Modify: `app/pages/index.vue`

- [ ] **Step 1: Create FloatingPanel.vue**

Create `app/components/FloatingPanel.vue`:

```vue
<script setup lang="ts">
const { isManga, toggleTheme } = useTheme()

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 3000)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-8"
  >
    <button
      v-show="isVisible"
      :aria-label="isManga ? 'Switch to violet theme' : 'Switch to manga theme'"
      class="fixed bottom-6 right-6 z-40 cursor-pointer border-2 px-3 py-2 transition-colors duration-300"
      :class="isManga
        ? 'bg-gradient-to-br from-[#1a1020] to-[#0a0a0a] border-[#7c3aed] hover:border-white shadow-[0_4px_20px_rgba(139,92,246,0.2)]'
        : 'bg-[#0a0a0a] border-white hover:border-[#8b5cf6] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'"
      style="animation: manga-float 3s ease-in-out infinite"
      @click="toggleTheme"
    >
      <span
        v-if="isManga"
        class="text-[#8b5cf6] text-lg"
        style="display: inline-block; transform: rotate(-3deg)"
      >✦</span>
      <span
        v-else
        class="font-bold text-white text-sm"
        style="font-family: 'Arial Black', sans-serif; display: inline-block; transform: rotate(-3deg)"
      >バン!</span>

      <!-- Pulse dot -->
      <span
        class="absolute -top-1 -right-1 w-2 h-2 rounded-full"
        :class="isManga ? 'bg-[#8b5cf6]' : 'bg-white'"
        style="animation: manga-pulse 2s ease-in-out infinite"
      />
    </button>
  </Transition>
</template>
```

- [ ] **Step 2: Add FloatingPanel to index.vue**

In `app/pages/index.vue`, add the FloatingPanel component. Update the template:

```vue
<template>
  <div>
    <a href="#sobre" class="skip-to-content">{{ $t('skip') }}</a>

    <div
      class="scroll-progress"
      :style="{ width: `${progress * 100}%` }"
    />

    <NavBar />
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <TechStackSection />
    <EducationSection />
    <ContactSection />
    <FloatingPanel />
  </div>
</template>
```

- [ ] **Step 3: Verify floating panel**

Run `pnpm dev`. Wait 3 seconds. Verify:
- Panel appears in bottom-right with slide-up animation
- Shows "バン!" in violet theme
- Clicking toggles theme
- In manga theme shows "✦" with violet glow
- Hover changes border color

- [ ] **Step 4: Commit**

```bash
git add app/components/FloatingPanel.vue app/pages/index.vue
git commit -m "feat: add floating manga panel easter egg"
```

---

### Task 13: Create Panel Shatter transition animation

**Files:**
- Create: `app/assets/css/panel-shatter.css`
- Create: `app/composables/useThemeTransition.ts`
- Create: `app/components/PanelShatter.vue`
- Modify: `app/pages/index.vue`
- Modify: `nuxt.config.ts:9`

- [ ] **Step 1: Create panel-shatter.css**

Create `app/assets/css/panel-shatter.css`:

```css
.panel-shatter-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}

.panel-shatter-fragment {
  position: absolute;
  background: var(--fragment-bg, #0a0a0a);
  border: 2px solid rgba(255, 255, 255, 0.15);
  will-change: transform, opacity;
}

/* Shatter out animation */
.panel-shatter-fragment.shatter-out {
  animation: shatterOut var(--duration, 600ms) var(--delay, 0ms) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Recompose in animation */
.panel-shatter-fragment.recompose-in {
  animation: recomposeIn var(--duration, 600ms) var(--delay, 0ms) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes shatterOut {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 1;
  }
  100% {
    transform:
      translate(var(--tx, 0px), var(--ty, 0px))
      rotate(var(--rot, 0deg))
      scale(var(--sc, 0.7));
    opacity: 0;
  }
}

@keyframes recomposeIn {
  0% {
    transform:
      translate(var(--tx, 0px), var(--ty, 0px))
      rotate(var(--rot, 0deg))
      scale(var(--sc, 0.7));
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 1;
  }
}

/* Speed line flash at center */
.panel-shatter-flash {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200vw;
  height: 200vh;
  opacity: 0;
  pointer-events: none;
}

.panel-shatter-flash.active {
  animation: shatterFlash 400ms 300ms ease-out forwards;
}

@keyframes shatterFlash {
  0% { opacity: 0; }
  30% { opacity: 0.15; }
  100% { opacity: 0; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .panel-shatter-fragment {
    animation: none !important;
  }

  .panel-shatter-overlay.reduced-motion {
    animation: simpleFade 300ms ease-out forwards;
  }

  @keyframes simpleFade {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
}
```

- [ ] **Step 2: Create useThemeTransition composable**

Create `app/composables/useThemeTransition.ts`:

```typescript
interface Fragment {
  id: number
  clipPath: string
  tx: number
  ty: number
  rot: number
  sc: number
  delay: number
}

const isTransitioning = ref(false)

export function useThemeTransition() {
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  function generateFragments(): Fragment[] {
    const isMobile = window.innerWidth < 640
    const count = isMobile ? 4 : 8
    const cols = isMobile ? 2 : 4
    const rows = count / cols

    const fragments: Fragment[] = []
    let id = 0

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x1 = (col / cols) * 100
        const y1 = (row / rows) * 100
        const x2 = ((col + 1) / cols) * 100
        const y2 = ((row + 1) / rows) * 100

        // Add slight randomness to make it feel organic
        const jitter = 2
        const cx1 = Math.max(0, x1 - Math.random() * jitter)
        const cy1 = Math.max(0, y1 - Math.random() * jitter)
        const cx2 = Math.min(100, x2 + Math.random() * jitter)
        const cy2 = Math.min(100, y2 + Math.random() * jitter)

        fragments.push({
          id: id++,
          clipPath: `polygon(${cx1}% ${cy1}%, ${cx2}% ${cy1}%, ${cx2}% ${cy2}%, ${cx1}% ${cy2}%)`,
          tx: (Math.random() - 0.5) * 300,
          ty: (Math.random() - 0.5) * 300,
          rot: (Math.random() - 0.5) * 30,
          sc: 0.6 + Math.random() * 0.3,
          delay: id * (isMobile ? 40 : 50),
        })
      }
    }

    return fragments
  }

  async function triggerTransition(onSwapTheme: () => void): Promise<void> {
    if (isTransitioning.value) return

    isTransitioning.value = true

    if (prefersReducedMotion.value) {
      onSwapTheme()
      await new Promise(resolve => setTimeout(resolve, 300))
      isTransitioning.value = false
      return
    }

    // Wait for shatter-out phase
    await new Promise(resolve => setTimeout(resolve, 700))

    // Swap theme while fragments are scattered
    onSwapTheme()

    // Wait for recompose phase
    const isMobile = window.innerWidth < 640
    const totalDuration = isMobile ? 1000 : 1500
    await new Promise(resolve => setTimeout(resolve, totalDuration - 700))

    isTransitioning.value = false
  }

  return {
    isTransitioning: readonly(isTransitioning),
    generateFragments,
    triggerTransition,
    prefersReducedMotion,
  }
}
```

- [ ] **Step 3: Create PanelShatter.vue**

Create `app/components/PanelShatter.vue`:

```vue
<script setup lang="ts">
const { isTransitioning, generateFragments, prefersReducedMotion } = useThemeTransition()

const fragments = ref<ReturnType<typeof generateFragments>>([])
const phase = ref<'idle' | 'shatter-out' | 'recompose-in'>('idle')

watch(isTransitioning, (val) => {
  if (val) {
    fragments.value = generateFragments()
    phase.value = 'shatter-out'

    const isMobile = window.innerWidth < 640
    const shatterDuration = 700

    setTimeout(() => {
      phase.value = 'recompose-in'
    }, shatterDuration)

    const totalDuration = isMobile ? 1000 : 1500
    setTimeout(() => {
      phase.value = 'idle'
      fragments.value = []
    }, totalDuration)
  }
})
</script>

<template>
  <div
    v-if="isTransitioning"
    class="panel-shatter-overlay"
    :class="{ 'reduced-motion': prefersReducedMotion }"
  >
    <div
      v-for="frag in fragments"
      :key="frag.id"
      class="panel-shatter-fragment"
      :class="phase === 'shatter-out' ? 'shatter-out' : phase === 'recompose-in' ? 'recompose-in' : ''"
      :style="{
        clipPath: frag.clipPath,
        inset: 0,
        '--tx': `${frag.tx}px`,
        '--ty': `${frag.ty}px`,
        '--rot': `${frag.rot}deg`,
        '--sc': frag.sc,
        '--delay': `${frag.delay}ms`,
        '--duration': '600ms',
        '--fragment-bg': phase === 'shatter-out' ? '#0a0a0a' : '#0a0a0a',
      }"
    />

    <!-- Speed line flash -->
    <div
      class="panel-shatter-flash"
      :class="{ active: phase === 'shatter-out' }"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="absolute bg-white"
        :style="{
          width: '200vw',
          height: `${1 + Math.random() * 2}px`,
          top: `${40 + i * 4}%`,
          left: '-50vw',
          transform: `rotate(${-5 + Math.random() * 10}deg)`,
          opacity: 0.3,
        }"
      />
    </div>
  </div>
</template>
```

- [ ] **Step 4: Register panel-shatter.css**

In `nuxt.config.ts`, update the `css` array:

```typescript
css: ['~/assets/css/main.css', '~/assets/css/manga-theme.css', '~/assets/css/panel-shatter.css'],
```

- [ ] **Step 5: Wire up the transition to theme toggle**

Update `app/composables/useTheme.ts` to integrate with the transition. Replace the `toggleTheme` function:

```typescript
  function toggleTheme() {
    const { triggerTransition } = useThemeTransition()
    triggerTransition(() => {
      setTheme(theme.value === 'violet' ? 'manga' : 'violet')
    })
  }
```

- [ ] **Step 6: Add PanelShatter to index.vue**

In `app/pages/index.vue`, add `<PanelShatter />` just before `</div>`:

```vue
    <FloatingPanel />
    <PanelShatter />
  </div>
</template>
```

- [ ] **Step 7: Verify the full transition**

Run `pnpm dev`. Click the theme toggle or floating panel. Verify:
1. Screen fragments into panels (6-8 pieces)
2. Panels fly outward with rotation
3. Speed line flash at center
4. Theme swaps while fragments are scattered
5. Panels recompose into new theme
6. Total animation ~1.5s

Test with browser DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion". Verify: simple fade instead of shatter.

Test on mobile viewport (375px). Verify: 4 fragments, shorter animation.

- [ ] **Step 8: Commit**

```bash
git add app/assets/css/panel-shatter.css app/composables/useThemeTransition.ts app/components/PanelShatter.vue app/composables/useTheme.ts app/pages/index.vue nuxt.config.ts
git commit -m "feat: add panel shatter transition animation for theme switching"
```

---

### Task 14: Final integration and polish

**Files:**
- Modify: `app/pages/index.vue`

- [ ] **Step 1: Add no-flash inline script**

In `nuxt.config.ts`, add an inline script to the `head.script` array to prevent flash of wrong theme on page load:

```typescript
script: [
  {
    innerHTML: "(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='manga')document.documentElement.setAttribute('data-theme','manga')}catch(e){}})()",
    type: 'text/javascript',
  },
  {
    src: 'https://cloud.umami.is/script.js',
    defer: true,
    'data-website-id': 'a6f2c5dd-0d42-49e7-8ef3-4e35c3a9dd7f'
  }
]
```

- [ ] **Step 2: Add .superpowers to .gitignore**

Check if `.gitignore` already has `.superpowers/`:

```bash
grep -q "superpowers" .gitignore && echo "EXISTS" || echo ".superpowers/" >> .gitignore
```

- [ ] **Step 3: Full end-to-end test**

Run `pnpm dev` and test:

1. **Fresh load**: Violet theme by default
2. **Toggle via NavBar**: Click theme toggle → panel shatter → manga theme
3. **Toggle via floating panel**: Click バン! panel → same transition
4. **Persistence**: Refresh page → manga theme loads without animation
5. **Toggle back**: Click toggle → shatter → violet theme
6. **Mobile**: Test at 375px width — 4 fragments, responsive layout
7. **Reduced motion**: Test with prefers-reduced-motion → simple fade
8. **All sections**: Scroll through all sections, verify each one has correct styling in both themes
9. **NavBar**: Logo, links, CV button, language toggle all adapt
10. **Floating panel**: Changes icon/color when theme changes

- [ ] **Step 4: Commit**

```bash
git add nuxt.config.ts .gitignore
git commit -m "feat: add no-flash script and gitignore for superpowers"
```

- [ ] **Step 5: Final commit with all changes verified**

```bash
git log --oneline feature/manga-theme --not master
```

Verify all commits are present:
1. `feat: add Dela Gothic One font for manga theme`
2. `feat: create useTheme composable with localStorage persistence`
3. `feat: add manga theme CSS with variable overrides`
4. `feat: create manga decoration components`
5. `feat: add theme toggle to NavBar with manga-conditional styling`
6. `feat: apply manga theme to HeroSection`
7. `feat: apply manga theme to AboutSection with panel layout`
8. `feat: apply manga theme to ExperienceSection`
9. `feat: apply manga theme to TechStackSection with checkerboard panels`
10. `feat: apply manga theme to EducationSection as light panel`
11. `feat: apply manga theme to ContactSection with speed lines`
12. `feat: add floating manga panel easter egg`
13. `feat: add panel shatter transition animation for theme switching`
14. `feat: add no-flash script and gitignore for superpowers`
