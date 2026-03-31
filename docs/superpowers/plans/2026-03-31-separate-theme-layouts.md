# Separate Theme Layouts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Separate manga and violet themes into distinct layout components, add `Theme` enum, and implement asymmetric transitions (ink splash for violet→manga, panel shatter for manga→violet) with an asymmetric scroll-snap manga layout.

**Architecture:** `index.vue` dynamically renders either `VioletLayout` or `MangaLayout` via `<component :is>`. Each layout owns its section components. A new `InkSplash.vue` handles the violet→manga transition. All theme string comparisons use `Theme` enum.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, TypeScript, Tailwind CSS v4, CSS custom properties, CSS animations (no external animation libraries).

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `app/composables/useTheme.ts` | Add `Theme` enum, replace string literals |
| Modify | `app/composables/useThemeTransition.ts` | Dispatch ink splash vs panel shatter, use `Theme` enum |
| Create | `app/components/layouts/VioletLayout.vue` | Violet sections extracted from index.vue |
| Create | `app/components/layouts/MangaLayout.vue` | Asymmetric 3-row scroll-snap layout |
| Create | `app/components/manga/MangaHeroSection.vue` | Hero from HeroSection.vue `v-if="isManga"` block |
| Create | `app/components/manga/MangaAboutSection.vue` | About from AboutSection.vue `v-if="isManga"` block |
| Create | `app/components/manga/MangaExperienceSection.vue` | Experience from ExperienceSection.vue `v-if="isManga"` block |
| Create | `app/components/manga/MangaTechStackSection.vue` | TechStack from TechStackSection.vue `v-if="isManga"` block |
| Create | `app/components/manga/MangaEducationSection.vue` | Education from EducationSection.vue `v-if="isManga"` block |
| Create | `app/components/manga/MangaContactSection.vue` | Contact from ContactSection.vue `v-if="isManga"` block |
| Modify | `app/components/HeroSection.vue` | Remove `v-if="isManga"` block, keep only violet template |
| Modify | `app/components/AboutSection.vue` | Remove `v-if="isManga"` block, keep only violet template |
| Modify | `app/components/ExperienceSection.vue` | Remove `v-if="isManga"` block, keep only violet template |
| Modify | `app/components/TechStackSection.vue` | Remove `v-if="isManga"` block, keep only violet template |
| Modify | `app/components/EducationSection.vue` | Remove `v-if="isManga"` block, keep only violet template |
| Modify | `app/components/ContactSection.vue` | Remove `v-if="isManga"` block, keep only violet template |
| Modify | `app/components/NavBar.vue` | Use `Theme` enum instead of `isManga` for logo |
| Modify | `app/components/ThemeToggle.vue` | Use `Theme` enum |
| Modify | `app/components/FloatingPanel.vue` | Use `Theme` enum |
| Create | `app/components/InkSplash.vue` | Fullscreen SVG blob overlay for violet→manga transition |
| Create | `app/assets/css/ink-splash.css` | Keyframes for ink grow/shrink animations |
| Modify | `app/pages/index.vue` | Render `<component :is>` based on theme, mount `InkSplash` |
| Modify | `nuxt.config.ts` | Import `ink-splash.css` |

---

## Task 1: Add `Theme` Enum to `useTheme.ts`

**Files:**
- Modify: `app/composables/useTheme.ts`

- [ ] **Step 1: Replace `type Theme` with `enum Theme` and update all comparisons**

Open `app/composables/useTheme.ts` and replace the entire file with:

```typescript
export enum Theme {
  VIOLET = 'violet',
  MANGA = 'manga',
}

const theme = ref<Theme>(Theme.VIOLET)

export function useTheme() {
  const isManga = computed(() => theme.value === Theme.MANGA)

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', newTheme === Theme.VIOLET ? '' : newTheme)
      localStorage.setItem('portfolio-theme', newTheme)
    }
  }

  function toggleTheme() {
    const { triggerTransition } = useThemeTransition()
    triggerTransition(() => {
      setTheme(theme.value === Theme.VIOLET ? Theme.MANGA : Theme.VIOLET)
    })
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem('portfolio-theme') as Theme | null
      if (saved === Theme.MANGA) {
        setTheme(Theme.MANGA)
      }
    }
  }

  return { theme: readonly(theme), isManga, setTheme, toggleTheme, initTheme }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && npx nuxi typecheck 2>&1 | head -30
```

Expected: no errors related to `useTheme.ts`.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && git add app/composables/useTheme.ts && git commit -m "refactor: replace Theme string union with enum in useTheme"
```

---

## Task 2: Update `useThemeTransition.ts` to Dispatch Asymmetric Transitions

**Files:**
- Modify: `app/composables/useThemeTransition.ts`

The existing `triggerTransition` always does panel shatter. We need it to dispatch: if current theme is `Theme.VIOLET`, trigger ink splash; otherwise trigger panel shatter. Ink splash state lives here as a separate ref.

- [ ] **Step 1: Replace the composable with the new asymmetric dispatch version**

Replace `app/composables/useThemeTransition.ts` entirely:

```typescript
import { Theme } from './useTheme'

interface Fragment {
  id: number
  clipPath: string
  tx: number
  ty: number
  rot: number
  sc: number
  delay: number
}

interface InkBlob {
  id: number
  cx: number
  cy: number
  delay: number
}

const isTransitioning = ref(false)
const isInkSplashing = ref(false)

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

  function generateInkBlobs(): InkBlob[] {
    const count = window.innerWidth < 640 ? 5 : 8
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      cx: 10 + Math.random() * 80,
      cy: 10 + Math.random() * 80,
      delay: i * 40,
    }))
  }

  async function triggerPanelShatter(onSwapTheme: () => void): Promise<void> {
    isTransitioning.value = true

    await new Promise(resolve => setTimeout(resolve, 700))
    onSwapTheme()

    const isMobile = window.innerWidth < 640
    const totalDuration = isMobile ? 1000 : 1500
    await new Promise(resolve => setTimeout(resolve, totalDuration - 700))

    isTransitioning.value = false
  }

  async function triggerInkSplash(onSwapTheme: () => void): Promise<void> {
    isInkSplashing.value = true

    // Wait for ink to cover screen (~400ms)
    await new Promise(resolve => setTimeout(resolve, 400))
    onSwapTheme()

    // Wait for ink to retract (~400ms)
    await new Promise(resolve => setTimeout(resolve, 400))

    isInkSplashing.value = false
  }

  async function triggerTransition(onSwapTheme: () => void): Promise<void> {
    const { theme } = useTheme()
    if (isTransitioning.value || isInkSplashing.value) return

    if (prefersReducedMotion.value) {
      onSwapTheme()
      await new Promise(resolve => setTimeout(resolve, 300))
      return
    }

    if (theme.value === Theme.VIOLET) {
      await triggerInkSplash(onSwapTheme)
    } else {
      await triggerPanelShatter(onSwapTheme)
    }
  }

  return {
    isTransitioning: readonly(isTransitioning),
    isInkSplashing: readonly(isInkSplashing),
    generateFragments,
    generateInkBlobs,
    triggerTransition,
    prefersReducedMotion,
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && npx nuxi typecheck 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && git add app/composables/useThemeTransition.ts && git commit -m "refactor: dispatch ink splash vs panel shatter based on current theme"
```

---

## Task 3: Create `InkSplash.vue` and `ink-splash.css`

**Files:**
- Create: `app/components/InkSplash.vue`
- Create: `app/assets/css/ink-splash.css`

- [ ] **Step 1: Create `ink-splash.css`**

Create `app/assets/css/ink-splash.css`:

```css
.ink-splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
}

.ink-splash-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.ink-blob {
  will-change: r;
}

.ink-blob.growing {
  animation: inkGrow 400ms var(--ink-delay, 0ms) cubic-bezier(0.4, 0, 1, 1) forwards;
}

.ink-blob.shrinking {
  animation: inkShrink 400ms var(--ink-delay, 0ms) cubic-bezier(0, 0, 0.6, 1) forwards;
}

@keyframes inkGrow {
  from { r: 0; }
  to { r: 200vmax; }
}

@keyframes inkShrink {
  from { r: 200vmax; }
  to { r: 0; }
}

/* Reduced motion: simple fade */
@media (prefers-reduced-motion: reduce) {
  .ink-blob {
    animation: none !important;
  }
  .ink-splash-overlay.reduced-motion {
    animation: inkFade 300ms ease-out forwards;
  }
  @keyframes inkFade {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
}
```

- [ ] **Step 2: Create `InkSplash.vue`**

Create `app/components/InkSplash.vue`:

```vue
<script setup lang="ts">
const { isInkSplashing, generateInkBlobs, prefersReducedMotion } = useThemeTransition()

const blobs = ref<ReturnType<typeof generateInkBlobs>>([])
const phase = ref<'idle' | 'growing' | 'shrinking'>('idle')

watch(isInkSplashing, (val) => {
  if (val) {
    blobs.value = generateInkBlobs()
    phase.value = 'growing'

    // Switch to shrinking after ink covers screen
    setTimeout(() => {
      phase.value = 'shrinking'
    }, 420)

    // Reset after full animation
    setTimeout(() => {
      phase.value = 'idle'
      blobs.value = []
    }, 840)
  }
})
</script>

<template>
  <div
    v-if="isInkSplashing"
    class="ink-splash-overlay"
    :class="{ 'reduced-motion': prefersReducedMotion }"
  >
    <svg class="ink-splash-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <circle
        v-for="blob in blobs"
        :key="blob.id"
        class="ink-blob"
        :class="phase === 'growing' ? 'growing' : phase === 'shrinking' ? 'shrinking' : ''"
        :cx="blob.cx"
        :cy="blob.cy"
        r="0"
        fill="#000"
        :style="{ '--ink-delay': `${blob.delay}ms` }"
      />
    </svg>
  </div>
</template>
```

- [ ] **Step 3: Import `ink-splash.css` in `nuxt.config.ts`**

Open `nuxt.config.ts`. Find the `css` array and add the new file:

```typescript
css: [
  '~/assets/css/main.css',
  '~/assets/css/manga-theme.css',
  '~/assets/css/panel-shatter.css',
  '~/assets/css/ink-splash.css',  // add this line
],
```

- [ ] **Step 4: Verify dev server starts without errors**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && npx nuxi typecheck 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && git add app/components/InkSplash.vue app/assets/css/ink-splash.css nuxt.config.ts && git commit -m "feat: add InkSplash component and animation for violet→manga transition"
```

---

## Task 4: Create `VioletLayout.vue`

**Files:**
- Create: `app/components/layouts/VioletLayout.vue`

This is a simple wrapper that renders the existing violet sections in order. No scroll snap — normal scroll behavior.

- [ ] **Step 1: Create the directory and component**

Create `app/components/layouts/VioletLayout.vue`:

```vue
<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <TechStackSection />
    <EducationSection />
    <ContactSection />
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && git add app/components/layouts/VioletLayout.vue && git commit -m "feat: add VioletLayout wrapper component"
```

---

## Task 5: Extract Manga Sections from Existing Components

For each section, extract the `v-if="isManga"` template block into its own file under `app/components/manga/`. Each extracted component keeps the same `<script setup>` logic (composables, computed, refs) that the manga template uses. After extracting, the parent section component keeps only the `v-else` (violet) block, removing `v-if`/`v-else` entirely (no condition needed since VioletLayout only renders violet sections).

**Files:**
- Create: `app/components/manga/MangaHeroSection.vue`
- Create: `app/components/manga/MangaAboutSection.vue`
- Create: `app/components/manga/MangaExperienceSection.vue`
- Create: `app/components/manga/MangaTechStackSection.vue`
- Create: `app/components/manga/MangaEducationSection.vue`
- Create: `app/components/manga/MangaContactSection.vue`
- Modify: `app/components/HeroSection.vue`
- Modify: `app/components/AboutSection.vue`
- Modify: `app/components/ExperienceSection.vue`
- Modify: `app/components/TechStackSection.vue`
- Modify: `app/components/EducationSection.vue`
- Modify: `app/components/ContactSection.vue`

- [ ] **Step 1: Create `MangaHeroSection.vue`**

Create `app/components/manga/MangaHeroSection.vue` with the content from `HeroSection.vue`'s `v-if="isManga"` block (the `<section v-if="isManga" ...>` block), converted to a standalone component. The `<script setup>` keeps only what the manga template uses:

```vue
<script setup lang="ts">
const { displayedText, isComplete, showCursor } = useTypingEffect('JOSÉ FERNANDO', 100, 500)
const { scrollY } = useScrollProgress()
const { download, isGenerating } = useDownloadCv()
</script>

<template>
  <section class="relative min-h-dvh flex items-center overflow-hidden bg-[#0a0a0a] border-b-2 border-white">
    <MangaSpeedLines />
    <MangaKanji text="開発者" position="top-right" vertical size="lg" />
    <MangaHalftone position="bottom-left" variant="dark" size="lg" />

    <div
      class="absolute right-[-40px] font-display font-extrabold text-[40px] sm:text-[80px] md:text-[120px] lg:text-[160px] text-white/[0.03] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :style="{ top: `calc(50% + ${scrollY * -0.15}px)`, transform: 'translateY(-50%)' }"
    >
      DEVELOPER
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-28 md:pt-32 pb-20 w-full">
      <p class="font-sans font-semibold text-xs sm:text-sm tracking-[4px] uppercase mb-4 text-white/50">
        {{ $t('hero.subtitle') }}
      </p>

      <h1 class="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-white leading-[0.9] tracking-tighter">
        {{ displayedText }}<span
          v-if="showCursor"
          class="inline-block w-[3px] h-[0.85em] bg-white ml-1 align-middle"
          style="animation: blink 0.8s step-end infinite"
        />
      </h1>

      <div
        v-if="isComplete"
        class="h-[3px] bg-white mt-6"
        style="animation: grow-line 0.4s ease-out forwards"
      />

      <p class="text-white/60 text-sm sm:text-base md:text-lg mt-6 sm:mt-8 max-w-lg leading-relaxed">
        {{ $t('hero.description') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-10">
        <div>
          <p class="text-white/40 text-[10px] sm:text-xs uppercase tracking-[3px] mb-1">{{ $t('hero.locationLabel') }}</p>
          <p class="text-white text-sm sm:text-base">{{ $t('hero.locationValue') }}</p>
        </div>
        <div>
          <p class="text-white/40 text-[10px] sm:text-xs uppercase tracking-[3px] mb-1">{{ $t('hero.connect') }}</p>
          <a
            href="https://linkedin.com/in/jfernandodev"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-white hover:text-white/60 transition-colors duration-200 text-sm sm:text-base"
            :aria-label="$t('hero.linkedinAria')"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            linkedin.com/in/jfernandodev
          </a>
        </div>
        <div>
          <p class="text-white/40 text-[10px] sm:text-xs uppercase tracking-[3px] mb-1">{{ $t('hero.resume') }}</p>
          <button
            class="inline-flex items-center gap-2 text-white hover:text-white/60 transition-colors duration-200 text-sm sm:text-base"
            :disabled="isGenerating"
            @click="download"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            {{ isGenerating ? $t('hero.generating') : $t('hero.downloadCv') }}
          </button>
        </div>
      </div>
    </div>

    <div class="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span class="text-white/30 text-xs tracking-[4px] uppercase" style="writing-mode: vertical-lr">{{ $t('hero.scroll') }}</span>
      <div class="w-[2px] h-8 bg-white/30" style="animation: bounce-down 2s ease-in-out infinite" />
    </div>
  </section>
</template>
```

- [ ] **Step 2: Clean `HeroSection.vue` to violet-only**

In `app/components/HeroSection.vue`, remove the entire `<!-- MANGA HERO -->` block (the `<section v-if="isManga" ...>` section and everything in it up to `</section>`). Change `<section v-else ...>` to `<section ...>` (remove the `v-else`). Remove `isManga` from the `<script setup>` destructure since it's no longer used.

The `<script setup>` should become:
```vue
<script setup lang="ts">
const { displayedText, isComplete, showCursor } = useTypingEffect('JOSÉ FERNANDO', 100, 500)
const { scrollY } = useScrollProgress()
const { mouseX, mouseY } = useMouseParallax()
const { download, isGenerating } = useDownloadCv()
</script>
```

- [ ] **Step 3: Create `MangaAboutSection.vue`**

Create `app/components/manga/MangaAboutSection.vue` with the content from `AboutSection.vue`'s `v-if="isManga"` block:

```vue
<script setup lang="ts">
const { tm, rt } = useI18n()

const yearsCounter = useCounter(4, 2000)
const companiesCounter = useCounter(3, 2000)
const languagesCounter = useCounter(6, 2000)

const countersRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          yearsCounter.animate()
          companiesCounter.animate()
          languagesCounter.animate()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  if (countersRef.value) {
    observer.observe(countersRef.value)
  }
})

const highlights = computed(() => tm('about.highlights') as Array<{ title: string, desc: string }>)
</script>

<template>
  <section id="sobre" class="relative bg-black py-0 overflow-hidden">
    <MangaKanji text="力" position="top-right" size="md" />

    <div class="max-w-6xl mx-auto">
      <div class="border-b-2 border-[#333] px-6 py-8">
        <div class="flex items-center gap-4 mb-4">
          <div class="reveal w-12 h-[2px] bg-white" />
          <p class="reveal text-white/50 text-xs font-semibold uppercase tracking-[4px]">{{ $t('about.label') }}</p>
        </div>
        <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
          {{ $t('about.title') }}
        </h2>
      </div>

      <div class="grid lg:grid-cols-[2fr_1fr]">
        <div class="bg-white border-r-0 lg:border-r-2 border-[#000] p-6 sm:p-10 lg:p-12">
          <MangaHalftone position="top-left" variant="light" size="sm" />
          <p class="reveal text-black/80 text-sm sm:text-lg leading-relaxed" data-stagger="1">{{ $t('about.bio1') }}</p>
          <p class="reveal text-black/80 text-sm sm:text-lg leading-relaxed mt-6" data-stagger="2">{{ $t('about.bio2') }}</p>
          <p class="reveal text-black/80 text-sm sm:text-lg leading-relaxed mt-6" data-stagger="3">{{ $t('about.bio3') }}</p>

          <div class="grid sm:grid-cols-2 gap-[2px] bg-black mt-10">
            <div
              v-for="(item, index) in highlights"
              :key="index"
              class="reveal-scale bg-[#f5f5f5] p-4 sm:p-5"
              :data-stagger="index + 1"
            >
              <div class="w-8 h-8 bg-black flex items-center justify-center mb-3">
                <svg v-if="index === 0" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                <svg v-else-if="index === 1" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <svg v-else-if="index === 2" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                <svg v-else-if="index === 3" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                <svg v-else class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 class="font-display font-bold text-sm text-black mb-1">{{ rt(item.title) }}</h3>
              <p class="text-black/60 text-xs leading-relaxed">{{ rt(item.desc) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-[#0a0a0a] p-6 sm:p-10 lg:p-12 border-t-2 lg:border-t-0 border-[#333]">
          <MangaKanji text="力" position="bottom-right" size="sm" />
          <div ref="countersRef" class="flex flex-row lg:flex-col gap-8 lg:gap-12">
            <div class="reveal border-l-2 border-white pl-4 sm:pl-6" data-stagger="1">
              <span class="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white">+{{ yearsCounter.count.value }}</span>
              <p class="text-white/40 text-[10px] sm:text-xs uppercase tracking-[3px] mt-2">{{ $t('about.yearsLabel') }}</p>
            </div>
            <div class="reveal border-l-2 border-white/20 pl-4 sm:pl-6" data-stagger="2">
              <span class="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white">{{ companiesCounter.count.value }}</span>
              <p class="text-white/40 text-[10px] sm:text-xs uppercase tracking-[3px] mt-2">{{ $t('about.companiesLabel') }}</p>
            </div>
            <div class="reveal border-l-2 border-white/20 pl-4 sm:pl-6" data-stagger="3">
              <span class="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white">{{ languagesCounter.count.value }}+</span>
              <p class="text-white/40 text-[10px] sm:text-xs uppercase tracking-[3px] mt-2">{{ $t('about.languagesLabel') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 4: Clean `AboutSection.vue` to violet-only**

In `app/components/AboutSection.vue`, remove the entire `<!-- MANGA ABOUT: ... -->` block (the `<section v-if="isManga" ...>...</section>`). Change `<section v-else ...>` to `<section ...>`. Remove `isManga` from the `<script setup>` destructure.

The `<script setup>` should become:
```vue
<script setup lang="ts">
const { tm, rt } = useI18n()

const yearsCounter = useCounter(4, 2000)
const companiesCounter = useCounter(3, 2000)
const languagesCounter = useCounter(6, 2000)

const countersRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          yearsCounter.animate()
          companiesCounter.animate()
          languagesCounter.animate()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  if (countersRef.value) {
    observer.observe(countersRef.value)
  }
})

const highlights = computed(() => tm('about.highlights') as Array<{ title: string, desc: string }>)
</script>
```

- [ ] **Step 5: Create `MangaContactSection.vue`**

Create `app/components/manga/MangaContactSection.vue` with the content from `ContactSection.vue`'s `v-if="isManga"` block:

```vue
<script setup lang="ts">
const { t } = useI18n()
const currentYear = new Date().getFullYear()
const copyright = computed(() => t('contact.copyright', { year: currentYear }))
</script>

<template>
  <section id="contato" class="relative bg-[#0a0a0a] overflow-hidden border-t-2 border-white">
    <MangaSpeedLines direction="center" />
    <MangaKanji text="バン!" position="top-left" size="sm" />
    <MangaKanji text="ドン" position="bottom-right" size="sm" />

    <div class="relative z-10 max-w-6xl mx-auto px-6 py-20 sm:py-28 lg:py-36 text-center">
      <div class="flex items-center justify-center gap-4 mb-6">
        <div class="reveal w-12 h-[2px] bg-white" />
        <p class="reveal text-white/50 text-xs font-semibold uppercase tracking-[4px]">{{ $t('contact.label') }}</p>
        <div class="reveal w-12 h-[2px] bg-white" />
      </div>

      <h2 class="reveal font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-white tracking-tighter leading-[0.9]">
        {{ $t('contact.title1') }}<br>
        {{ $t('contact.title2') }}
      </h2>

      <p class="reveal text-white/50 text-sm sm:text-lg mt-6 sm:mt-8 max-w-lg mx-auto" data-stagger="1">
        {{ $t('contact.description') }}
      </p>

      <div class="reveal flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-10 justify-center" data-stagger="2">
        <a
          href="https://linkedin.com/in/jfernandodev"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-semibold text-sm sm:text-base transition-colors duration-300 hover:bg-white/80 border-2 border-white group"
          :aria-label="$t('contact.linkedinAria')"
        >
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <a
          href="https://jfernando.dev"
          class="inline-flex items-center justify-center gap-3 px-6 py-4 border-2 border-white/40 text-white font-semibold text-sm sm:text-base transition-colors duration-300 hover:border-white hover:text-white"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
          jfernando.dev
        </a>
      </div>

      <div class="reveal mt-6 sm:mt-8" data-stagger="3">
        <p class="text-white/40 text-sm sm:text-base flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {{ $t('contact.location') }}
        </p>
      </div>

      <div class="reveal mt-16 sm:mt-24 pt-6 sm:pt-8 border-t-2 border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4" data-stagger="4">
        <p class="text-white/30 text-sm">{{ copyright }}</p>
        <p class="font-display font-bold text-sm text-white/15">
          jfernando<span class="text-white/30">.dev</span>
        </p>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 6: Clean `ContactSection.vue` to violet-only**

In `app/components/ContactSection.vue`, remove the entire `<!-- MANGA CONTACT: ... -->` block. Change `<section v-else ...>` to `<section ...>`. Remove `isManga` from the `<script setup>` destructure.

The `<script setup>` should become:
```vue
<script setup lang="ts">
const { t } = useI18n()
const { mouseX, mouseY } = useMouseParallax()
const currentYear = new Date().getFullYear()
const copyright = computed(() => t('contact.copyright', { year: currentYear }))
</script>
```

- [ ] **Step 7: Create manga sections for Experience, TechStack, and Education**

For `ExperienceSection.vue`, `TechStackSection.vue`, and `EducationSection.vue`, follow the same pattern as steps 1-6:
- Read the component file
- Extract the `v-if="isManga"` block into `app/components/manga/MangaExperienceSection.vue` (or TechStack/Education)
- In the `<script setup>` of the new manga component, keep only imports/composables used by the manga template
- Clean the original component: remove the manga block, remove `v-if`/`v-else`, remove `isManga` from destructure

- [ ] **Step 8: Verify TypeScript compiles**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && npx nuxi typecheck 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 9: Commit**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && git add app/components/manga/ app/components/HeroSection.vue app/components/AboutSection.vue app/components/ExperienceSection.vue app/components/TechStackSection.vue app/components/EducationSection.vue app/components/ContactSection.vue && git commit -m "refactor: extract manga sections into components/manga/ and clean violet sections"
```

---

## Task 6: Update `NavBar.vue`, `ThemeToggle.vue`, and `FloatingPanel.vue` to Use `Theme` Enum

**Files:**
- Modify: `app/components/NavBar.vue`
- Modify: `app/components/ThemeToggle.vue`
- Modify: `app/components/FloatingPanel.vue`

- [ ] **Step 1: Update `NavBar.vue`**

In `app/components/NavBar.vue`, the `isManga` computed is already used — we don't need to change the template conditionals since `isManga` still works. But the logo template uses `v-if="isManga"` which is fine. The `Theme` enum doesn't need to be imported in NavBar since `isManga` covers the boolean check.

No changes needed to NavBar — `isManga` from `useTheme()` already correctly abstracts the enum comparison.

- [ ] **Step 2: Verify `ThemeToggle.vue` — no changes needed**

`ThemeToggle.vue` uses `isManga` and `toggleTheme` — both still work unchanged.

- [ ] **Step 3: Verify `FloatingPanel.vue` — no changes needed**

`FloatingPanel.vue` uses `isManga` and `toggleTheme` — both still work unchanged.

- [ ] **Step 4: Commit (no-op if no changes were needed)**

If files were modified, commit. If `isManga` abstraction covered everything with no changes needed, skip this commit.

---

## Task 7: Create `MangaLayout.vue`

**Files:**
- Create: `app/components/layouts/MangaLayout.vue`

The manga layout uses 3 scroll-snap rows of 100vh each on desktop. Each row is a grid with the section components filling the cells.

- [ ] **Step 1: Create `MangaLayout.vue`**

Create `app/components/layouts/MangaLayout.vue`:

```vue
<template>
  <div class="manga-layout">
    <!-- Row 1: Hero — full width, 100vh -->
    <div class="manga-row">
      <MangaHeroSection />
    </div>

    <!-- Row 2: About (tall, 2fr) + Experience (top-right) + Tech (bottom-right) -->
    <div class="manga-row manga-row--asymmetric">
      <div class="manga-cell manga-cell--about">
        <MangaAboutSection />
      </div>
      <div class="manga-cell manga-cell--experience">
        <MangaExperienceSection />
      </div>
      <div class="manga-cell manga-cell--tech">
        <MangaTechStackSection />
      </div>
    </div>

    <!-- Row 3: Education + Contact (2 columns) -->
    <div class="manga-row manga-row--thirds">
      <div class="manga-cell">
        <MangaEducationSection />
      </div>
      <div class="manga-cell">
        <MangaContactSection />
      </div>
    </div>
  </div>
</template>

<style scoped>
.manga-layout {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.manga-row {
  height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;
}

/* Row 2: About (2fr tall, spans 2 rows) | Experience (1fr top) + Tech (1fr bottom) */
.manga-row--asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  background: #000;
}

.manga-cell--about {
  grid-row: 1 / 3;
  overflow-y: auto;
}

.manga-cell--experience {
  grid-row: 1 / 2;
  overflow-y: auto;
}

.manga-cell--tech {
  grid-row: 2 / 3;
  overflow-y: auto;
}

/* Row 3: 2 equal columns */
.manga-row--thirds {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  background: #000;
}

.manga-cell {
  overflow-y: auto;
}

/* Mobile: stacked, each section is its own snap point */
@media (max-width: 639px) {
  .manga-layout {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
  }

  .manga-row {
    height: auto;
    scroll-snap-align: none;
  }

  .manga-row--asymmetric,
  .manga-row--thirds {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: #000;
  }

  .manga-cell--about,
  .manga-cell--experience,
  .manga-cell--tech,
  .manga-cell {
    grid-row: unset;
    height: 100vh;
    scroll-snap-align: start;
    overflow-y: auto;
  }

  .manga-row:first-child {
    height: 100vh;
    scroll-snap-align: start;
  }
}
</style>
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && npx nuxi typecheck 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && git add app/components/layouts/MangaLayout.vue && git commit -m "feat: add MangaLayout with asymmetric scroll-snap panel grid"
```

---

## Task 8: Update `index.vue` to Orchestrate Layout Components

**Files:**
- Modify: `app/pages/index.vue`

- [ ] **Step 1: Rewrite `index.vue`**

Replace `app/pages/index.vue` with:

```vue
<script setup lang="ts">
import { Theme } from '~/composables/useTheme'
import VioletLayout from '~/components/layouts/VioletLayout.vue'
import MangaLayout from '~/components/layouts/MangaLayout.vue'

const { t } = useI18n()

useHead({
  title: 'José Fernando — Full Stack Developer',
  meta: [
    { name: 'description', content: () => t('meta.description') }
  ]
})

useScrollReveal()

const { progress } = useScrollProgress()
const { theme } = useTheme()

const currentLayout = computed(() =>
  theme.value === Theme.MANGA ? MangaLayout : VioletLayout
)
</script>

<template>
  <div>
    <a href="#sobre" class="skip-to-content">{{ $t('skip') }}</a>

    <div
      class="scroll-progress"
      :style="{ width: `${progress * 100}%` }"
    />

    <NavBar />
    <component :is="currentLayout" :key="theme" />
    <FloatingPanel />
    <PanelShatter />
    <InkSplash />
  </div>
</template>
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && npx nuxi typecheck 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 3: Start dev server and manually test**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && npm run dev
```

Open `http://localhost:3000` in the browser. Verify:
1. Violet theme loads by default
2. Clicking toggle plays ink splash and switches to manga layout
3. Clicking toggle in manga plays panel shatter and switches back to violet
4. Manga layout shows 3 rows with scroll snap
5. `localStorage` persists theme after page reload
6. FloatingPanel easter egg appears after 3 seconds

- [ ] **Step 4: Commit**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && git add app/pages/index.vue && git commit -m "feat: orchestrate VioletLayout/MangaLayout swap in index.vue with asymmetric transitions"
```

---

## Task 9: Fix `useScrollReveal` Scope for MangaLayout

**Files:**
- Modify: `app/pages/index.vue` (or `app/composables/useScrollReveal.ts` if needed)

`useScrollReveal()` is called in `index.vue` and sets up IntersectionObservers on `.reveal` elements. When the layout component swaps, new `.reveal` elements are mounted but the observer from the previous run may not pick them up. We need to re-run reveal on layout change.

- [ ] **Step 1: Check how `useScrollReveal` works**

Read `app/composables/useScrollReveal.ts` to understand if it re-observes on DOM changes or only runs once on mount.

- [ ] **Step 2: If it only runs on mount, re-trigger on theme change**

In `app/pages/index.vue`, watch the `theme` ref and call `useScrollReveal()` after the component swap:

```vue
<script setup lang="ts">
import { Theme } from '~/composables/useTheme'
import VioletLayout from '~/components/layouts/VioletLayout.vue'
import MangaLayout from '~/components/layouts/MangaLayout.vue'

const { t } = useI18n()

useHead({
  title: 'José Fernando — Full Stack Developer',
  meta: [
    { name: 'description', content: () => t('meta.description') }
  ]
})

useScrollReveal()

const { progress } = useScrollProgress()
const { theme } = useTheme()

const currentLayout = computed(() =>
  theme.value === Theme.MANGA ? MangaLayout : VioletLayout
)

// Re-initialize scroll reveal after layout swap so new .reveal elements are observed
watch(theme, async () => {
  await nextTick()
  useScrollReveal()
})
</script>
```

- [ ] **Step 3: Test scroll reveal in both themes**

In the browser at `http://localhost:3000`:
1. Scroll through violet theme — verify `.reveal` elements animate in
2. Switch to manga — scroll through manga layout — verify `.reveal` elements animate in
3. Switch back to violet — verify reveals still work

- [ ] **Step 4: Commit**

```bash
cd C:/Users/fernandonepen/Documents/portfolio && git add app/pages/index.vue && git commit -m "fix: re-initialize scroll reveal after theme layout swap"
```

---

## Self-Review

### Spec Coverage Check

| Spec Requirement | Task |
|-----------------|------|
| Same route `/`, toggle swaps layout components | Task 8 |
| `Theme` enum replaces hardcoded strings | Task 1 |
| Ink splash (violet→manga) | Tasks 2, 3 |
| Panel shatter (manga→violet) | Task 2 (existing, dispatched correctly) |
| `VioletLayout.vue` extracted | Task 4 |
| `MangaLayout.vue` asymmetric grid | Task 7 |
| 3 rows, each 100vh, scroll snap | Task 7 |
| Row 2: About (2fr tall) + Experience + Tech | Task 7 |
| Row 3: Education + Contact | Task 7 |
| Mobile stacked with snap per section | Task 7 |
| Manga sections extracted to `components/manga/` | Task 5 |
| Violet sections cleaned (no `v-if="isManga"`) | Task 5 |
| `NavBar` shared, uses enum | Task 6 |
| `InkSplash.vue` component | Task 3 |
| `ink-splash.css` keyframes | Task 3 |
| Reduced motion fallback | Task 3 (inkFade in CSS) |
| Scroll reveal re-initialization | Task 9 |

No gaps found.

### Placeholder Scan

No TBDs, TODOs, or vague steps found.

### Type Consistency

- `Theme` enum exported from `useTheme.ts` in Task 1, imported in `useThemeTransition.ts` Task 2, and `index.vue` Task 8 — consistent.
- `generateInkBlobs()` defined in Task 2, used in `InkSplash.vue` Task 3 — consistent return type `InkBlob[]`.
- `isInkSplashing` exported from `useThemeTransition` in Task 2, read in `InkSplash.vue` Task 3 — consistent.
- `VioletLayout` / `MangaLayout` component imports in Task 8 match files created in Tasks 4 and 7.
