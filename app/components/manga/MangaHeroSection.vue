<script setup lang="ts">
const { displayedText, isComplete, showCursor } = useTypingEffect('JOSÉ FERNANDO', 100, 500)
const { scrollY } = useScrollProgress()
const { download, isGenerating } = useDownloadCv()
</script>

<template>
  <section id="hero" class="relative min-h-dvh flex items-center overflow-hidden bg-[#0a0a0a] border-b-2 border-white">
    <!-- Manga decorations -->
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
