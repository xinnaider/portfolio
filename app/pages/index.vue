<script setup lang="ts">
useHead({
  title: 'José Fernando — Full Stack Developer'
})

useScrollReveal()

const { progress } = useScrollProgress()
</script>

<template>
  <div>
    <a href="#sobre" class="skip-to-content">Pular para o conteúdo</a>

    <!-- Scroll progress bar -->
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
  </div>
</template>
