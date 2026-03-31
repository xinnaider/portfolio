# Manga Theme Redesign — Complete Content Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all manga section components with a pure black-and-white manga magazine experience — each section becomes a "manga page" with chapter/page headers, speech bubbles, narration boxes, speed lines, halftone patterns, and onomatopoeia.

**Architecture:** Four new `MangaPage*.vue` components replace the six old manga sections. `MangaLayout.vue` is rewritten to render these four pages in a scroll-snap container. Shared visual classes (`.manga-page`, `.manga-narration`, `.manga-bubble`, etc.) are added to `manga-theme.css`. The violet theme and all transition mechanics remain untouched.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, TypeScript, @nuxtjs/i18n, Tailwind CSS (utility classes used alongside scoped CSS)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `app/assets/css/manga-theme.css` | Add shared manga page CSS classes |
| Modify | `app/locales/pt-BR.json` | Add `manga.*` narration/chapter/bubble keys |
| Modify | `app/locales/en.json` | Same keys in English |
| Modify | `app/components/layouts/MangaLayout.vue` | Rewrite: 4 page imports, scroll-snap container |
| Create | `app/components/manga/MangaPage1Hero.vue` | Chapter 1 — hero splash page |
| Create | `app/components/manga/MangaPage2Experience.vue` | Chapter 2 — experience panel grid |
| Create | `app/components/manga/MangaPage3AboutTech.vue` | Chapter 3 — about + tech stack |
| Create | `app/components/manga/MangaPage4EducationContact.vue` | Chapter 4 — education + contact |
| Delete | `app/components/manga/MangaHeroSection.vue` | Replaced by MangaPage1Hero |
| Delete | `app/components/manga/MangaAboutSection.vue` | Replaced by MangaPage3AboutTech |
| Delete | `app/components/manga/MangaExperienceSection.vue` | Replaced by MangaPage2Experience |
| Delete | `app/components/manga/MangaTechStackSection.vue` | Replaced by MangaPage3AboutTech |
| Delete | `app/components/manga/MangaEducationSection.vue` | Replaced by MangaPage4EducationContact |
| Delete | `app/components/manga/MangaContactSection.vue` | Replaced by MangaPage4EducationContact |

---

## Task 1: Add Shared Manga Page CSS to manga-theme.css

**Files:**
- Modify: `app/assets/css/manga-theme.css`

- [ ] **Step 1: Append the manga page shared classes at the end of `manga-theme.css`**

Open `app/assets/css/manga-theme.css` and append the following block **after the last existing rule**:

```css
/* ─── Manga Page Shell ─────────────────────────────────────────── */
[data-theme="manga"] .manga-page {
  background: #fff;
  color: #000;
  font-family: serif;
  height: 100vh;
  overflow: hidden;
  scroll-snap-align: start;
  position: relative;
}

[data-theme="manga"] .manga-page-header {
  background: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 14px;
  font-size: 10px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  flex-shrink: 0;
}

[data-theme="manga"] .manga-page-num {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 11px;
  font-family: 'Courier New', monospace;
  color: #000;
  z-index: 10;
}

/* ─── Panels ──────────────────────────────────────────────────── */
[data-theme="manga"] .mp {
  border: 3px solid #000;
  position: relative;
  overflow: hidden;
  background: #fff;
}

[data-theme="manga"] .mp--dark {
  background: #111;
  color: #fff;
}

[data-theme="manga"] .mp--gray {
  background: #f0f0f0;
}

/* ─── Content Containers ──────────────────────────────────────── */
[data-theme="manga"] .manga-narration {
  background: #000;
  color: #fff;
  font-family: 'Courier New', monospace;
  font-size: 9px;
  padding: 5px 14px;
  letter-spacing: 1px;
  flex-shrink: 0;
}

[data-theme="manga"] .manga-bubble {
  border: 3px solid #000;
  padding: 7px 10px;
  background: #fff;
  font-size: 10px;
  font-style: italic;
  line-height: 1.5;
  font-family: serif;
}

[data-theme="manga"] .manga-thought {
  border: 3px dashed #000;
  padding: 7px 10px;
  background: #fff;
  font-size: 9px;
  font-style: italic;
  line-height: 1.5;
  font-family: serif;
}

[data-theme="manga"] .manga-chapter-bar {
  background: #000;
  color: #fff;
  font-family: 'Courier New', monospace;
  font-size: 10px;
  letter-spacing: 4px;
  text-align: center;
  padding: 5px;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  flex-shrink: 0;
}

/* ─── Decorative Elements ─────────────────────────────────────── */
[data-theme="manga"] .manga-speed-radial {
  position: absolute;
  inset: 0;
  background: repeating-conic-gradient(
    from 0deg at 65% 45%,
    #fff 0deg 1deg,
    #e0e0e0 1deg 2.5deg
  );
  opacity: 0.5;
  pointer-events: none;
}

[data-theme="manga"] .manga-ht {
  position: absolute;
  background: radial-gradient(circle, #bbb 1.5px, transparent 1.5px) 0 0 / 7px 7px;
  pointer-events: none;
}

[data-theme="manga"] .manga-ht--dark {
  background: radial-gradient(circle, #333 1.5px, transparent 1.5px) 0 0 / 7px 7px;
}

[data-theme="manga"] .manga-kanji {
  position: absolute;
  color: #f0f0f0;
  font-weight: 900;
  line-height: 1;
  font-family: serif;
  user-select: none;
  pointer-events: none;
}

[data-theme="manga"] .manga-sfx {
  font-weight: 900;
  font-family: serif;
  letter-spacing: -1px;
  line-height: 0.9;
  color: #000;
  text-shadow: 3px 3px 0 #ccc;
}

/* ─── Label / Meta Typography ─────────────────────────────────── */
[data-theme="manga"] .manga-meta {
  font-size: 8px;
  letter-spacing: 3px;
  color: #888;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

[data-theme="manga"] .manga-title {
  font-weight: 900;
  font-family: serif;
  letter-spacing: -1px;
  line-height: 0.9;
  color: #000;
}

[data-theme="manga"] .manga-badge-outline {
  border: 2px solid #000;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: bold;
  font-family: serif;
}

[data-theme="manga"] .manga-badge-solid {
  border: 2px solid #000;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: bold;
  font-family: serif;
  background: #000;
  color: #fff;
}

/* ─── Mobile overrides ─────────────────────────────────────────── */
@media (max-width: 639px) {
  [data-theme="manga"] .manga-sfx-hide-mobile {
    display: none;
  }
}
```

- [ ] **Step 2: Verify no syntax errors**

Run:
```bash
pnpm run typecheck
```
Expected: no errors related to CSS (typecheck won't catch CSS errors, but confirms project still builds). If dev server is running, check browser console for errors.

- [ ] **Step 3: Commit**

```bash
git add app/assets/css/manga-theme.css
git commit -m "feat: add shared manga page CSS classes to manga-theme.css"
```

---

## Task 2: Add manga i18n Keys to Both Locale Files

**Files:**
- Modify: `app/locales/pt-BR.json`
- Modify: `app/locales/en.json`

- [ ] **Step 1: Add `manga` key to `app/locales/pt-BR.json`**

Open `app/locales/pt-BR.json`. At the end of the root object (before the final `}`), add a comma after the last key and insert:

```json
"manga": {
  "chapter": {
    "1": "CAP. 1 — O DESENVOLVEDOR",
    "2": "CAP. 2 — TRAJETÓRIA DE BATALHA",
    "3": "CAP. 3 — PERFIL & ARSENAL",
    "4": "CAP. 4 — ORIGEM & CONTATO"
  },
  "narration": {
    "experience": "▸ 5 ANOS. 3 EMPRESAS. SISTEMAS QUE FUNCIONAM.",
    "aboutTech": "▸ QUEM É ELE? E COM QUAIS ARMAS LUTA?",
    "educationContact": "▸ TODO HERÓI TEM UMA ORIGEM. E UMA FORMA DE SER ENCONTRADO."
  },
  "bubble": {
    "hero": "\"Construo sistemas que realmente funcionam.\"",
    "about": "\"5 anos. 20+ projetos. Zero arrependimentos.\""
  },
  "closing": "▸ FIM DO CAPÍTULO 4 — A HISTÓRIA CONTINUA...",
  "siteLabel": "jfernando.dev",
  "pageLabel": "PAG.",
  "missionLabel": "MISSÃO ATUAL",
  "previousLabel": "ANTERIOR",
  "originLabel": "ORIGEM",
  "profileLabel": "PERFIL",
  "arsenalLabel": "ARSENAL",
  "formationLabel": "FORMAÇÃO",
  "contactLabel": "CONTATO",
  "backendLabel": "BACKEND",
  "frontendLabel": "FRONTEND",
  "infraLabel": "INFRA & DB",
  "sendMessage": "ENVIAR MENSAGEM",
  "yearsExp": "Anos de Exp.",
  "projects": "Projetos"
}
```

- [ ] **Step 2: Add `manga` key to `app/locales/en.json`**

Open `app/locales/en.json`. Same position (end of root object), add:

```json
"manga": {
  "chapter": {
    "1": "CH. 1 — THE DEVELOPER",
    "2": "CH. 2 — BATTLE RECORD",
    "3": "CH. 3 — PROFILE & ARSENAL",
    "4": "CH. 4 — ORIGINS & CONTACT"
  },
  "narration": {
    "experience": "▸ 5 YEARS. 3 COMPANIES. SYSTEMS THAT WORK.",
    "aboutTech": "▸ WHO IS HE? AND WHAT WEAPONS DOES HE WIELD?",
    "educationContact": "▸ EVERY HERO HAS AN ORIGIN. AND A WAY TO BE FOUND."
  },
  "bubble": {
    "hero": "\"I build systems that actually work.\"",
    "about": "\"5 years. 20+ projects. Zero regrets.\""
  },
  "closing": "▸ END OF CHAPTER 4 — THE STORY CONTINUES...",
  "siteLabel": "jfernando.dev",
  "pageLabel": "PG.",
  "missionLabel": "CURRENT MISSION",
  "previousLabel": "PREVIOUS",
  "originLabel": "ORIGIN",
  "profileLabel": "PROFILE",
  "arsenalLabel": "ARSENAL",
  "formationLabel": "FORMATION",
  "contactLabel": "CONTACT",
  "backendLabel": "BACKEND",
  "frontendLabel": "FRONTEND",
  "infraLabel": "INFRA & DB",
  "sendMessage": "SEND MESSAGE",
  "yearsExp": "Years Exp.",
  "projects": "Projects"
}
```

- [ ] **Step 3: Verify JSON is valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('app/locales/pt-BR.json','utf8')); JSON.parse(require('fs').readFileSync('app/locales/en.json','utf8')); console.log('OK')"
```
Expected output: `OK`

- [ ] **Step 4: Commit**

```bash
git add app/locales/pt-BR.json app/locales/en.json
git commit -m "feat: add manga i18n keys for chapter headers, narration, and bubbles"
```

---

## Task 3: Rewrite MangaLayout.vue

**Files:**
- Modify: `app/components/layouts/MangaLayout.vue`

- [ ] **Step 1: Replace the entire file content**

Overwrite `app/components/layouts/MangaLayout.vue` with:

```vue
<template>
  <div class="manga-layout">
    <MangaPage1Hero />
    <MangaPage2Experience />
    <MangaPage3AboutTech />
    <MangaPage4EducationContact />
  </div>
</template>

<style scoped>
.manga-layout {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  background: #000;
}
</style>
```

Note: The `MangaPage*` components don't exist yet — the dev server will error until Tasks 4–7 are complete. That is expected.

- [ ] **Step 2: Commit**

```bash
git add app/components/layouts/MangaLayout.vue
git commit -m "refactor: rewrite MangaLayout to use 4 manga page components"
```

---

## Task 4: Create MangaPage1Hero.vue

**Files:**
- Create: `app/components/manga/MangaPage1Hero.vue`

- [ ] **Step 1: Create the file**

Create `app/components/manga/MangaPage1Hero.vue` with the following content:

```vue
<script setup lang="ts">
const { t } = useI18n()
const { download, isGenerating } = useDownloadCv()
</script>

<template>
  <div class="manga-page" style="display:flex; flex-direction:column;">
    <!-- Page header -->
    <div class="manga-page-header">
      <span>{{ $t('manga.siteLabel') }}</span>
      <span>{{ $t('manga.chapter.1') }}</span>
      <span>{{ $t('manga.pageLabel') }} 1</span>
    </div>

    <!-- Hero splash panel: fills remaining height -->
    <div class="mp" style="flex:1; border:none; border-top:3px solid #000; display:flex; overflow:hidden;">
      <!-- Speed lines radial from center-right -->
      <div class="manga-speed-radial" aria-hidden="true" />

      <!-- Halftone bottom-left -->
      <div
        class="manga-ht"
        style="bottom:0; left:0; width:45%; height:60%;"
        aria-hidden="true"
      />

      <!-- Kanji 開 huge background -->
      <div
        class="manga-kanji"
        style="bottom:-40px; right:-20px; font-size:clamp(160px, 30vw, 260px);"
        aria-hidden="true"
      >開</div>

      <!-- Status badge — top right -->
      <div style="position:absolute; top:16px; right:16px; width:clamp(120px,20vw,160px); z-index:2;">
        <div style="background:#000; color:#fff; padding:5px 10px; font-size:9px; font-family:'Courier New',monospace; letter-spacing:2px; text-align:center; margin-bottom:6px; border:3px solid #000;">
          FULL STACK DEV
        </div>
        <div style="border:3px solid #000; padding:8px 10px; font-size:9px; line-height:2; background:#fff; font-family:'Courier New',monospace;">
          Java · Spring Boot<br>
          Vue.js · Nuxt 4<br>
          Laravel · MySQL<br>
          Docker · AWS
        </div>
      </div>

      <!-- Name — large, top-left -->
      <div style="position:absolute; top:16px; left:20px; z-index:2;">
        <div class="manga-meta" style="margin-bottom:8px;">— {{ $t('meta.title') }} —</div>
        <div
          class="manga-title"
          style="font-size:clamp(36px, 8vw, 64px); line-height:0.85; letter-spacing:-3px;"
        >J.<br>FER<br>NAN<br>DO</div>
        <div style="font-size:14px; font-weight:600; color:#555; margin-top:8px; font-family:'Courier New',monospace; letter-spacing:1px;">
          {{ $t('hero.subtitle') }}
        </div>
      </div>

      <!-- Onomatopeia ドン！ bottom-left -->
      <div
        class="manga-sfx manga-sfx-hide-mobile"
        style="position:absolute; bottom:60px; left:16px; font-size:clamp(32px,7vw,56px); transform:rotate(-4deg); opacity:0.85;"
        aria-hidden="true"
      >ドン！</div>

      <!-- Speech bubble bottom-right -->
      <div
        class="manga-bubble"
        style="position:absolute; bottom:28px; right:16px; max-width:clamp(140px,25vw,180px); z-index:2;"
      >
        {{ $t('manga.bubble.hero') }}
      </div>

      <!-- CV download link — bottom-left, below SFX -->
      <button
        style="position:absolute; bottom:16px; left:16px; border:2px solid #000; background:#fff; padding:4px 10px; font-size:9px; font-family:'Courier New',monospace; letter-spacing:2px; cursor:pointer; z-index:2;"
        :disabled="isGenerating"
        @click="download"
      >
        {{ isGenerating ? $t('hero.generating') : $t('hero.downloadCv') }} ↓
      </button>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 1 —</div>
  </div>
</template>
```

- [ ] **Step 2: Verify the dev server renders Page 1 without console errors**

Run `pnpm dev` (or check the running dev server), switch to manga theme, and confirm page 1 renders:
- Black page header with chapter title and page number
- Name "J. FERNANDO" large, top-left
- Status badge top-right
- Speed lines in background
- ドン！ SFX bottom-left
- Speech bubble bottom-right

- [ ] **Step 3: Commit**

```bash
git add app/components/manga/MangaPage1Hero.vue
git commit -m "feat: add MangaPage1Hero — chapter 1 hero splash page"
```

---

## Task 5: Create MangaPage2Experience.vue

**Files:**
- Create: `app/components/manga/MangaPage2Experience.vue`

- [ ] **Step 1: Create the file**

Create `app/components/manga/MangaPage2Experience.vue`:

```vue
<script setup lang="ts">
const { tm, rt } = useI18n()

interface Promotion {
  from: string
  to: string
  date: string
}

interface Experience {
  company: string
  description: string
  role: string
  badge: string
  period: string
  tags: string[]
  promotion?: Promotion
  items: string[]
}

const experiences = computed(() => tm('experience.jobs') as Experience[])
</script>

<template>
  <div class="manga-page" style="display:flex; flex-direction:column;">
    <!-- Page header -->
    <div class="manga-page-header">
      <span>{{ $t('manga.siteLabel') }}</span>
      <span>{{ $t('manga.chapter.2') }}</span>
      <span>{{ $t('manga.pageLabel') }} 2</span>
    </div>

    <!-- Opening narration -->
    <div class="manga-narration" aria-hidden="true">{{ $t('manga.narration.experience') }}</div>

    <!-- Experience grid: 2fr · 1fr · 1fr, fills remaining height -->
    <div
      style="flex:1; display:grid; grid-template-columns:2fr 1fr 1fr; overflow:hidden;"
    >
      <!-- Job 0: current, larger panel -->
      <div
        v-if="experiences[0]"
        class="mp"
        style="border-top:none; border-bottom:none; border-left:none; border-right:3px solid #000; padding:14px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <!-- Halftone decoration -->
        <div class="manga-ht" style="bottom:0; right:0; width:50%; height:50%; opacity:0.5;" aria-hidden="true" />
        <!-- Kanji 現 (current) -->
        <div class="manga-kanji" style="bottom:-15px; right:-5px; font-size:clamp(60px,12vw,100px);" aria-hidden="true">現</div>

        <div class="manga-meta" style="margin-bottom:6px;">{{ $t('manga.missionLabel') }}</div>
        <div class="manga-title" style="font-size:clamp(16px,3vw,22px); margin-bottom:4px;">{{ rt(experiences[0].company) }}</div>
        <div style="font-size:9px; color:#555; font-family:'Courier New',monospace;">{{ rt(experiences[0].period) }}</div>
        <div style="margin-top:10px; font-size:9px; color:#333; line-height:1.7; font-family:'Courier New',monospace; position:relative; z-index:1;">
          {{ rt(experiences[0].role) }}<br>
          <span v-for="(tag, i) in experiences[0].tags.slice(0,4)" :key="i">{{ rt(tag) }}<span v-if="i < 3"> · </span></span>
        </div>
        <div
          v-if="experiences[0].items[0]"
          style="margin-top:10px; border-left:3px solid #000; padding-left:6px; font-size:9px; font-style:italic; color:#444; position:relative; z-index:1;"
        >
          "{{ rt(experiences[0].items[0]) }}"
        </div>
      </div>

      <!-- Job 1 -->
      <div
        v-if="experiences[1]"
        class="mp mp--gray"
        style="border-top:none; border-bottom:none; border-left:none; border-right:3px solid #000; padding:12px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <div class="manga-meta" style="margin-bottom:4px;">{{ $t('manga.previousLabel') }}</div>
        <div class="manga-title" style="font-size:clamp(13px,2.5vw,18px); margin-bottom:4px; line-height:1.1;">{{ rt(experiences[1].company) }}</div>
        <div style="font-size:9px; color:#555; font-family:'Courier New',monospace;">{{ rt(experiences[1].period) }}</div>
        <div style="margin-top:10px; font-size:9px; color:#444; line-height:1.7; font-family:'Courier New',monospace;">
          {{ rt(experiences[1].role) }}<br>
          <span v-for="(tag, i) in experiences[1].tags.slice(0,3)" :key="i">{{ rt(tag) }}<span v-if="i < 2"> · </span></span>
        </div>
        <div
          class="manga-thought"
          style="margin-top:auto; font-size:8px;"
        >
          "{{ rt(experiences[1].description).slice(0, 60) }}..."
        </div>
      </div>

      <!-- Job 2 -->
      <div
        v-if="experiences[2]"
        class="mp"
        style="border-top:none; border-bottom:none; border-left:none; border-right:none; padding:12px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <!-- Kanji 始 (beginning) -->
        <div class="manga-kanji" style="bottom:-10px; right:-5px; font-size:clamp(40px,8vw,70px);" aria-hidden="true">始</div>

        <div class="manga-meta" style="margin-bottom:4px;">{{ $t('manga.originLabel') }}</div>
        <div class="manga-title" style="font-size:clamp(13px,2.5vw,18px); margin-bottom:4px; line-height:1.1;">{{ rt(experiences[2].company) }}</div>
        <div style="font-size:9px; color:#555; font-family:'Courier New',monospace;">{{ rt(experiences[2].period) }}</div>
        <div style="margin-top:10px; font-size:9px; color:#444; line-height:1.7; font-family:'Courier New',monospace; position:relative; z-index:1;">
          {{ rt(experiences[2].role) }}<br>
          <span v-for="(tag, i) in experiences[2].tags.slice(0,3)" :key="i">{{ rt(tag) }}<span v-if="i < 2"> · </span></span>
        </div>
      </div>
    </div>

    <!-- SFX divider -->
    <div
      style="border-top:3px solid #000; padding:6px 14px; display:flex; justify-content:space-between; align-items:center; background:#fff; flex-shrink:0;"
    >
      <div class="manga-sfx manga-sfx-hide-mobile" style="font-size:24px; opacity:0.2; transform:rotate(-2deg);" aria-hidden="true">ズーン</div>
      <div class="manga-meta" style="letter-spacing:4px;">▼ {{ $t('manga.chapter.3').split('—')[1]?.trim() }}</div>
      <div class="manga-sfx manga-sfx-hide-mobile" style="font-size:24px; opacity:0.2; transform:rotate(2deg);" aria-hidden="true">バン</div>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 2 —</div>
  </div>
</template>
```

- [ ] **Step 2: Verify page 2 renders all 3 jobs with correct names and periods**

Switch to manga theme and scroll to page 2. Confirm:
- "Grupo NEPEN" in the large left panel with current period
- "Eficiência Fiscal" in middle gray panel
- "PROINFE" in right panel
- SFX bar at bottom with ズーン / バン

- [ ] **Step 3: Commit**

```bash
git add app/components/manga/MangaPage2Experience.vue
git commit -m "feat: add MangaPage2Experience — chapter 2 experience panel grid"
```

---

## Task 6: Create MangaPage3AboutTech.vue

**Files:**
- Create: `app/components/manga/MangaPage3AboutTech.vue`

- [ ] **Step 1: Create the file**

Create `app/components/manga/MangaPage3AboutTech.vue`:

```vue
<script setup lang="ts">
const { t } = useI18n()

const yearsCounter = useCounter(5, 1800)
const projectsCounter = useCounter(20, 1800)

const countersRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          yearsCounter.animate()
          projectsCounter.animate()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  if (countersRef.value) observer.observe(countersRef.value)
})

const techStack = {
  backend: ['Java', 'Spring Boot', 'Laravel', 'PHP'],
  frontend: ['Vue.js', 'Nuxt 4', 'TypeScript'],
  infra: ['Docker', 'AWS', 'MySQL', 'Postgres'],
}
</script>

<template>
  <div class="manga-page" style="display:flex; flex-direction:column;">
    <!-- Page header -->
    <div class="manga-page-header">
      <span>{{ $t('manga.siteLabel') }}</span>
      <span>{{ $t('manga.chapter.3') }}</span>
      <span>{{ $t('manga.pageLabel') }} 3</span>
    </div>

    <!-- Opening narration -->
    <div class="manga-narration" aria-hidden="true">{{ $t('manga.narration.aboutTech') }}</div>

    <!-- About row: 2fr left (bio) · 1fr right (counters) -->
    <div style="display:grid; grid-template-columns:2fr 1fr; border-bottom:3px solid #000; flex-shrink:0; height:45%;">
      <!-- About left: bio + speech bubble -->
      <div
        class="mp"
        style="border:none; border-right:3px solid #000; padding:14px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
      >
        <div class="manga-speed-radial" style="opacity:0.2;" aria-hidden="true" />
        <div class="manga-kanji" style="bottom:-20px; right:-10px; font-size:clamp(60px,10vw,110px);" aria-hidden="true">自</div>

        <div class="manga-narration" style="margin-bottom:10px; position:relative; z-index:1;">{{ $t('manga.profileLabel') }}</div>
        <p style="font-size:clamp(9px,1.2vw,11px); line-height:1.7; color:#000; position:relative; z-index:1; max-width:480px;">
          {{ $t('about.bio1') }}
        </p>
        <div
          class="manga-bubble"
          style="margin-top:auto; max-width:clamp(160px,30vw,260px); position:relative; z-index:1;"
        >
          {{ $t('manga.bubble.about') }}
        </div>
      </div>

      <!-- Counters right: dark panel -->
      <div
        ref="countersRef"
        class="mp mp--dark"
        style="border:none; padding:14px; display:flex; flex-direction:column; justify-content:center; gap:16px; overflow:hidden;"
      >
        <div class="manga-ht manga-ht--dark" style="inset:0; opacity:0.3;" aria-hidden="true" />
        <div style="text-align:center; position:relative; z-index:1;">
          <div style="font-size:clamp(28px,5vw,40px); font-weight:900; color:#fff; line-height:1;">+{{ yearsCounter.count.value }}</div>
          <div class="manga-meta" style="color:#888; margin-top:4px;">{{ $t('manga.yearsExp') }}</div>
        </div>
        <div style="border-top:1px solid #333; padding-top:16px; text-align:center; position:relative; z-index:1;">
          <div style="font-size:clamp(28px,5vw,40px); font-weight:900; color:#fff; line-height:1;">+{{ projectsCounter.count.value }}</div>
          <div class="manga-meta" style="color:#888; margin-top:4px;">{{ $t('manga.projects') }}</div>
        </div>
      </div>
    </div>

    <!-- Chapter divider -->
    <div class="manga-chapter-bar">— {{ $t('manga.arsenalLabel') }} —</div>

    <!-- Tech badges: fills rest -->
    <div
      class="mp"
      style="flex:1; border:none; border-top:3px solid #000; padding:14px; display:flex; flex-direction:column; justify-content:flex-start; overflow:hidden;"
    >
      <div class="manga-kanji" style="bottom:-20px; right:-10px; font-size:clamp(60px,10vw,120px);" aria-hidden="true">技</div>

      <div style="display:grid; grid-template-columns:auto 1fr; gap:12px; align-items:start; position:relative; z-index:1;">
        <div
          style="writing-mode:vertical-rl; font-size:9px; color:#888; letter-spacing:3px; font-family:'Courier New',monospace; border-right:2px solid #000; padding-right:6px; text-transform:uppercase;"
        >STACK</div>

        <div style="display:flex; flex-direction:column; gap:10px;">
          <div>
            <div class="manga-meta" style="margin-bottom:5px;">{{ $t('manga.backendLabel') }}</div>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              <span class="manga-badge-solid">{{ techStack.backend[0] }}</span>
              <span v-for="tech in techStack.backend.slice(1)" :key="tech" class="manga-badge-outline">{{ tech }}</span>
            </div>
          </div>
          <div>
            <div class="manga-meta" style="margin-bottom:5px;">{{ $t('manga.frontendLabel') }}</div>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              <span class="manga-badge-solid">{{ techStack.frontend[0] }}</span>
              <span v-for="tech in techStack.frontend.slice(1)" :key="tech" class="manga-badge-outline">{{ tech }}</span>
            </div>
          </div>
          <div>
            <div class="manga-meta" style="margin-bottom:5px;">{{ $t('manga.infraLabel') }}</div>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              <span v-for="tech in techStack.infra" :key="tech" class="manga-badge-outline">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 3 —</div>
  </div>
</template>
```

- [ ] **Step 2: Verify page 3 renders correctly**

Switch to manga theme and scroll to page 3. Confirm:
- About text visible in left panel
- Animated counters in dark right panel (should count up when scrolled into view)
- "— ARSENAL —" chapter bar between about and tech rows
- Three tech groups with badges (Backend bold/solid, others outlined)

- [ ] **Step 3: Commit**

```bash
git add app/components/manga/MangaPage3AboutTech.vue
git commit -m "feat: add MangaPage3AboutTech — chapter 3 profile and tech arsenal"
```

---

## Task 7: Create MangaPage4EducationContact.vue

**Files:**
- Create: `app/components/manga/MangaPage4EducationContact.vue`

- [ ] **Step 1: Create the file**

Create `app/components/manga/MangaPage4EducationContact.vue`:

```vue
<script setup lang="ts">
const { t, tm, rt } = useI18n()

interface EducationEntry {
  title: string
  abbr: string
  institution: string
  status: string
  description?: string
}

const entries = computed(() => tm('education.entries') as EducationEntry[])
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="manga-page" style="display:flex; flex-direction:column;">
    <!-- Page header -->
    <div class="manga-page-header">
      <span>{{ $t('manga.siteLabel') }}</span>
      <span>{{ $t('manga.chapter.4') }}</span>
      <span>{{ $t('manga.pageLabel') }} 4</span>
    </div>

    <!-- Opening narration -->
    <div class="manga-narration" aria-hidden="true">{{ $t('manga.narration.educationContact') }}</div>

    <!-- Main content: Education 3fr | Contact 2fr -->
    <div style="flex:1; display:grid; grid-template-columns:3fr 2fr; border-bottom:3px solid #000; overflow:hidden;">

      <!-- Education panel: white -->
      <div
        class="mp"
        style="border:none; border-right:3px solid #000; padding:14px; display:flex; flex-direction:column; overflow:hidden;"
      >
        <div class="manga-ht" style="bottom:0; right:0; width:50%; height:50%; opacity:0.3;" aria-hidden="true" />
        <div class="manga-kanji" style="bottom:-20px; right:-10px; font-size:clamp(60px,10vw,120px);" aria-hidden="true">学</div>

        <div class="manga-meta" style="margin-bottom:12px;">{{ $t('manga.formationLabel') }}</div>

        <!-- Education entries with descending border weight -->
        <div
          v-for="(entry, index) in entries"
          :key="index"
          style="margin-bottom:14px; position:relative; z-index:1;"
          :style="{ borderLeft: index === 0 ? '4px solid #000' : index === 1 ? '2px solid #888' : '1px dashed #bbb', paddingLeft: '10px' }"
        >
          <div
            style="font-size:clamp(11px,2vw,14px); font-weight:900; font-family:serif; line-height:1.2; margin-bottom:3px;"
            :style="{ color: index === 0 ? '#000' : index === 1 ? '#333' : '#666' }"
          >
            {{ rt(entry.title) }}
          </div>
          <div style="font-size:9px; font-family:'Courier New',monospace;" :style="{ color: index === 0 ? '#555' : '#999' }">
            {{ rt(entry.institution) }} · {{ rt(entry.status) }}
          </div>
          <div
            v-if="entry.description && index === 0"
            style="font-size:9px; color:#555; margin-top:4px; line-height:1.5; font-style:italic;"
          >
            {{ rt(entry.description).slice(0, 80) }}...
          </div>
        </div>
      </div>

      <!-- Contact panel: dark -->
      <div
        class="mp mp--dark"
        style="border:none; padding:14px; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;"
      >
        <div class="manga-ht manga-ht--dark" style="bottom:0; right:0; width:60%; height:60%; opacity:0.4;" aria-hidden="true" />
        <div class="manga-kanji" style="bottom:-10px; right:-5px; font-size:clamp(40px,7vw,70px);" aria-hidden="true">連</div>

        <div style="position:relative; z-index:1;">
          <div class="manga-meta" style="color:#888; margin-bottom:12px;">{{ $t('manga.contactLabel') }}</div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <a
              href="https://github.com/jfernandodev"
              target="_blank"
              rel="noopener noreferrer"
              style="font-size:clamp(9px,1.5vw,11px); font-weight:bold; color:#fff; display:flex; align-items:center; gap:6px; text-decoration:none;"
            >
              <span style="border:1px solid #555; padding:1px 5px; font-size:8px; color:#888; font-family:'Courier New',monospace;">GH</span>
              github.com/jfernandodev
            </a>
            <a
              href="https://linkedin.com/in/jfernandodev"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('contact.linkedinAria')"
              style="font-size:clamp(9px,1.5vw,11px); font-weight:bold; color:#fff; display:flex; align-items:center; gap:6px; text-decoration:none;"
            >
              <span style="border:1px solid #555; padding:1px 5px; font-size:8px; color:#888; font-family:'Courier New',monospace;">LI</span>
              linkedin.com/in/jfernandodev
            </a>
          </div>
        </div>

        <!-- CTA button -->
        <div style="position:relative; z-index:1; margin-top:16px;">
          <a
            href="https://linkedin.com/in/jfernandodev"
            target="_blank"
            rel="noopener noreferrer"
            style="display:block; border:3px solid #fff; text-align:center; padding:8px; font-size:11px; font-weight:900; color:#fff; letter-spacing:2px; text-decoration:none; font-family:'Courier New',monospace; position:relative;"
          >
            {{ $t('manga.sendMessage') }} →
            <span style="position:absolute; inset:-5px; border:1px solid #333; pointer-events:none;" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </div>

    <!-- Closing narration -->
    <div
      style="padding:10px 14px; background:#fff; display:flex; align-items:center; justify-content:space-between; border-top:3px solid #000; flex-shrink:0;"
    >
      <div class="manga-sfx manga-sfx-hide-mobile" style="font-size:32px; opacity:0.1; transform:rotate(-3deg);" aria-hidden="true">終</div>
      <div class="manga-narration" style="flex:1; margin:0 12px; text-align:center;">{{ $t('manga.closing') }}</div>
      <div style="font-size:11px; color:#bbb; font-family:'Courier New',monospace; white-space:nowrap;">© {{ currentYear }}</div>
    </div>

    <div class="manga-page-num" aria-hidden="true">— 4 —</div>
  </div>
</template>
```

- [ ] **Step 2: Verify the GitHub URL and update if needed**

The GitHub link uses `https://github.com/jfernandodev` (matching the LinkedIn handle pattern). If the actual GitHub username differs, update the `href` in the file before proceeding.

- [ ] **Step 3: Verify page 4 renders correctly**

Scroll to page 4. Confirm:
- All 3 education entries visible with descending border weight (thick solid → medium solid → thin dashed)
- Dark contact panel with GitHub + LinkedIn links
- CTA button with double-border effect
- Closing narration bar at bottom with 終 kanji

- [ ] **Step 4: Commit**

```bash
git add app/components/manga/MangaPage4EducationContact.vue
git commit -m "feat: add MangaPage4EducationContact — chapter 4 education and contact"
```

---

## Task 8: Delete Old Manga Section Components

**Files:**
- Delete: `app/components/manga/MangaHeroSection.vue`
- Delete: `app/components/manga/MangaAboutSection.vue`
- Delete: `app/components/manga/MangaExperienceSection.vue`
- Delete: `app/components/manga/MangaTechStackSection.vue`
- Delete: `app/components/manga/MangaEducationSection.vue`
- Delete: `app/components/manga/MangaContactSection.vue`

- [ ] **Step 1: Delete the old files**

```bash
rm app/components/manga/MangaHeroSection.vue \
   app/components/manga/MangaAboutSection.vue \
   app/components/manga/MangaExperienceSection.vue \
   app/components/manga/MangaTechStackSection.vue \
   app/components/manga/MangaEducationSection.vue \
   app/components/manga/MangaContactSection.vue
```

- [ ] **Step 2: Verify no imports reference old components**

```bash
grep -r "MangaHeroSection\|MangaAboutSection\|MangaExperienceSection\|MangaTechStackSection\|MangaEducationSection\|MangaContactSection" app/
```
Expected: no output. If any file references these, remove those imports/usages.

- [ ] **Step 3: Run typecheck to confirm no broken references**

```bash
pnpm run typecheck
```
Expected: exits with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: delete old manga section components (replaced by MangaPage* components)"
```

---

## Task 9: Final Visual Verification

**Files:** None — verification only

- [ ] **Step 1: Start dev server and open the site**

```bash
pnpm dev
```
Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Verify violet theme is untouched**

Confirm violet theme loads normally with all 6 original sections (Hero, About, Experience, TechStack, Education, Contact).

- [ ] **Step 3: Switch to manga theme and verify all 4 pages**

Click the theme toggle. Confirm the ink splash transition fires. Then verify:

| Check | Expected |
|-------|----------|
| Page 1 | Black header "CAP. 1 — O DESENVOLVEDOR · PAG. 1", name large, speed lines, SFX ドン！, speech bubble |
| Page 2 | Header CAP. 2, narration bar, 3 jobs side-by-side (Grupo NEPEN biggest), SFX footer |
| Page 3 | Header CAP. 3, about bio left, counters dark panel right, chapter bar, tech badges by group |
| Page 4 | Header CAP. 4, education entries with descending borders, dark contact panel, CTA button, closing narration |
| Scroll | Each scroll snaps cleanly to the next page |
| Mobile | Stack visible without broken layout, SFX elements hidden |

- [ ] **Step 4: Switch back to violet theme and verify panel shatter fires correctly**

Click toggle again. Confirm panel shatter animation fires and violet theme loads.

- [ ] **Step 5: Final commit if any visual tweaks were needed**

```bash
git add -A
git commit -m "fix: manga theme final visual adjustments"
```
(Only if tweaks were needed; skip if everything looked correct in Step 3.)
