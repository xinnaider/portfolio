export const useDownloadCv = () => {
  const isGenerating = ref(false)

  const download = async () => {
    if (isGenerating.value) return
    isGenerating.value = true

    try {
      const el = document.querySelector('.cv-template') as HTMLElement
      if (!el) return

      // Create a clone to render offscreen without affecting the page
      const clone = el.cloneNode(true) as HTMLElement
      clone.style.position = 'fixed'
      clone.style.left = '0'
      clone.style.top = '0'
      clone.style.width = '794px'
      clone.style.minHeight = '1123px'
      clone.style.padding = '53px 60px'
      clone.style.background = 'white'
      clone.style.zIndex = '9999'
      clone.style.pointerEvents = 'none'
      document.body.appendChild(clone)

      // Wait for layout
      await new Promise(r => setTimeout(r, 200))

      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 794
      })

      // Remove clone
      document.body.removeChild(clone)

      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297)
      pdf.save('Jose-Fernando-CV.pdf')
    } finally {
      isGenerating.value = false
    }
  }

  return { download, isGenerating }
}
