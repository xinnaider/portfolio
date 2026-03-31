<script setup lang="ts">
const { displayedText, isComplete, showCursor } = useTypingEffect('JOSÉ FERNANDO', 100, 500)
const { scrollY } = useScrollProgress()
const { mouseX, mouseY } = useMouseParallax()
const { download, isGenerating } = useDownloadCv()
</script>

<template>
  <section class="relative min-h-dvh bg-surface-black flex items-center overflow-hidden">
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

    <div
      class="absolute right-[-40px] font-display font-extrabold text-[40px] sm:text-[80px] md:text-[120px] lg:text-[200px] text-white/[0.03] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :style="{ top: `calc(50% + ${scrollY * -0.15}px)`, transform: 'translateY(-50%)' }"
    >
      DEVELOPER
    </div>

    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 40px 40px;"
    />
    <div
      class="absolute top-[12%] left-[8%] w-12 md:w-20 h-12 md:h-20 border border-white/[0.06] rounded-full"
      :style="{ transform: `translate(${mouseX * 15}px, ${scrollY * 0.08 + mouseY * 10}px)` }"
      style="animation: float-1 6s ease-in-out infinite"
    />
    <div
      class="absolute top-[65%] right-[12%] w-6 md:w-10 h-6 md:h-10 bg-accent/[0.06] rotate-45"
      :style="{ transform: `translate(${mouseX * -10}px, ${scrollY * -0.1 + mouseY * -8}px) rotate(45deg)` }"
      style="animation: float-2 8s ease-in-out infinite"
    />
    <div
      class="hidden md:block absolute top-[28%] right-[20%] w-32 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      :style="{ transform: `translate(${mouseX * 8}px, ${scrollY * 0.05 + mouseY * 5}px)` }"
      style="animation: float-3 5s ease-in-out infinite"
    />
    <div
      class="absolute bottom-[25%] left-[18%] w-4 md:w-6 h-4 md:h-6 border border-accent/[0.15] rotate-12"
      :style="{ transform: `translate(${mouseX * -12}px, ${scrollY * -0.06 + mouseY * -6}px) rotate(12deg)` }"
      style="animation: float-2 7s ease-in-out infinite"
    />
    <div
      class="hidden lg:block absolute top-[18%] right-[6%] w-4 h-4 rounded-full bg-accent/20"
      :style="{ transform: `translate(${mouseX * 20}px, ${scrollY * 0.04 + mouseY * 12}px)` }"
      style="animation: float-1 4s ease-in-out infinite; animation-name: pulse-glow, float-1;"
    />
    <svg
      class="hidden md:block absolute top-[40%] left-[5%] w-24 h-24 opacity-[0.04]"
      :style="{ transform: `translate(${mouseX * 10}px, ${mouseY * 8}px)` }"
      style="animation: spin-slow 30s linear infinite"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="8 4" />
    </svg>
    <div
      class="hidden md:block absolute bottom-[15%] right-[25%] opacity-[0.06]"
      :style="{ transform: `translate(${mouseX * -8}px, ${mouseY * 6}px)` }"
      style="animation: float-3 9s ease-in-out infinite"
    >
      <div class="w-8 h-[1px] bg-white absolute top-1/2 left-0" />
      <div class="w-[1px] h-8 bg-white absolute left-1/2 top-0" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-28 md:pt-32 pb-20 w-full">
      <p class="text-accent font-sans font-semibold text-xs sm:text-sm tracking-[2px] sm:tracking-[4px] uppercase mb-4">
        {{ $t('hero.subtitle') }}
      </p>

      <h1 class="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-white leading-[0.9] tracking-tighter">
        {{ displayedText }}<span
          v-if="showCursor"
          class="inline-block w-[3px] h-[0.85em] bg-accent ml-1 align-middle"
          style="animation: blink 0.8s step-end infinite"
        />
      </h1>

      <div
        v-if="isComplete"
        class="h-[3px] bg-accent mt-6"
        style="animation: grow-line 0.4s ease-out forwards"
      />

      <p class="text-white/70 text-sm sm:text-base md:text-lg mt-6 sm:mt-8 max-w-lg leading-relaxed">
        {{ $t('hero.description') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-10">
        <div>
          <p class="text-text-muted text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] mb-1">{{ $t('hero.locationLabel') }}</p>
          <p class="text-white text-sm sm:text-base">{{ $t('hero.locationValue') }}</p>
        </div>
        <div>
          <p class="text-text-muted text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] mb-1">{{ $t('hero.connect') }}</p>
          <a
            href="https://linkedin.com/in/jfernandodev"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-white hover:text-accent transition-colors duration-200 text-sm sm:text-base"
            :aria-label="$t('hero.linkedinAria')"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            linkedin.com/in/jfernandodev
          </a>
        </div>
        <div>
          <p class="text-text-muted text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] mb-1">GitHub</p>
          <a
            href="https://github.com/xinnaider"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-white hover:text-accent transition-colors duration-200 text-sm sm:text-base"
            :aria-label="$t('hero.githubAria')"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            github.com/xinnaider
          </a>
        </div>
        <div>
          <p class="text-text-muted text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] mb-1">{{ $t('hero.resume') }}</p>
          <button
            class="inline-flex items-center gap-2 text-white hover:text-accent transition-colors duration-200 text-sm sm:text-base"
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
      <span class="text-text-muted-dark text-xs tracking-widest uppercase">{{ $t('hero.scroll') }}</span>
      <div
        class="w-[1px] h-8 bg-text-muted-dark/50"
        style="animation: bounce-down 2s ease-in-out infinite"
      />
    </div>
  </section>
</template>
