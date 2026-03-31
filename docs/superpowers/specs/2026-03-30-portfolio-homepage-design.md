# Portfolio Homepage — José Fernando Gomes Marcial

## Visão Geral

Single-page portfolio com estilo "Blocos Invertidos": seções alternando fundos branco/preto/cinza, tipografia pesada Syne como elemento visual, paleta monocromática com acento Vibrant Violet (#8b5cf6). Animações completas: scroll-reveal, typing effect, contadores, floating elements com parallax.

## Identidade Visual

### Paleta de Cores

| Token         | Valor      | Uso                                    |
|---------------|------------|----------------------------------------|
| `bg-dark`     | `#0a0a0a`  | Fundo seções escuras                   |
| `bg-black`    | `#000000`  | Hero, blocos de contraste máximo       |
| `bg-light`    | `#f5f5f5`  | Fundo seções claras (tech stack)       |
| `bg-white`    | `#ffffff`  | Fundo seções brancas (sobre, footer)   |
| `text-primary`| `#ffffff`  | Texto em fundo escuro                  |
| `text-dark`   | `#000000`  | Texto em fundo claro                   |
| `text-muted`  | `#999999`  | Labels, textos secundários             |
| `accent`      | `#8b5cf6`  | Violet — destaques, linhas, hovers     |
| `border-dark` | `#1a1a1a`  | Bordas em fundo escuro                 |
| `border-light`| `#e5e5e5`  | Bordas em fundo claro                  |

### Tipografia

| Fonte          | Peso    | Uso                              |
|----------------|---------|----------------------------------|
| Syne           | 800     | Nome, títulos de seção, números  |
| Space Grotesk  | 400     | Corpo, descrições               |
| Space Grotesk  | 600     | Labels, subtítulos, nav links   |

### Elementos Visuais

- Texto gigante semi-transparente (opacity ~0.03-0.04) como textura de fundo nas seções escuras ("DEVELOPER", "EXPERIÊNCIA")
- Linha de acento violet (48-60px de largura, 3px de altura)
- Ponto violet no logo: `FERNANDO.`
- Formas geométricas flutuantes no hero (círculos, quadrados, linhas) em branco com baixa opacidade

## Estrutura das Seções

### 1. Hero (fundo: #000)

- **Nav**: logo "FERNANDO." (Syne 800) com ponto violet, links de navegação à direita (Sobre, Experiência, Tech, Contato)
- **Background texture**: "DEVELOPER" em Syne 800, ~120px, branco opacity 0.03-0.04, posicionado à direita
- **Floating elements**: 4-6 formas geométricas (círculos, quadrados com border-only, linhas) em branco opacity 0.05-0.1, animação float lenta com parallax ao scroll
- **Content**:
  - Role: "FULL STACK DEVELOPER" — Space Grotesk 600, letter-spacing 4px, uppercase, cor violet
  - Nome: "JOSÉ FERNANDO" — Syne 800, ~48-64px, branco, com typing effect
  - Linha de acento violet, animada (cresce da esquerda)
  - Localização: "São Paulo – SP, Brasil" — Space Grotesk 400, cor muted
  - Link LinkedIn como ícone
- **Scroll indicator**: seta ou linha animada no bottom

### 2. Sobre (fundo: #fff, texto: #000)

- **Título de seção**: "SOBRE" — Syne 800, preto
- **Resumo**: texto do CV em Space Grotesk 400, max-width ~700px, line-height 1.7
- **Contadores animados** (aparecem ao scroll):
  - +4 anos de experiência
  - 3 empresas
  - 6+ linguagens
  - Layout em grid 3 colunas
  - Números em Syne 800 ~48px, labels em Space Grotesk 400 uppercase letter-spacing

### 3. Experiência (fundo: #0a0a0a)

- **Background texture**: "EXPERIÊNCIA" gigante semi-transparente
- **Timeline vertical**: linha fina violet centralizada
- **Cards** alternando esquerda/direita:
  - Nome da empresa (Syne 700)
  - Cargo + período (Space Grotesk 400, muted)
  - Lista de responsabilidades (Space Grotesk 400)
  - Dot violet na timeline
- **Empresas**:
  1. Grupo NEPEN — Desenvolvedor Full Stack (Mai 2024 – Atual)
  2. Eficiência Fiscal — Pleno Fullstack Developer (Jul 2022 – Abr 2024)
  3. PROINFE — Full Stack Developer (Fev 2022 – Jul 2022)

### 4. Tech Stack (fundo: #f5f5f5)

- **Título**: "TECNOLOGIAS" — Syne 800, preto
- **Grid** 4 colunas (2 em mobile):
  - **Linguagens**: Java, PHP, JavaScript, Python, Node.js, C# (.NET)
  - **Frameworks**: Spring Boot, Laravel, Nest.js, Vue.js, Next.js, Electron
  - **Arquitetura**: Microservices, REST APIs, RabbitMQ, API Gateway, Eureka
  - **Infra & Outros**: Docker, DevOps, Web Scraping, SNMP, LwM2M
- Cada categoria: label uppercase + pills/tags
- Tags: fundo branco, borda cinza, hover → borda violet + text violet
- Staggered scroll-reveal (cada tag aparece em sequência)

### 5. Formação (fundo: #000)

- Layout simples
- "FORMAÇÃO" — Syne 800, branco
- Curso: "Análise e Desenvolvimento de Sistemas"
- Instituição: "Instituto Federal de Rondônia (IFRO)"
- Linha de acento violet

### 6. Contato / Footer (fundo: #fff, texto: #000)

- "VAMOS CONVERSAR" — Syne 800, grande
- Link LinkedIn destacado com hover violet
- Localização: São Paulo – SP, Brasil
- Copyright ou ano

## Animações

### Typing Effect (Hero)
- Nome "JOSÉ FERNANDO" digitado caractere a caractere
- Cursor piscante violet
- Duração: ~2s total, delay 0.5s após page load

### Scroll-Reveal
- Todas as seções: elementos aparecem com fade-in + translateY(20px→0)
- Duração: 600ms, easing: ease-out
- Threshold: 0.1 (elemento 10% visível)
- Stagger de 100ms entre elementos irmãos

### Contadores (Sobre)
- Contam de 0 até o valor final
- Duração: 2s
- Ativam quando seção fica visível
- Easing: ease-out (desacelera no final)

### Floating Elements (Hero)
- 4-6 formas geométricas
- Animação CSS float: translateY oscilando ±15-25px
- Duração: 4-8s cada (variada para não sincronizar)
- Parallax leve no scroll (translateY proporcional ao scroll)

### Hover States
- Nav links: cor → violet, transição 200ms
- Tech tags: borda+texto → violet, transição 200ms
- Timeline cards: sutil elevação, transição 200ms

### Linha de Acento (Hero)
- Cresce de width 0 → 60px
- Delay: após typing effect completar
- Duração: 400ms, ease-out

## Responsividade

- **Desktop** (>1024px): layout completo, timeline alternada, grid 4 colunas
- **Tablet** (768-1024px): timeline alinhada à esquerda, grid 2 colunas
- **Mobile** (<768px): tudo empilhado, nav em hamburger ou scroll horizontal, nome menor (~32px), floating elements reduzidos para 2-3

## Stack Técnica

- **Nuxt 4** — SSG/SSR
- **Nuxt UI** — componentes base (buttons, icons, layout)
- **Tailwind CSS** — estilização
- **Vue 3 Composition API** — lógica de animação
- **IntersectionObserver** — scroll-reveal e ativação de contadores
- **CSS @keyframes** — floating elements, typing cursor
- **Sem dependências extras** — animações nativas CSS/JS

## Acessibilidade

- Contraste mínimo 4.5:1 em todos os textos
- Violet #8b5cf6 sobre preto: ratio ~5.2:1 (passa AA)
- Preto sobre branco: ratio 21:1
- prefers-reduced-motion: desabilita floating elements e typing, mostra conteúdo diretamente
- Links com labels descritivos
- Heading hierarchy sequencial (h1→h2→h3)
