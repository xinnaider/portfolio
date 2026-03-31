<script setup lang="ts">
const yearsCounter = useCounter(4, 2000)
const companiesCounter = useCounter(3, 2000)
const languagesCounter = useCounter(6, 2000)
const projectsCounter = useCounter(20, 2000)

const countersRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          yearsCounter.animate()
          companiesCounter.animate()
          languagesCounter.animate()
          projectsCounter.animate()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  if (countersRef.value) {
    observer.observe(countersRef.value)
  }
})

const highlights = [
  { icon: '{ }', title: 'Backend Robusto', desc: 'APIs REST, microsserviços com Spring Boot, .NET e Nest.js. Comunicação assíncrona com RabbitMQ.' },
  { icon: '◈', title: 'Frontend Moderno', desc: 'Interfaces reativas com Vue.js e Next.js. Experiência com Electron para apps desktop.' },
  { icon: '⬡', title: 'Infraestrutura', desc: 'Docker, DevOps, integração com dispositivos via SNMP e LwM2M. Sistemas de alta disponibilidade.' },
  { icon: '↗', title: 'Dados em Escala', desc: 'Migração de bancos 4TB+, web scraping automatizado, processamento de documentos fiscais em larga escala.' }
]
</script>

<template>
  <section id="sobre" class="relative bg-surface-white py-24 lg:py-36 overflow-hidden">
    <!-- Background texture -->
    <div class="absolute right-[-30px] top-[20%] font-display font-extrabold text-[100px] lg:text-[160px] text-black/[0.02] tracking-tighter whitespace-nowrap select-none pointer-events-none">
      SOBRE
    </div>

    <div class="max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-4">
        <div class="reveal w-12 h-[1px] bg-accent" />
        <p class="reveal text-accent text-sm font-semibold uppercase tracking-[4px]">Quem sou</p>
      </div>

      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight mb-12">
        SOBRE
      </h2>

      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Left: Bio -->
        <div>
          <p class="reveal text-black/70 text-lg leading-relaxed" data-stagger="1">
            Sou apaixonado por tecnologia desde cedo — comecei a explorar computadores ainda na infância
            e desde então mantenho uma forte curiosidade por entender como sistemas e tecnologias funcionam.
          </p>
          <p class="reveal text-black/70 text-lg leading-relaxed mt-6" data-stagger="2">
            Desenvolvi um perfil autodidata, sempre buscando aprender na prática, testar soluções e
            aprofundar conhecimentos. Gosto de resolver problemas complexos, enfrentar desafios técnicos
            e trabalhar em ambientes que incentivem aprendizado contínuo e evolução profissional.
          </p>
          <p class="reveal text-black/70 text-lg leading-relaxed mt-6" data-stagger="3">
            Tenho experiência com sistemas de alto volume de dados, arquiteturas de microsserviços e
            integração com dispositivos IoT usando protocolos especializados como SNMP e LwM2M.
          </p>
        </div>

        <!-- Right: Counters -->
        <div>
          <div
            ref="countersRef"
            class="grid grid-cols-2 gap-8"
          >
            <div class="reveal border-l-2 border-accent pl-6" data-stagger="1">
              <span class="font-display font-extrabold text-5xl lg:text-6xl text-black">+{{ yearsCounter.count.value }}</span>
              <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Anos de experiência</p>
            </div>
            <div class="reveal border-l-2 border-black/10 pl-6" data-stagger="2">
              <span class="font-display font-extrabold text-5xl lg:text-6xl text-black">{{ companiesCounter.count.value }}</span>
              <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Empresas</p>
            </div>
            <div class="reveal border-l-2 border-black/10 pl-6" data-stagger="3">
              <span class="font-display font-extrabold text-5xl lg:text-6xl text-black">{{ languagesCounter.count.value }}+</span>
              <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Linguagens</p>
            </div>
            <div class="reveal border-l-2 border-black/10 pl-6" data-stagger="4">
              <span class="font-display font-extrabold text-5xl lg:text-6xl text-black">{{ projectsCounter.count.value }}+</span>
              <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Projetos</p>
            </div>
          </div>
        </div>
      </div>

      <!-- What I do cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        <div
          v-for="(item, index) in highlights"
          :key="item.title"
          class="reveal-scale group p-6 bg-white border border-border-light rounded-xl hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
          :data-stagger="index + 1"
        >
          <div class="w-10 h-10 rounded-lg bg-surface-light flex items-center justify-center text-accent font-display font-bold text-lg mb-4 group-hover:bg-accent/10 transition-colors duration-300">
            {{ item.icon }}
          </div>
          <h3 class="font-display font-bold text-base text-black mb-2">{{ item.title }}</h3>
          <p class="text-text-muted text-sm leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
