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
