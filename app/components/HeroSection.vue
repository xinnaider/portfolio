<script setup lang="ts">
const { displayedText, isComplete, showCursor } = useTypingEffect('JOSÉ FERNANDO', 100, 500)
const { scrollY } = useScrollProgress()
const { mouseX, mouseY } = useMouseParallax()
</script>

<template>
  <section class="relative min-h-screen bg-surface-black flex items-center overflow-hidden">
    <!-- Animated gradient orb -->
    <div
      class="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
      :style="{
        background: 'radial-gradient(circle, #8b5cf6, #3b82f6, transparent)',
        left: `calc(60% + ${mouseX * 30}px)`,
        top: `calc(30% + ${mouseY * 30}px)`,
        transition: 'left 0.3s ease-out, top 0.3s ease-out'
      }"
    />

    <!-- Second orb -->
    <div
      class="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
      :style="{
        background: 'radial-gradient(circle, #a78bfa, transparent)',
        left: `calc(20% + ${mouseX * -20}px)`,
        top: `calc(60% + ${mouseY * -20}px)`,
        transition: 'left 0.4s ease-out, top 0.4s ease-out'
      }"
    />

    <!-- Background texture text with parallax -->
    <div
      class="absolute right-[-40px] font-display font-extrabold text-[120px] lg:text-[200px] text-white/[0.03] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :style="{ top: `calc(50% + ${scrollY * -0.15}px)`, transform: 'translateY(-50%)' }"
    >
      DEVELOPER
    </div>

    <!-- Grid pattern overlay -->
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 40px 40px;"
    />

    <!-- Floating geometric shapes with mouse + scroll parallax -->
    <div
      class="absolute top-[12%] left-[8%] w-20 h-20 border border-white/[0.06] rounded-full"
      :style="{ transform: `translate(${mouseX * 15}px, ${scrollY * 0.08 + mouseY * 10}px)` }"
      style="animation: float-1 6s ease-in-out infinite"
    />
    <div
      class="absolute top-[65%] right-[12%] w-10 h-10 bg-accent/[0.06] rotate-45"
      :style="{ transform: `translate(${mouseX * -10}px, ${scrollY * -0.1 + mouseY * -8}px) rotate(45deg)` }"
      style="animation: float-2 8s ease-in-out infinite"
    />
    <div
      class="absolute top-[28%] right-[20%] w-32 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      :style="{ transform: `translate(${mouseX * 8}px, ${scrollY * 0.05 + mouseY * 5}px)` }"
      style="animation: float-3 5s ease-in-out infinite"
    />
    <div
      class="absolute bottom-[25%] left-[18%] w-6 h-6 border border-accent/[0.15] rotate-12"
      :style="{ transform: `translate(${mouseX * -12}px, ${scrollY * -0.06 + mouseY * -6}px) rotate(12deg)` }"
      style="animation: float-2 7s ease-in-out infinite"
    />
    <div
      class="hidden lg:block absolute top-[18%] right-[6%] w-4 h-4 rounded-full bg-accent/20"
      :style="{ transform: `translate(${mouseX * 20}px, ${scrollY * 0.04 + mouseY * 12}px)` }"
      style="animation: float-1 4s ease-in-out infinite; animation-name: pulse-glow, float-1;"
    />
    <!-- SVG rotating ring -->
    <svg
      class="absolute top-[40%] left-[5%] w-24 h-24 opacity-[0.04]"
      :style="{ transform: `translate(${mouseX * 10}px, ${mouseY * 8}px)` }"
      style="animation: spin-slow 30s linear infinite"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="8 4" />
    </svg>
    <!-- Cross shape -->
    <div
      class="hidden md:block absolute bottom-[15%] right-[25%] opacity-[0.06]"
      :style="{ transform: `translate(${mouseX * -8}px, ${mouseY * 6}px)` }"
      style="animation: float-3 9s ease-in-out infinite"
    >
      <div class="w-8 h-[1px] bg-white absolute top-1/2 left-0" />
      <div class="w-[1px] h-8 bg-white absolute left-1/2 top-0" />
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
        <div class="flex-1">
          <p class="text-accent font-sans font-semibold text-sm tracking-[4px] uppercase mb-4">
            Full Stack Developer
          </p>

          <h1 class="font-display font-extrabold text-5xl md:text-6xl lg:text-8xl text-white leading-[0.9] tracking-tighter">
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

          <p class="text-white/40 text-lg mt-8 max-w-lg leading-relaxed">
            Construindo sistemas de alta disponibilidade e microsserviços —
            do backend ao frontend, do banco de dados ao deploy.
          </p>
        </div>

        <!-- Right side info -->
        <div class="flex flex-col gap-6 lg:items-end text-right">
          <div>
            <p class="text-text-muted text-xs uppercase tracking-[3px] mb-1">Localização</p>
            <p class="text-white text-base">São Paulo – SP, Brasil</p>
          </div>
          <div>
            <p class="text-text-muted text-xs uppercase tracking-[3px] mb-1">Conectar</p>
            <a
              href="https://linkedin.com/in/jfernandodev"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-white hover:text-accent transition-colors duration-200 text-base"
              aria-label="LinkedIn de José Fernando"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              linkedin.com/in/jfernandodev
            </a>
          </div>
          <div>
            <p class="text-text-muted text-xs uppercase tracking-[3px] mb-1">Disponível para</p>
            <p class="text-accent text-base font-semibold">Oportunidades Full-Time</p>
          </div>
        </div>
      </div>
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
