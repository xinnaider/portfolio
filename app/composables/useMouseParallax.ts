export function useMouseParallax() {
  const mouseX = ref(0)
  const mouseY = ref(0)
  let ticking = false

  const onMouseMove = (e: MouseEvent) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2
        mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2
        ticking = false
      })
      ticking = true
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
  })

  return { mouseX, mouseY }
}
