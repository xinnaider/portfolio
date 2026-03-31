export const useDownloadCv = () => {
  const isGenerating = ref(false)

  const download = async () => {
    if (isGenerating.value) return
    isGenerating.value = true

    try {
      const el = document.querySelector('.cv-template') as HTMLElement
      if (!el) return

      // Make visible for rendering (offscreen but rendered)
      el.style.position = 'fixed'
      el.style.left = '0'
      el.style.top = '0'
      el.style.zIndex = '-1'
      el.style.opacity = '0'
      el.style.width = '794px' // A4 at 96dpi
      el.style.minHeight = '1123px'
      el.style.padding = '53px 60px'
      el.style.background = 'white'

      // Wait a frame for layout
      await new Promise(r => setTimeout(r, 100))

      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        windowWidth: 794
      })

      // Restore hidden
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      el.style.top = '0'
      el.style.zIndex = ''
      el.style.opacity = ''
      el.style.width = ''
      el.style.minHeight = ''
      el.style.padding = ''

      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pdfWidth = 210
      const pdfHeight = 297
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('Jose-Fernando-CV.pdf')
    } finally {
      isGenerating.value = false
    }
  }

  return { download, isGenerating }
}
