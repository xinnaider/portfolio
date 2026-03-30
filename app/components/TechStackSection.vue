<script setup lang="ts">
const categories = [
  {
    label: 'Linguagens',
    items: ['Java', 'PHP', 'JavaScript', 'Python', 'Node.js', 'C# (.NET)']
  },
  {
    label: 'Frameworks',
    items: ['Spring Boot', 'Laravel', 'Nest.js', 'Vue.js', 'Next.js', 'Electron']
  },
  {
    label: 'Arquitetura',
    items: ['Microservices', 'REST APIs', 'RabbitMQ', 'API Gateway', 'Eureka']
  },
  {
    label: 'Infra & Outros',
    items: ['Docker', 'DevOps', 'Web Scraping', 'SNMP', 'LwM2M']
  }
]
</script>

<template>
  <section id="tech" class="bg-surface-light py-24 lg:py-32">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="reveal font-display font-extrabold text-4xl md:text-5xl text-black tracking-tight mb-16">
        TECNOLOGIAS
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div
          v-for="(category, catIndex) in categories"
          :key="category.label"
          class="reveal"
          :data-stagger="catIndex"
        >
          <h3 class="text-text-muted text-xs uppercase tracking-[3px] mb-4">
            {{ category.label }}
          </h3>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="(item, itemIndex) in category.items"
              :key="item"
              class="reveal px-4 py-2 bg-white border border-border-light rounded-full text-sm text-black/70 hover:border-accent hover:text-accent transition-colors duration-200 cursor-default"
              :data-stagger="catIndex * 2 + itemIndex"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
