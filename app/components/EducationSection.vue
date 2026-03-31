<script setup lang="ts">
const { scrollY } = useScrollProgress()
</script>

<template>
  <section id="formacao" class="relative bg-surface-black py-16 sm:py-24 lg:py-36 overflow-hidden">
    <!-- Background texture -->
    <div
      class="absolute right-[-20px] font-display font-extrabold text-[40px] sm:text-[80px] lg:text-[140px] text-white/[0.02] tracking-tighter whitespace-nowrap select-none pointer-events-none"
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
        <p class="reveal text-accent text-xs sm:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[4px]">Educação</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-8 sm:mb-12">
        FORMAÇÃO
      </h2>

      <div class="space-y-6 max-w-2xl">
        <!-- Cruzeiro do Sul — atual -->
        <div class="reveal bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 hover:border-accent/20 transition-all duration-300" data-stagger="1">
          <div class="flex items-start gap-3 sm:gap-6">
            <div class="hidden sm:flex w-14 h-14 rounded-xl bg-accent/10 items-center justify-center flex-shrink-0">
              <span class="text-accent font-display font-bold text-lg">CS</span>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <p class="font-display font-bold text-base sm:text-xl md:text-2xl text-white">
                  Análise e Desenvolvimento de Sistemas
                </p>
              </div>
              <p class="text-accent text-xs sm:text-sm font-semibold mt-1">
                Universidade Cruzeiro do Sul
              </p>
              <p class="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest mt-1">
                Em andamento · Previsão: Jul 2027
              </p>
              <p class="text-white/80 text-xs sm:text-[15px] mt-3 sm:mt-4 leading-relaxed">
                Transferência do IFRO após mudança para São Paulo. Continuação da formação em desenvolvimento de software, engenharia de software, banco de dados e infraestrutura de TI.
              </p>
            </div>
          </div>
        </div>

        <!-- IFRO — anterior -->
        <div class="reveal bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 hover:border-accent/20 transition-all duration-300" data-stagger="2">
          <div class="flex items-start gap-3 sm:gap-6">
            <div class="hidden sm:flex w-14 h-14 rounded-xl bg-white/[0.05] items-center justify-center flex-shrink-0">
              <span class="text-white/60 font-display font-bold text-xl">IF</span>
            </div>
            <div>
              <p class="font-display font-bold text-base sm:text-xl md:text-2xl text-white">
                Análise e Desenvolvimento de Sistemas
              </p>
              <p class="text-white/60 text-xs sm:text-sm font-semibold mt-1">
                Instituto Federal de Rondônia (IFRO)
              </p>
              <p class="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest mt-1">
                Até o 4º período · Transferido para Cruzeiro do Sul
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
