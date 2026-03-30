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
