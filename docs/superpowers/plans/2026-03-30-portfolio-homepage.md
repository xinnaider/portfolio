# Portfolio Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio homepage for José Fernando with "Blocos Invertidos" style — alternating black/white/gray sections, Syne + Space Grotesk typography, violet (#8b5cf6) accent, with typing effect, scroll-reveal, animated counters, and floating parallax elements.

**Architecture:** Pure Tailwind CSS + Vue 3 Composition API on Nuxt 4. Three composables handle animation logic (scroll-reveal, typing, counters). Seven section components compose the page. CSS @keyframes handle floating elements and cursor blink. IntersectionObserver triggers scroll-based animations.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Google Fonts (Syne, Space Grotesk)

---

## File Structure

```
app/
├── app.vue                      # Root — uses NuxtPage
├── app.config.ts                # Nuxt UI colors (update primary to violet)
├── assets/css/main.css          # Global styles, fonts, keyframes, theme tokens
├── composables/
│   ├── useScrollReveal.ts       # IntersectionObserver scroll-reveal + stagger
│   ├── useTypingEffect.ts       # Character-by-character typing animation
│   └── useCounter.ts            # Animated number counter
├── components/
│   ├── NavBar.vue               # Fixed nav with logo + section links
│   ├── HeroSection.vue          # Hero with typing, floating shapes, bg texture
│   ├── AboutSection.vue         # Bio + animated counters
│   ├── ExperienceSection.vue    # Timeline with alternating cards
│   ├── TechStackSection.vue     # Category grid with tag pills
│   ├── EducationSection.vue     # Simple formation section
│   └── ContactSection.vue       # CTA + LinkedIn + footer
├── pages/
│   └── index.vue                # Composes all sections
```

---

### Task 1: Project Setup — Fonts, Tailwind Theme, Config

**Files:**
- Modify: `app/assets/css/main.css`
- Modify: `app/app.config.ts`
- Modify: `nuxt.config.ts`
- Modify: `app/app.vue`

- [ ] **Step 1: Update `nuxt.config.ts`** to add Google Fonts and configure the app

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&display=swap'
        }
      ],
      meta: [
        { name: 'description', content: 'José Fernando Gomes Marcial — Desenvolvedor Full Stack' }
      ]
    }
  }
})
```

- [ ] **Step 2: Update `app/app.config.ts`** to set violet as primary color

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'violet',
      neutral: 'neutral'
    }
  }
})
```

- [ ] **Step 3: Rewrite `app/assets/css/main.css`** with global theme, fonts, and keyframe animations

```css
@import "tailwindcss";

@theme static {
  --font-sans: 'Space Grotesk', sans-serif;
  --font-display: 'Syne', sans-serif;

  --color-accent: #8b5cf6;
  --color-accent-light: #a78bfa;

  --color-surface-black: #000000;
  --color-surface-dark: #0a0a0a;
  --color-surface-light: #f5f5f5;
  --color-surface-white: #ffffff;

  --color-border-dark: #1a1a1a;
  --color-border-light: #e5e5e5;

  --color-text-muted: #999999;
  --color-text-muted-dark: #666666;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Scroll reveal base state */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Floating animation for hero shapes */
@keyframes float-1 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-3deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(8deg); }
}

/* Typing cursor blink */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Accent line grow */
@keyframes grow-line {
  from { width: 0; }
  to { width: 60px; }
}

/* Scroll indicator bounce */
@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Update `app/app.vue`** to use NuxtPage with layout

```vue
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
```

- [ ] **Step 5: Delete unused template components**

Delete `app/components/AppLogo.vue` and `app/components/TemplateMenu.vue` — they're Nuxt starter template leftovers.

- [ ] **Step 6: Commit**

```bash
git add app/assets/css/main.css app/app.config.ts nuxt.config.ts app/app.vue
git rm app/components/AppLogo.vue app/components/TemplateMenu.vue
git commit -m "feat: setup project with fonts, tailwind theme, and keyframe animations"
```

---

### Task 2: Composables — useScrollReveal, useTypingEffect, useCounter

**Files:**
- Create: `app/composables/useScrollReveal.ts`
- Create: `app/composables/useTypingEffect.ts`
- Create: `app/composables/useCounter.ts`

- [ ] **Step 1: Create `app/composables/useScrollReveal.ts`**

```ts
export function useScrollReveal() {
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const staggerIndex = el.dataset.stagger
            const delay = staggerIndex ? parseInt(staggerIndex) * 100 : 0

            setTimeout(() => {
              el.classList.add('visible')
            }, delay)

            observer.value?.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.value?.observe(el)
    })
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  function observeNew(container?: HTMLElement) {
    const root = container || document
    root.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
      observer.value?.observe(el)
    })
  }

  return { observeNew }
}
```

- [ ] **Step 2: Create `app/composables/useTypingEffect.ts`**

```ts
export function useTypingEffect(text: string, speed = 80, delay = 500) {
  const displayedText = ref('')
  const isComplete = ref(false)
  const showCursor = ref(true)

  onMounted(() => {
    setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          displayedText.value += text[i]
          i++
        } else {
          clearInterval(interval)
          isComplete.value = true
          // Keep cursor blinking for a bit, then hide
          setTimeout(() => {
            showCursor.value = false
          }, 2000)
        }
      }, speed)
    }, delay)
  })

  return { displayedText, isComplete, showCursor }
}
```

- [ ] **Step 3: Create `app/composables/useCounter.ts`**

```ts
export function useCounter(target: number, duration = 2000) {
  const count = ref(0)
  const hasAnimated = ref(false)

  function animate() {
    if (hasAnimated.value) return
    hasAnimated.value = true

    const startTime = performance.now()

    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out: decelerates
      const eased = 1 - Math.pow(1 - progress, 3)

      count.value = Math.round(eased * target)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  return { count, animate }
}
```

- [ ] **Step 4: Commit**

```bash
git add app/composables/useScrollReveal.ts app/composables/useTypingEffect.ts app/composables/useCounter.ts
git commit -m "feat: add composables for scroll-reveal, typing effect, and counters"
```

---

### Task 3: NavBar Component

**Files:**
- Create: `app/components/NavBar.vue`

- [ ] **Step 1: Create `app/components/NavBar.vue`**

```vue
<script setup lang="ts">
const links = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Tech', href: '#tech' },
  { label: 'Contato', href: '#contato' }
]

const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-surface-black/90 backdrop-blur-sm border-b border-border-dark' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
      <a href="#" class="font-display font-extrabold text-xl text-white tracking-tight">
        FERNANDO<span class="text-accent">.</span>
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm text-text-muted hover:text-accent transition-colors duration-200"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Mobile: simple horizontal scroll links -->
      <div class="flex md:hidden items-center gap-5">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-xs text-text-muted hover:text-accent transition-colors duration-200 whitespace-nowrap"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/NavBar.vue
git commit -m "feat: add fixed NavBar with scroll transparency effect"
```

---

### Task 4: HeroSection Component

**Files:**
- Create: `app/components/HeroSection.vue`

- [ ] **Step 1: Create `app/components/HeroSection.vue`**

```vue
<script setup lang="ts">
const { displayedText, isComplete, showCursor } = useTypingEffect('JOSÉ FERNANDO', 100, 500)

const scrollY = ref(0)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY
  })
})
</script>

<template>
  <section class="relative min-h-screen bg-surface-black flex items-center overflow-hidden">
    <!-- Background texture text -->
    <div
      class="absolute right-[-40px] top-1/2 -translate-y-1/2 font-display font-extrabold text-[120px] lg:text-[180px] text-white/[0.03] tracking-tighter whitespace-nowrap select-none pointer-events-none"
    >
      DEVELOPER
    </div>

    <!-- Floating geometric shapes -->
    <div
      class="absolute top-[15%] left-[10%] w-16 h-16 border border-white/[0.08] rounded-full"
      :style="{ transform: `translateY(${scrollY * 0.05}px)` }"
      style="animation: float-1 6s ease-in-out infinite"
    />
    <div
      class="absolute top-[60%] right-[15%] w-8 h-8 bg-white/[0.05] rotate-45"
      :style="{ transform: `translateY(${scrollY * -0.08}px) rotate(45deg)` }"
      style="animation: float-2 8s ease-in-out infinite"
    />
    <div
      class="absolute top-[30%] right-[25%] w-24 h-[1px] bg-white/[0.06]"
      :style="{ transform: `translateY(${scrollY * 0.03}px)` }"
      style="animation: float-3 5s ease-in-out infinite"
    />
    <div
      class="absolute bottom-[20%] left-[20%] w-6 h-6 border border-white/[0.06]"
      :style="{ transform: `translateY(${scrollY * -0.06}px)` }"
      style="animation: float-2 7s ease-in-out infinite"
    />
    <div
      class="hidden lg:block absolute top-[20%] right-[8%] w-3 h-3 rounded-full bg-accent/20"
      :style="{ transform: `translateY(${scrollY * 0.04}px)` }"
      style="animation: float-1 4s ease-in-out infinite"
    />

    <!-- Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
      <p class="text-accent font-sans font-semibold text-sm tracking-[4px] uppercase mb-4">
        Full Stack Developer
      </p>

      <h1 class="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-none tracking-tighter">
        {{ displayedText }}<span
          v-if="showCursor"
          class="inline-block w-[3px] h-[0.85em] bg-accent ml-1 align-middle"
          style="animation: blink 0.8s step-end infinite"
        />
      </h1>

      <!-- Accent line -->
      <div
        v-if="isComplete"
        class="h-[3px] bg-accent mt-6"
        style="animation: grow-line 0.4s ease-out forwards"
      />

      <p class="text-text-muted text-base mt-6">
        São Paulo – SP, Brasil
      </p>

      <a
        href="https://linkedin.com/in/jfernandodev"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors duration-200 mt-3 text-sm"
        aria-label="LinkedIn de José Fernando"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        linkedin.com/in/jfernandodev
      </a>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span class="text-text-muted-dark text-xs tracking-widest uppercase">Scroll</span>
      <div
        class="w-[1px] h-8 bg-text-muted-dark/50"
        style="animation: bounce-down 2s ease-in-out infinite"
      />
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/HeroSection.vue
git commit -m "feat: add HeroSection with typing effect, floating shapes, and parallax"
```

---

### Task 5: AboutSection Component

**Files:**
- Create: `app/components/AboutSection.vue`

- [ ] **Step 1: Create `app/components/AboutSection.vue`**

```vue
<script setup lang="ts">
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
</script>

<template>
  <section id="sobre" class="bg-surface-white py-24 lg:py-32">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl text-black tracking-tight mb-10">
        SOBRE
      </h2>

      <p class="reveal text-black/80 text-lg leading-relaxed max-w-2xl" data-stagger="1">
        Sou apaixonado por tecnologia desde cedo — comecei a explorar computadores ainda na infância
        e desde então mantenho uma forte curiosidade por entender como sistemas e tecnologias funcionam.
        Desenvolvi um perfil autodidata, sempre buscando aprender na prática, testar soluções e
        aprofundar conhecimentos. Gosto de resolver problemas complexos, enfrentar desafios técnicos
        e trabalhar em ambientes que incentivem aprendizado contínuo e evolução profissional.
      </p>

      <!-- Counters -->
      <div
        ref="countersRef"
        class="reveal grid grid-cols-3 gap-8 mt-16 max-w-xl"
        data-stagger="2"
      >
        <div>
          <span class="font-display font-extrabold text-5xl text-black">+{{ yearsCounter.count.value }}</span>
          <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Anos de experiência</p>
        </div>
        <div>
          <span class="font-display font-extrabold text-5xl text-black">{{ companiesCounter.count.value }}</span>
          <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Empresas</p>
        </div>
        <div>
          <span class="font-display font-extrabold text-5xl text-black">{{ languagesCounter.count.value }}+</span>
          <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Linguagens</p>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/AboutSection.vue
git commit -m "feat: add AboutSection with animated counters"
```

---

### Task 6: ExperienceSection Component

**Files:**
- Create: `app/components/ExperienceSection.vue`

- [ ] **Step 1: Create `app/components/ExperienceSection.vue`**

```vue
<script setup lang="ts">
const experiences = [
  {
    company: 'Grupo NEPEN',
    role: 'Desenvolvedor Full Stack',
    period: 'Mai 2024 – Atual',
    items: [
      'Desenvolvimento e manutenção de serviços utilizando Vue.js, Java, Spring Boot e .NET em arquitetura de microsserviços com Eureka e API Gateway.',
      'Implementação de comunicação assíncrona utilizando RabbitMQ.',
      'Integração com dispositivos utilizando protocolos SNMP e LwM2M.',
      'Atuação em sistemas de alto volume de dados e alta disponibilidade.',
      'Contato com clientes para levantamento de requisitos e alinhamentos técnicos.'
    ]
  },
  {
    company: 'Eficiência Fiscal',
    role: 'Pleno Fullstack Developer',
    period: 'Jul 2022 – Abr 2024',
    items: [
      'Desenvolvimento e manutenção de funcionalidades utilizando Laravel, PHP, JavaScript, Python, Java e Electron.',
      'Implementação de rotinas de web scraping para extração automatizada de dados em portais fiscais.',
      'Desenvolvimento de funcionalidades para download, processamento e integração de documentos fiscais.',
      'Atuação em atividades de DevOps e manutenção da infraestrutura da aplicação.',
      'Participação na migração de banco de dados de grande porte (~4TB).'
    ]
  },
  {
    company: 'PROINFE',
    role: 'Full Stack Developer',
    period: 'Fev 2022 – Jul 2022',
    items: [
      'Desenvolvimento de frontend utilizando Next.js e Material UI.',
      'Implementação de backend utilizando Nest.js em arquitetura de microsserviços.',
      'Utilização de Docker para criação e gerenciamento de contêineres.',
      'Organização de serviços containerizados para suporte ao desenvolvimento da aplicação.'
    ]
  }
]
</script>

<template>
  <section id="experiencia" class="relative bg-surface-dark py-24 lg:py-32 overflow-hidden">
    <!-- Background texture -->
    <div class="absolute left-[-20px] top-1/2 -translate-y-1/2 font-display font-extrabold text-[100px] lg:text-[140px] text-white/[0.03] tracking-tighter whitespace-nowrap select-none pointer-events-none">
      EXPERIÊNCIA
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight mb-16">
        EXPERIÊNCIA
      </h2>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line (desktop only) -->
        <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-accent/30" />

        <div class="space-y-12 lg:space-y-16">
          <div
            v-for="(exp, index) in experiences"
            :key="exp.company"
            class="reveal relative"
            :data-stagger="index"
          >
            <!-- Timeline dot (desktop) -->
            <div class="hidden lg:block absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-accent z-10" />

            <!-- Card -->
            <div
              class="lg:w-[calc(50%-40px)] bg-border-dark/50 border border-border-dark rounded-lg p-6 hover:border-accent/30 transition-colors duration-200"
              :class="index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'"
            >
              <h3 class="font-display font-bold text-xl text-white">{{ exp.company }}</h3>
              <p class="text-accent text-sm mt-1">{{ exp.role }}</p>
              <p class="text-text-muted text-xs uppercase tracking-widest mt-1">{{ exp.period }}</p>

              <ul class="mt-4 space-y-2">
                <li
                  v-for="item in exp.items"
                  :key="item"
                  class="text-white/70 text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-[6px] before:h-[1px] before:bg-accent"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/ExperienceSection.vue
git commit -m "feat: add ExperienceSection with timeline layout"
```

---

### Task 7: TechStackSection Component

**Files:**
- Create: `app/components/TechStackSection.vue`

- [ ] **Step 1: Create `app/components/TechStackSection.vue`**

```vue
<script setup lang="ts">
const categories = [
  {
    label: 'Linguagens',
    items: ['Java', 'PHP', 'JavaScript', 'Python', 'Node.js', 'C# (.NET)']
  },
  {
    label: 'Frameworks',
    items: ['Spring Boot', 'Laravel', 'Nest.js', 'Vue.js', 'Next.js', 'Electron']
  },
  {
    label: 'Arquitetura',
    items: ['Microservices', 'REST APIs', 'RabbitMQ', 'API Gateway', 'Eureka']
  },
  {
    label: 'Infra & Outros',
    items: ['Docker', 'DevOps', 'Web Scraping', 'SNMP', 'LwM2M']
  }
]
</script>

<template>
  <section id="tech" class="bg-surface-light py-24 lg:py-32">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl text-black tracking-tight mb-16">
        TECNOLOGIAS
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div
          v-for="(category, catIndex) in categories"
          :key="category.label"
          class="reveal"
          :data-stagger="catIndex"
        >
          <h3 class="text-text-muted text-xs uppercase tracking-[3px] mb-4">
            {{ category.label }}
          </h3>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="(item, itemIndex) in category.items"
              :key="item"
              class="reveal px-4 py-2 bg-white border border-border-light rounded-full text-sm text-black/70 hover:border-accent hover:text-accent transition-colors duration-200 cursor-default"
              :data-stagger="catIndex * 2 + itemIndex"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/TechStackSection.vue
git commit -m "feat: add TechStackSection with categorized tag pills"
```

---

### Task 8: EducationSection Component

**Files:**
- Create: `app/components/EducationSection.vue`

- [ ] **Step 1: Create `app/components/EducationSection.vue`**

```vue
<template>
  <section class="bg-surface-black py-24 lg:py-32">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight mb-10">
        FORMAÇÃO
      </h2>

      <div class="reveal" data-stagger="1">
        <p class="font-display font-bold text-2xl text-white">
          Análise e Desenvolvimento de Sistemas
        </p>
        <p class="text-text-muted text-base mt-2">
          Instituto Federal de Rondônia (IFRO)
        </p>
        <div class="w-[60px] h-[3px] bg-accent mt-6" />
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/EducationSection.vue
git commit -m "feat: add EducationSection"
```

---

### Task 9: ContactSection Component

**Files:**
- Create: `app/components/ContactSection.vue`

- [ ] **Step 1: Create `app/components/ContactSection.vue`**

```vue
<template>
  <section id="contato" class="bg-surface-white py-24 lg:py-32">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="reveal font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-black tracking-tighter">
        VAMOS<br>CONVERSAR
      </h2>

      <div class="reveal mt-10" data-stagger="1">
        <a
          href="https://linkedin.com/in/jfernandodev"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 text-black hover:text-accent transition-colors duration-200 text-lg font-semibold"
          aria-label="LinkedIn de José Fernando"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          linkedin.com/in/jfernandodev
        </a>

        <p class="text-text-muted mt-4">
          São Paulo – SP, Brasil
        </p>
      </div>

      <!-- Footer -->
      <div class="reveal mt-20 pt-8 border-t border-border-light" data-stagger="2">
        <p class="text-text-muted text-sm">
          &copy; {{ new Date().getFullYear() }} José Fernando Gomes Marcial
        </p>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/ContactSection.vue
git commit -m "feat: add ContactSection with LinkedIn link and footer"
```

---

### Task 10: Compose Page — Wire All Sections in index.vue

**Files:**
- Modify: `app/pages/index.vue`

- [ ] **Step 1: Rewrite `app/pages/index.vue`** to compose all sections

```vue
<script setup lang="ts">
useHead({
  title: 'José Fernando Gomes Marcial — Full Stack Developer'
})

useScrollReveal()
</script>

<template>
  <div>
    <NavBar />
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <TechStackSection />
    <EducationSection />
    <ContactSection />
  </div>
</template>
```

- [ ] **Step 2: Run the dev server and verify the page renders**

Run: `npm run dev`

Expected: Page loads at `http://localhost:3000` with all 6 sections visible, typing effect plays in hero, scroll-reveal triggers as you scroll, counters animate in the About section, floating shapes move in the hero.

- [ ] **Step 3: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat: compose homepage with all sections and scroll-reveal"
```

---

### Task 11: Visual Polish and Responsive Fixes

**Files:**
- Potentially modify any component based on visual testing

- [ ] **Step 1: Test on mobile viewport (375px wide)**

Open dev tools → responsive mode → 375px. Verify:
- Nav links are visible and tappable
- Hero name renders at smaller size (~32px)
- Counters stack properly on small screens
- Timeline cards are full-width (no alternating)
- Tech tags wrap correctly
- No horizontal scroll

- [ ] **Step 2: Test scroll-reveal timing**

Scroll through the entire page. Verify:
- Each section's elements fade in as they enter the viewport
- Stagger delays create a cascading effect
- Elements don't re-animate when scrolling back up

- [ ] **Step 3: Test prefers-reduced-motion**

In dev tools → Rendering → check "Emulate CSS media feature prefers-reduced-motion: reduce". Verify:
- No animations play
- All content is immediately visible
- Typing effect shows full name without animation

- [ ] **Step 4: Fix any issues found and commit**

```bash
git add -u
git commit -m "fix: visual polish and responsive adjustments"
```
