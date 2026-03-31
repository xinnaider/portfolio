<template>
  <div ref="cvRef" class="cv-template">
    <!-- Header -->
    <div class="cv-header">
      <h1>José Fernando Gomes Marcial</h1>
      <p class="cv-subtitle">Desenvolvedor Full Stack</p>
      <div class="cv-contact">
        <span>São Paulo – SP, Brasil</span>
        <span>|</span>
        <span>linkedin.com/in/jfernandodev</span>
        <span>|</span>
        <span>jfernando.dev</span>
      </div>
    </div>

    <!-- Sobre -->
    <div class="cv-section">
      <h2>Sobre</h2>
      <p>
        Desenvolvedor Full Stack com +4 anos de experiência em sistemas de alto volume de dados,
        arquiteturas de microsserviços e integração com dispositivos IoT usando protocolos SNMP e LwM2M.
        Perfil autodidata com foco em resolver problemas complexos e entregar soluções escaláveis.
      </p>
    </div>

    <!-- Experiência -->
    <div class="cv-section">
      <h2>Experiência Profissional</h2>

      <div class="cv-entry">
        <div class="cv-entry-header">
          <div>
            <strong>Desenvolvedor Full Stack Pleno</strong> — Grupo NEPEN
          </div>
          <div class="cv-date">Ago 2025 – Atual</div>
        </div>
        <p class="cv-entry-desc">ICT especializado em soluções de monitoramento e gestão de dispositivos IoT.</p>
        <ul>
          <li>Desenvolvimento e manutenção de serviços em arquitetura de microsserviços com Eureka e API Gateway.</li>
          <li>Implementação de comunicação assíncrona utilizando RabbitMQ.</li>
          <li>Integração com dispositivos utilizando protocolos SNMP e LwM2M.</li>
          <li>Atuação em sistemas de alto volume de dados e alta disponibilidade.</li>
          <li>Contato com clientes para levantamento de requisitos e alinhamentos técnicos.</li>
        </ul>
        <div class="cv-tags">Vue.js · Spring Boot · .NET · RabbitMQ · SNMP · LwM2M</div>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-header">
          <div>
            <strong>Desenvolvedor Full Stack</strong> — Eficiência Fiscal
          </div>
          <div class="cv-date">Mai 2023 – Ago 2025</div>
        </div>
        <p class="cv-entry-desc">Startup focada em automação fiscal e tributária para empresas de médio e grande porte.</p>
        <p class="cv-promotion">Promovido de Junior para Pleno em Ago 2024</p>
        <ul>
          <li>Desenvolvimento de funcionalidades utilizando Laravel, PHP, JavaScript, Python, Java e Electron.</li>
          <li>Implementação de rotinas de web scraping para extração automatizada de dados fiscais.</li>
          <li>Download, processamento e integração de documentos fiscais em larga escala.</li>
          <li>Atuação em DevOps e manutenção da infraestrutura da aplicação.</li>
          <li>Migração de banco de dados de grande porte (~4TB).</li>
        </ul>
        <div class="cv-tags">Laravel · PHP · Python · Java · Electron · DevOps</div>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-header">
          <div>
            <strong>Desenvolvedor Full Stack</strong> — PROINFE (IFRO)
          </div>
          <div class="cv-date">Ago 2023 – Ago 2024</div>
        </div>
        <p class="cv-entry-desc">Projeto de pesquisa e extensão do Instituto Federal de Rondônia voltado ao desenvolvimento de soluções tecnológicas.</p>
        <ul>
          <li>Desenvolvimento de frontend utilizando Next.js e Material UI.</li>
          <li>Backend com Nest.js em arquitetura de microsserviços.</li>
          <li>Docker para criação e gerenciamento de contêineres.</li>
        </ul>
        <div class="cv-tags">Next.js · Nest.js · Docker · Material UI</div>
      </div>
    </div>

    <!-- Tecnologias -->
    <div class="cv-section">
      <h2>Tecnologias</h2>
      <div class="cv-tech-grid">
        <div><strong>Linguagens:</strong> Java, PHP, JavaScript, Python, Node.js, C# (.NET)</div>
        <div><strong>Frameworks:</strong> Spring Boot, Laravel, Nest.js, Vue.js, Next.js, Electron</div>
        <div><strong>Arquitetura:</strong> Microservices, REST APIs, RabbitMQ, API Gateway, Eureka</div>
        <div><strong>Infra:</strong> Docker, DevOps, Web Scraping, SNMP, LwM2M</div>
      </div>
    </div>

    <!-- Formação -->
    <div class="cv-section">
      <h2>Formação</h2>

      <div class="cv-entry">
        <div class="cv-entry-header">
          <div><strong>Análise e Desenvolvimento de Sistemas</strong> — Universidade Cruzeiro do Sul</div>
          <div class="cv-date">Em andamento · Previsão: Jul 2027</div>
        </div>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-header">
          <div><strong>Análise e Desenvolvimento de Sistemas</strong> — IFRO</div>
          <div class="cv-date">Até o 4º período · Transferido</div>
        </div>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-header">
          <div><strong>Ensino Médio Técnico em Informática</strong> — IFRO</div>
          <div class="cv-date">Concluído em 2022</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cv-template {
  width: 210mm;
  min-height: 297mm;
  padding: 16mm 18mm;
  background: white;
  color: #111;
  font-family: 'Space Grotesk', 'Segoe UI', sans-serif;
  font-size: 10pt;
  line-height: 1.5;
  position: absolute;
  left: -9999px;
  top: 0;
}

.cv-header {
  text-align: center;
  margin-bottom: 6mm;
  padding-bottom: 4mm;
  border-bottom: 2px solid #8b5cf6;
}

.cv-header h1 {
  font-family: 'Syne', sans-serif;
  font-size: 20pt;
  font-weight: 800;
  margin: 0;
  color: #000;
}

.cv-subtitle {
  font-size: 11pt;
  color: #8b5cf6;
  font-weight: 600;
  margin: 2mm 0;
}

.cv-contact {
  font-size: 9pt;
  color: #555;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.cv-section {
  margin-bottom: 5mm;
}

.cv-section h2 {
  font-family: 'Syne', sans-serif;
  font-size: 12pt;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 2mm;
  margin-bottom: 3mm;
}

.cv-section > p {
  color: #333;
  font-size: 9.5pt;
}

.cv-entry {
  margin-bottom: 4mm;
}

.cv-entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 10pt;
}

.cv-date {
  font-size: 8.5pt;
  color: #666;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 8px;
}

.cv-entry-desc {
  font-size: 8.5pt;
  color: #666;
  margin: 1mm 0;
}

.cv-promotion {
  font-size: 8.5pt;
  color: #8b5cf6;
  font-weight: 600;
  margin: 1mm 0;
}

.cv-entry ul {
  margin: 1mm 0;
  padding-left: 5mm;
}

.cv-entry li {
  font-size: 9pt;
  color: #333;
  margin-bottom: 0.5mm;
}

.cv-tags {
  font-size: 8pt;
  color: #8b5cf6;
  margin-top: 1mm;
}

.cv-tech-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2mm 8mm;
  font-size: 9pt;
  color: #333;
}
</style>
