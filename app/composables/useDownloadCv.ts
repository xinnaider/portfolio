export const useDownloadCv = () => {
  const isGenerating = ref(false)

  const download = async () => {
    if (isGenerating.value) return
    isGenerating.value = true

    try {
      const html2pdf = (await import('html2pdf.js')).default
      const el = document.querySelector('.cv-template') as HTMLElement
      if (!el) return

      // Temporarily make visible for rendering
      el.style.position = 'static'
      el.style.left = '0'

      await html2pdf()
        .set({
          margin: 0,
          filename: 'jose-fernando-cv.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(el)
        .save()

      // Hide again
      el.style.position = 'absolute'
      el.style.left = '-9999px'
    } finally {
      isGenerating.value = false
    }
  }

  return { download, isGenerating }
}
