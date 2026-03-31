export const useDownloadCv = () => {
  const isGenerating = ref(false)

  const download = () => {
    if (isGenerating.value) return
    isGenerating.value = true

    const el = document.querySelector('.cv-template') as HTMLElement
    if (!el) {
      isGenerating.value = false
      return
    }

    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      isGenerating.value = false
      return
    }

    // Clone and remove the inline hide style
    const clone = el.cloneNode(true) as HTMLElement
    clone.removeAttribute('style')
    const html = clone.outerHTML

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Jose-Fernando-CV</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  @page {
    size: A4;
    margin: 0;
  }

  body {
    background: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }

  .cv-actions {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    font-family: 'Space Grotesk', sans-serif;
  }

  .cv-actions button {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .cv-actions button:hover { opacity: 0.85; }

  .btn-download {
    background: #8b5cf6;
    color: white;
  }

  .btn-back {
    background: #333;
    color: white;
  }

  .cv-template {
    width: 210mm;
    min-height: 297mm;
    padding: 14mm 16mm;
    background: white;
    color: #111;
    font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
    font-size: 9.5pt;
    line-height: 1.45;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }

  .cv-header {
    text-align: center;
    margin-bottom: 5mm;
    padding-bottom: 3mm;
    border-bottom: 2px solid #8b5cf6;
  }

  .cv-header h1 {
    font-family: 'Syne', sans-serif;
    font-size: 18pt;
    font-weight: 800;
    color: #000;
    letter-spacing: -0.5px;
  }

  .cv-subtitle {
    font-size: 10.5pt;
    color: #8b5cf6;
    font-weight: 600;
    margin: 1.5mm 0;
  }

  .cv-contact {
    font-size: 8.5pt;
    color: #555;
    display: flex;
    justify-content: center;
    gap: 6px;
  }

  .cv-section {
    margin-bottom: 4mm;
    break-inside: avoid;
  }

  .cv-section h2 {
    font-family: 'Syne', sans-serif;
    font-size: 10.5pt;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1.5mm;
    margin-bottom: 2.5mm;
  }

  .cv-section > p {
    color: #333;
    font-size: 9pt;
  }

  .cv-entry {
    margin-bottom: 3mm;
    break-inside: avoid;
  }

  .cv-entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 9.5pt;
  }

  .cv-date {
    font-size: 8pt;
    color: #666;
    white-space: nowrap;
    flex-shrink: 0;
    margin-left: 8px;
  }

  .cv-entry-desc {
    font-size: 8pt;
    color: #666;
    margin: 0.5mm 0;
  }

  .cv-promotion {
    font-size: 8pt;
    color: #8b5cf6;
    font-weight: 600;
    margin: 0.5mm 0;
  }

  .cv-entry ul {
    margin: 0.5mm 0;
    padding-left: 4.5mm;
  }

  .cv-entry li {
    font-size: 8.5pt;
    color: #333;
    margin-bottom: 0.3mm;
  }

  .cv-tags {
    font-size: 7.5pt;
    color: #8b5cf6;
    margin-top: 0.5mm;
  }

  .cv-tech-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5mm 6mm;
    font-size: 8.5pt;
    color: #333;
  }

  @media print {
    body { background: white; padding: 0; }
    .cv-actions { display: none; }
    .cv-template { box-shadow: none; padding: 14mm 16mm; }
  }
</style>
</head>
<body>
  <div class="cv-actions">
    <button class="btn-download" onclick="window.print()">Salvar como PDF</button>
    <button class="btn-back" onclick="window.close()">Voltar</button>
  </div>
  ${html}
</body>
</html>`)

    printWindow.document.close()
    isGenerating.value = false
  }

  return { download, isGenerating }
}
