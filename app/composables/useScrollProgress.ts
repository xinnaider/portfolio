export function useScrollProgress() {
  const scrollY = ref(0)
  const progress = ref(0)

  onMounted(() => {
    const update = () => {
      scrollY.value = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      progress.value = docHeight > 0 ? window.scrollY / docHeight : 0
    }
    window.addEventListener('scroll', update, { passive: true })
  })

  return { scrollY, progress }
}
