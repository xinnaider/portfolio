export const useDownloadCv = () => {
  const isGenerating = ref(false)
  const { t, tm, rt } = useI18n()

  const download = async () => {
    if (isGenerating.value) return
    isGenerating.value = true

    try {
      const jobs = tm('experience.jobs') as Array<{
        company: { val: string }
        role: { val: string }
        description: { val: string }
        badge: { val: string }
        period: { val: string }
        tags: Array<{ val: string }>
        promotion?: { from: { val: string }, to: { val: string }, date: { val: string } }
        items: Array<{ val: string }>
        [key: string]: unknown
      }>

      const educationEntries = tm('education.entries') as Array<{
        title: { val: string }
        institution: { val: string }
        status: { val: string }
        [key: string]: unknown
      }>

      const jobsHtml = jobs.map((job) => {
        const items = (job.items as unknown[]).map(item => `<li>${rt(item as { val: string })}</li>`).join('\n        ')
        const tags = (job.tags as unknown[]).map(tag => rt(tag as { val: string })).join(' · ')
        const promo = job.promotion
          ? `<p class="promo">${rt(job.promotion.from)} → ${rt(job.promotion.to)} (${rt(job.promotion.date)})</p>`
          : ''

        return `<div class="ent">
      <div class="ent-h"><div><strong>${rt(job.role)}</strong> — ${rt(job.company)}</div><div class="date">${rt(job.period)}</div></div>
      <p class="desc">${rt(job.description)}</p>
      ${promo}
      <ul>
        ${items}
      </ul>
      <div class="tags">${tags}</div>
    </div>`
      }).join('\n    ')

      const eduHtml = educationEntries.map((entry) => {
        return `<div class="ent">
      <div class="ent-h"><div><strong>${rt(entry.title)}</strong> — ${rt(entry.institution)}</div><div class="date">${rt(entry.status)}</div></div>
    </div>`
      }).join('\n    ')

      const iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.left = '-9999px'
      iframe.style.top = '0'
      iframe.style.width = '794px'
      iframe.style.height = '1123px'
      iframe.style.border = 'none'
      document.body.appendChild(iframe)

      const doc = iframe.contentDocument!
      doc.open()
      doc.write(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 794px; height: 1123px; background: white; }
.cv {
  width: 794px; height: 1123px; padding: 50px 56px;
  background: white; color: #111;
  font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
  font-size: 13px; line-height: 1.5;
}
.hdr { text-align: center; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 2.5px solid #8b5cf6; }
.hdr h1 { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: #000; }
.hdr .sub { font-size: 15px; color: #8b5cf6; font-weight: 600; margin: 5px 0; }
.hdr .info { font-size: 11px; color: #555; display: flex; justify-content: center; gap: 6px; }
.sec { margin-bottom: 14px; }
.sec h2 {
  font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
  color: #000; text-transform: uppercase; letter-spacing: 1.2px;
  border-bottom: 1.5px solid #e0e0e0; padding-bottom: 5px; margin-bottom: 8px;
}
.sec > p { color: #333; font-size: 12px; line-height: 1.55; }
.ent { margin-bottom: 10px; }
.ent-h { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; }
.ent-h strong { color: #000; }
.date { font-size: 10.5px; color: #666; white-space: nowrap; margin-left: 8px; }
.desc { font-size: 10.5px; color: #666; margin: 2px 0; }
.promo { font-size: 10.5px; color: #8b5cf6; font-weight: 600; margin: 2px 0; }
ul { margin: 3px 0; padding-left: 16px; }
li { font-size: 11px; color: #333; margin-bottom: 1.5px; line-height: 1.5; }
.tags { font-size: 10px; color: #8b5cf6; margin-top: 3px; }
.tech { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 20px; font-size: 11px; color: #333; }
</style>
</head><body>
<div class="cv">
  <div class="hdr">
    <h1>José Fernando Gomes Marcial</h1>
    <p class="sub">${t('hero.subtitle')}</p>
    <div class="info">
      <span>${t('hero.locationValue')}</span><span>|</span>
      <span>linkedin.com/in/jfernandodev</span><span>|</span>
      <span>github.com/xinnaider</span><span>|</span>
      <span>jfernando.dev</span>
    </div>
  </div>

  <div class="sec">
    <h2>${t('about.title')}</h2>
    <p>${t('about.bio1')}</p>
    <p style="margin-top:4px;">${t('about.bio2')}</p>
  </div>

  <div class="sec">
    <h2>${t('experience.title')}</h2>
    ${jobsHtml}
  </div>

  <div class="sec">
    <h2>${t('tech.title')}</h2>
    <div class="tech">
      <div><strong>${t('tech.categories.languages')}:</strong> Java, PHP, JavaScript, Python, Node.js, C# (.NET)</div>
      <div><strong>${t('tech.categories.frameworks')}:</strong> Spring Boot, Laravel, Nest.js, Vue.js, Next.js, Electron</div>
      <div><strong>${t('tech.categories.architecture')}:</strong> Microservices, REST APIs, RabbitMQ, API Gateway, Eureka</div>
      <div><strong>${t('tech.categories.infra')}:</strong> Docker, DevOps, Web Scraping, SNMP, LwM2M</div>
    </div>
  </div>

  <div class="sec">
    <h2>${t('education.title')}</h2>
    ${eduHtml}
  </div>
</div>
</body></html>`)
      doc.close()

      await iframe.contentWindow!.document.fonts.ready
      await new Promise(r => setTimeout(r, 300))

      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      const cvEl = doc.querySelector('.cv') as HTMLElement
      const canvas = await html2canvas(cvEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123
      })

      document.body.removeChild(iframe)

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, 210, 297)
      pdf.save('Jose-Fernando-CV.pdf')
    } finally {
      isGenerating.value = false
    }
  }

  return { download, isGenerating }
}
