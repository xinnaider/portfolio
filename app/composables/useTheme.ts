type Theme = 'violet' | 'manga'

const theme = ref<Theme>('violet')

export function useTheme() {
  const isManga = computed(() => theme.value === 'manga')

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', newTheme === 'violet' ? '' : newTheme)
      localStorage.setItem('portfolio-theme', newTheme)
    }
  }

  function toggleTheme() {
    const { triggerTransition } = useThemeTransition()
    triggerTransition(() => {
      setTheme(theme.value === 'violet' ? 'manga' : 'violet')
    })
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem('portfolio-theme') as Theme | null
      if (saved === 'manga') {
        setTheme('manga')
      }
    }
  }

  return { theme: readonly(theme), isManga, setTheme, toggleTheme, initTheme }
}
