export const useDownloadCv = () => {
  const isGenerating = ref(false)

  const download = async () => {
    if (isGenerating.value) return
    isGenerating.value = true

    try {
      // Create hidden iframe
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
    <p class="sub">Desenvolvedor Full Stack</p>
    <div class="info">
      <span>São Paulo – SP, Brasil</span><span>|</span>
      <span>linkedin.com/in/jfernandodev</span><span>|</span>
      <span>jfernando.dev</span>
    </div>
  </div>

  <div class="sec">
    <h2>Sobre</h2>
    <p>Desenvolvedor Full Stack com +4 anos de experiência em sistemas de alto volume de dados, arquiteturas de microsserviços e integração com dispositivos IoT usando protocolos SNMP e LwM2M. Perfil autodidata com foco em resolver problemas complexos e entregar soluções escaláveis.</p>
  </div>

  <div class="sec">
    <h2>Experiência Profissional</h2>
    <div class="ent">
      <div class="ent-h"><div><strong>Desenvolvedor Full Stack Pleno</strong> — Grupo NEPEN</div><div class="date">Ago 2025 – Atual</div></div>
      <p class="desc">ICT especializado em soluções de monitoramento e gestão de dispositivos IoT.</p>
      <ul>
        <li>Desenvolvimento e manutenção de serviços em arquitetura de microsserviços com Eureka e API Gateway.</li>
        <li>Implementação de comunicação assíncrona utilizando RabbitMQ.</li>
        <li>Integração com dispositivos utilizando protocolos SNMP e LwM2M.</li>
        <li>Atuação em sistemas de alto volume de dados e alta disponibilidade.</li>
        <li>Contato com clientes para levantamento de requisitos e alinhamentos técnicos.</li>
      </ul>
      <div class="tags">Vue.js · Spring Boot · .NET · RabbitMQ · SNMP · LwM2M</div>
    </div>
    <div class="ent">
      <div class="ent-h"><div><strong>Desenvolvedor Full Stack</strong> — Eficiência Fiscal</div><div class="date">Mai 2023 – Ago 2025</div></div>
      <p class="desc">Startup focada em automação fiscal e tributária para empresas de médio e grande porte.</p>
      <p class="promo">Promovido de Junior para Pleno em Ago 2024</p>
      <ul>
        <li>Desenvolvimento utilizando Laravel, PHP, JavaScript, Python, Java e Electron.</li>
        <li>Web scraping para extração automatizada de dados fiscais.</li>
        <li>Processamento e integração de documentos fiscais em larga escala.</li>
        <li>DevOps e manutenção da infraestrutura. Migração de banco ~4TB.</li>
      </ul>
      <div class="tags">Laravel · PHP · Python · Java · Electron · DevOps</div>
    </div>
    <div class="ent">
      <div class="ent-h"><div><strong>Desenvolvedor Full Stack</strong> — PROINFE (IFRO)</div><div class="date">Ago 2023 – Ago 2024</div></div>
      <p class="desc">Projeto de pesquisa e extensão do Instituto Federal de Rondônia.</p>
      <ul>
        <li>Frontend com Next.js e Material UI. Backend com Nest.js em microsserviços.</li>
        <li>Docker para criação e gerenciamento de contêineres.</li>
      </ul>
      <div class="tags">Next.js · Nest.js · Docker · Material UI</div>
    </div>
  </div>

  <div class="sec">
    <h2>Tecnologias</h2>
    <div class="tech">
      <div><strong>Linguagens:</strong> Java, PHP, JavaScript, Python, Node.js, C# (.NET)</div>
      <div><strong>Frameworks:</strong> Spring Boot, Laravel, Nest.js, Vue.js, Next.js, Electron</div>
      <div><strong>Arquitetura:</strong> Microservices, REST APIs, RabbitMQ, API Gateway, Eureka</div>
      <div><strong>Infra:</strong> Docker, DevOps, Web Scraping, SNMP, LwM2M</div>
    </div>
  </div>

  <div class="sec">
    <h2>Formação</h2>
    <div class="ent">
      <div class="ent-h"><div><strong>Análise e Desenvolvimento de Sistemas</strong> — Universidade Cruzeiro do Sul</div><div class="date">Em andamento · Previsão: Jul 2027</div></div>
    </div>
    <div class="ent">
      <div class="ent-h"><div><strong>Análise e Desenvolvimento de Sistemas</strong> — IFRO</div><div class="date">Até o 4º período · Transferido</div></div>
    </div>
    <div class="ent">
      <div class="ent-h"><div><strong>Ensino Médio Técnico em Informática</strong> — IFRO</div><div class="date">Concluído em 2022</div></div>
    </div>
  </div>
</div>
</body></html>`)
      doc.close()

      // Wait for fonts to fully load
      await iframe.contentWindow!.document.fonts.ready
      await new Promise(r => setTimeout(r, 300))

      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      const cvEl = doc.querySelector('.cv') as HTMLElement
      const canvas = await html2canvas(cvEl, {
        scale: 5,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        logging: false,
        imageTimeout: 0,
        removeContainer: false
      })

      document.body.removeChild(iframe)

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      })

      pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, 210, 297, undefined, 'NONE')
      pdf.save('Jose-Fernando-CV.pdf')
    } finally {
      isGenerating.value = false
    }
  }

  return { download, isGenerating }
}
