<script setup lang="ts">
const yearsCounter = useCounter(4, 2000)
const companiesCounter = useCounter(3, 2000)
const languagesCounter = useCounter(6, 2000)

const countersRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          yearsCounter.animate()
          companiesCounter.animate()
          languagesCounter.animate()
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
</script>

<template>
  <section id="sobre" class="bg-surface-white py-24 lg:py-32">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl text-black tracking-tight mb-10">
        SOBRE
      </h2>

      <p class="reveal text-black/80 text-lg leading-relaxed max-w-2xl" data-stagger="1">
        Sou apaixonado por tecnologia desde cedo — comecei a explorar computadores ainda na infância
        e desde então mantenho uma forte curiosidade por entender como sistemas e tecnologias funcionam.
        Desenvolvi um perfil autodidata, sempre buscando aprender na prática, testar soluções e
        aprofundar conhecimentos. Gosto de resolver problemas complexos, enfrentar desafios técnicos
        e trabalhar em ambientes que incentivem aprendizado contínuo e evolução profissional.
      </p>

      <!-- Counters -->
      <div
        ref="countersRef"
        class="reveal grid grid-cols-3 gap-8 mt-16 max-w-xl"
        data-stagger="2"
      >
        <div>
          <span class="font-display font-extrabold text-5xl text-black">+{{ yearsCounter.count.value }}</span>
          <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Anos de experiência</p>
        </div>
        <div>
          <span class="font-display font-extrabold text-5xl text-black">{{ companiesCounter.count.value }}</span>
          <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Empresas</p>
        </div>
        <div>
          <span class="font-display font-extrabold text-5xl text-black">{{ languagesCounter.count.value }}+</span>
          <p class="text-text-muted text-xs uppercase tracking-[3px] mt-2">Linguagens</p>
        </div>
      </div>
    </div>
  </section>
</template>
