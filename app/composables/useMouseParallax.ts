export function useMouseParallax() {
  const mouseX = ref(0)
  const mouseY = ref(0)

  onMounted(() => {
    window.addEventListener('mousemove', (e) => {
      mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2
    })
  })

  return { mouseX, mouseY }
}
