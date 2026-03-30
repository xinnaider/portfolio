export function useTypingEffect(text: string, speed = 80, delay = 500) {
  const displayedText = ref('')
  const isComplete = ref(false)
  const showCursor = ref(true)

  onMounted(() => {
    setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          displayedText.value += text[i]
          i++
        } else {
          clearInterval(interval)
          isComplete.value = true
          setTimeout(() => {
            showCursor.value = false
          }, 2000)
        }
      }, speed)
    }, delay)
  })

  return { displayedText, isComplete, showCursor }
}
