export function useScrollProgress() {
  const scrollY = ref(0)
  const progress = ref(0)
  let ticking = false

  const update = () => {
    scrollY.value = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    progress.value = docHeight > 0 ? window.scrollY / docHeight : 0
    ticking = false
  }

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { scrollY, progress }
}
