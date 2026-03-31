<script setup lang="ts">
const { scrollY } = useScrollProgress()

const experiences = [
  {
    company: 'Grupo NEPEN',
    role: 'Desenvolvedor Full Stack',
    period: 'Mai 2024 – Atual',
    tags: ['Vue.js', 'Spring Boot', '.NET', 'RabbitMQ', 'SNMP', 'LwM2M'],
    items: [
      'Desenvolvimento e manutenção de serviços em arquitetura de microsserviços com Eureka e API Gateway.',
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
    tags: ['Laravel', 'PHP', 'Python', 'Java', 'Electron', 'DevOps'],
    items: [
      'Desenvolvimento de funcionalidades utilizando Laravel, PHP, JavaScript, Python, Java e Electron.',
      'Implementação de rotinas de web scraping para extração automatizada de dados fiscais.',
      'Download, processamento e integração de documentos fiscais em larga escala.',
      'Atuação em DevOps e manutenção da infraestrutura da aplicação.',
      'Migração de banco de dados de grande porte (~4TB).'
    ]
  },
  {
    company: 'PROINFE',
    role: 'Full Stack Developer',
    period: 'Fev 2022 – Jul 2022',
    tags: ['Next.js', 'Nest.js', 'Docker', 'Material UI'],
    items: [
      'Desenvolvimento de frontend utilizando Next.js e Material UI.',
      'Backend com Nest.js em arquitetura de microsserviços.',
      'Docker para criação e gerenciamento de contêineres.',
      'Organização de serviços containerizados para desenvolvimento.'
    ]
  }
]
</script>

<template>
  <section id="experiencia" class="relative bg-surface-dark py-24 lg:py-36 overflow-hidden">
    <!-- Background texture with parallax -->
    <div
      class="absolute left-[-20px] font-display font-extrabold text-[100px] lg:text-[160px] text-white/[0.02] tracking-tighter whitespace-nowrap select-none pointer-events-none"
      :style="{ top: `calc(50% + ${scrollY * -0.08}px)`, transform: 'translateY(-50%)' }"
    >
      EXPERIÊNCIA
    </div>

    <!-- Floating accent elements -->
    <div
      class="hidden lg:block absolute top-[10%] right-[5%] w-32 h-32 border border-accent/[0.06] rounded-full"
      :style="{ transform: `translateY(${scrollY * -0.05}px)` }"
      style="animation: float-1 10s ease-in-out infinite"
    />
    <div
      class="hidden lg:block absolute bottom-[15%] left-[3%] w-2 h-2 rounded-full bg-accent/20"
      :style="{ transform: `translateY(${scrollY * 0.03}px)` }"
      style="animation: pulse-glow 3s ease-in-out infinite"
    />

    <div class="relative z-10 max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-4">
        <div class="reveal w-12 h-[1px] bg-accent" />
        <p class="reveal text-accent text-sm font-semibold uppercase tracking-[4px]">Trajetória</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-16">
        EXPERIÊNCIA
      </h2>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-0 lg:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

        <div class="space-y-12 lg:space-y-16">
          <div
            v-for="(exp, index) in experiences"
            :key="exp.company"
            class="relative pl-8 lg:pl-20"
          >
            <!-- Timeline dot with pulse -->
            <div class="absolute left-0 lg:left-8 top-2 -translate-x-1/2 z-10">
              <div class="reveal-scale w-4 h-4 rounded-full bg-accent" :data-stagger="index" style="animation: pulse-glow 3s ease-in-out infinite" />
            </div>

            <!-- Period badge -->
            <div
              class="reveal inline-block px-3 py-1 rounded-full text-xs font-semibold text-accent border border-accent/30 mb-4"
              :data-stagger="index"
            >
              {{ exp.period }}
            </div>

            <!-- Card -->
            <div
              class="reveal gradient-border bg-border-dark/30 rounded-xl p-8 hover:bg-border-dark/60 transition-all duration-300"
              :data-stagger="index"
            >
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 class="font-display font-bold text-2xl text-white">{{ exp.company }}</h3>
                  <p class="text-accent text-sm mt-1 font-semibold">{{ exp.role }}</p>
                </div>
              </div>

              <ul class="space-y-3 mb-6">
                <li
                  v-for="item in exp.items"
                  :key="item"
                  class="text-white/60 text-sm leading-relaxed pl-5 relative before:content-['▹'] before:absolute before:left-0 before:text-accent before:text-xs"
                >
                  {{ item }}
                </li>
              </ul>

              <!-- Tech tags -->
              <div class="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                <span
                  v-for="tag in exp.tags"
                  :key="tag"
                  class="px-3 py-1 text-xs rounded-full border border-white/10 text-white/40 hover:border-accent/40 hover:text-accent transition-colors duration-200"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
