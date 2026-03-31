<script setup lang="ts">
const { mouseX, mouseY } = useMouseParallax()
</script>

<template>
  <section id="contato" class="relative bg-surface-white py-24 lg:py-36 overflow-hidden">
    <!-- Decorative gradient orb -->
    <div
      class="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
      :style="{
        background: 'radial-gradient(circle, #8b5cf6, transparent)',
        right: `calc(10% + ${mouseX * 15}px)`,
        top: `calc(20% + ${mouseY * 15}px)`,
        transition: 'right 0.4s ease-out, top 0.4s ease-out'
      }"
    />

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-4">
        <div class="reveal w-12 h-[1px] bg-accent" />
        <p class="reveal text-accent text-sm font-semibold uppercase tracking-[4px]">Contato</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-5xl md:text-6xl lg:text-8xl text-black tracking-tighter leading-[0.9]">
        VAMOS<br>
        <span class="gradient-text">CONVERSAR</span>
      </h2>

      <p class="reveal text-text-muted text-lg mt-8 max-w-lg" data-stagger="1">
        Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de fazer parte da sua equipe.
      </p>

      <div class="reveal flex flex-col sm:flex-row gap-6 mt-10" data-stagger="2">
        <a
          href="https://linkedin.com/in/jfernandodev"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 px-6 py-4 bg-black text-white rounded-xl hover:bg-accent transition-colors duration-300 text-base font-semibold group"
          aria-label="LinkedIn de José Fernando"
        >
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>

        <a
          href="https://jfernando.dev"
          class="inline-flex items-center gap-3 px-6 py-4 border-2 border-black text-black rounded-xl hover:border-accent hover:text-accent transition-colors duration-300 text-base font-semibold"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
          jfernando.dev
        </a>
      </div>

      <div class="reveal mt-8" data-stagger="3">
        <p class="text-text-muted flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          São Paulo – SP, Brasil
        </p>
      </div>

      <!-- Footer -->
      <div class="reveal mt-24 pt-8 border-t border-border-light flex flex-col sm:flex-row justify-between items-center gap-4" data-stagger="4">
        <p class="text-text-muted text-sm">
          &copy; {{ new Date().getFullYear() }} José Fernando Gomes Marcial
        </p>
        <p class="font-display font-bold text-sm text-black/20">
          jfernando<span class="text-accent/40">.dev</span>
        </p>
      </div>
    </div>
  </section>
</template>
