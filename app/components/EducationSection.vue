<script setup lang="ts">
const { scrollY } = useScrollProgress()
</script>

<template>
  <section class="relative bg-surface-black py-24 lg:py-36 overflow-hidden">
    <!-- Background texture -->
    <div
      class="absolute right-[-20px] font-display font-extrabold text-[80px] lg:text-[140px] text-white/[0.02] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :style="{ top: `calc(40% + ${scrollY * -0.03}px)` }"
    >
      FORMAÇÃO
    </div>

    <!-- Floating element -->
    <div
      class="hidden lg:block absolute top-[20%] right-[10%] w-20 h-20 border border-accent/[0.06] rotate-45"
      :style="{ transform: `translateY(${scrollY * -0.04}px) rotate(45deg)` }"
      style="animation: float-2 8s ease-in-out infinite"
    />

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-4">
        <div class="reveal w-12 h-[1px] bg-accent" />
        <p class="reveal text-accent text-sm font-semibold uppercase tracking-[4px]">Educação</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-12">
        FORMAÇÃO
      </h2>

      <div class="reveal gradient-border bg-border-dark/30 rounded-xl p-8 lg:p-12 max-w-2xl" data-stagger="1">
        <div class="flex items-start gap-6">
          <div class="hidden sm:flex w-14 h-14 rounded-xl bg-accent/10 items-center justify-center flex-shrink-0">
            <span class="text-accent font-display font-bold text-xl">IF</span>
          </div>
          <div>
            <p class="font-display font-bold text-2xl text-white">
              Análise e Desenvolvimento de Sistemas
            </p>
            <p class="text-accent text-sm font-semibold mt-2">
              Instituto Federal de Rondônia (IFRO)
            </p>
            <p class="text-white/40 text-sm mt-4 leading-relaxed">
              Formação focada em desenvolvimento de software, banco de dados, engenharia de software e infraestrutura de TI.
            </p>
            <div class="w-[60px] h-[3px] bg-accent mt-6" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
