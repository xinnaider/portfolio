<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: 'José Fernando — Full Stack Developer',
  meta: [
    { name: 'description', content: () => t('meta.description') }
  ]
})

useScrollReveal()

const { progress } = useScrollProgress()
</script>

<template>
  <div>
    <a href="#sobre" class="skip-to-content">{{ $t('skip') }}</a>

    <div
      class="scroll-progress"
      :style="{ width: `${progress * 100}%` }"
    />

    <NavBar />
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <TechStackSection />
    <EducationSection />
    <ContactSection />
    <FloatingPanel />
    <PanelShatter />
  </div>
</template>
