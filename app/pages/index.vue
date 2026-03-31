<script setup lang="ts">
useHead({
  title: 'José Fernando Gomes Marcial — Full Stack Developer'
})

useScrollReveal()

const { progress } = useScrollProgress()
</script>

<template>
  <div>
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
