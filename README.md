# jfernando.dev

Portfolio pessoal de **Jose Fernando Gomes Marcial** — Desenvolvedor Full Stack.

Construido com Nuxt 4, Tailwind CSS v4, e animacoes customizadas (typing effect, scroll-reveal, parallax, contadores animados).

## Tech Stack

- **Framework:** Nuxt 4 (Vue 3 + Nitro)
- **Estilos:** Tailwind CSS v4
- **Tipografia:** Syne + Space Grotesk (Google Fonts)
- **CI/CD:** GitHub Actions + GitHub Container Registry
- **Deploy:** Docker + Nginx + Let's Encrypt

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Acesse `http://localhost:3000`.

## CI/CD

O pipeline roda automaticamente a cada push:

| Workflow | Trigger | O que faz |
|----------|---------|-----------|
| **CI** | Push/PR em `main` | Lint + Typecheck |
| **Deploy** | Push em `main` | Build image → Push ghcr.io → Deploy via SSH |

```
Push na main
  -> CI: lint + typecheck
  -> Deploy: build Docker image
       -> Push para ghcr.io/fernandonepen/portfolio:latest
       -> SSH no servidor: docker compose pull && up -d
```

## Setup do Servidor (primeira vez)

### Pre-requisitos

- Servidor Linux com Docker instalado
- DNS: registros A para `jfernando.dev` e `www.jfernando.dev` apontando para o IP
- Portas 80, 443 e 22 liberadas

### Secrets do GitHub

Configure em **Settings > Secrets and variables > Actions**:

| Secret | Valor |
|--------|-------|
| `SERVER_HOST` | IP do servidor |
| `SERVER_USER` | Usuario SSH (ex: `root`) |
| `SERVER_SSH_KEY` | Chave privada SSH |

### Setup inicial

```bash
# No servidor
git clone https://github.com/fernandonepen/portfolio.git ~/portfolio
cd ~/portfolio
bash init-ssl.sh
```

A partir dai, cada push na `main` faz deploy automatico.

## Estrutura

```
app/
  components/     # NavBar, HeroSection, AboutSection, ExperienceSection,
                  # TechStackSection, EducationSection, ContactSection
  composables/    # useScrollReveal, useTypingEffect, useCounter,
                  # useMouseParallax, useScrollProgress
  assets/css/     # main.css (tema, animacoes, reveal classes)
  pages/          # index.vue
.github/workflows/
  ci.yml          # Lint + Typecheck
  deploy.yml      # Build image + push + deploy SSH
Dockerfile        # Multi-stage build (deps -> build -> production)
docker-compose.yml
nginx.conf        # Reverse proxy + SSL + cache de assets
init-ssl.sh       # Setup inicial do Let's Encrypt
```

## Licenca

MIT
