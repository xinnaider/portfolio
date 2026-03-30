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
