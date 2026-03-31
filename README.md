# jfernando.dev

Portfolio pessoal de **Jose Fernando Gomes Marcial** — Desenvolvedor Full Stack.

Construido com Nuxt 4, Tailwind CSS v4, e animacoes customizadas (typing effect, scroll-reveal, parallax, contadores animados).

## Tech Stack

- **Framework:** Nuxt 4 (Vue 3 + Nitro)
- **Estilos:** Tailwind CSS v4
- **Tipografia:** Syne + Space Grotesk (Google Fonts)
- **Deploy:** Docker + Nginx + Let's Encrypt

## Desenvolvimento

```bash
# Instalar dependencias
pnpm install

# Servidor de desenvolvimento
pnpm dev
```

Acesse `http://localhost:3000`.

## Build

```bash
pnpm build
```

## Deploy (Producao)

### Pre-requisitos

- Servidor Linux com Docker instalado
- Dominio apontando para o IP do servidor (registros A para `jfernando.dev` e `www.jfernando.dev`)
- Portas 80 e 443 liberadas no firewall

### Subir

```bash
# Primeira vez — gera certificado SSL e sobe tudo
bash init-ssl.sh

# Atualizacoes
git pull && docker compose up -d --build
```

### Arquitetura

```
Cliente -> Nginx (80/443) -> Node.js container (3000)
                |
          Let's Encrypt (renovacao automatica a cada 12h)
```

## Estrutura

```
app/
  components/     # NavBar, HeroSection, AboutSection, ExperienceSection,
                  # TechStackSection, EducationSection, ContactSection
  composables/    # useScrollReveal, useTypingEffect, useCounter,
                  # useMouseParallax, useScrollProgress
  assets/css/     # main.css (tema, animacoes, reveal classes)
  pages/          # index.vue
Dockerfile        # Multi-stage build (deps -> build -> production)
docker-compose.yml
nginx.conf        # Reverse proxy + SSL + cache de assets
init-ssl.sh       # Setup inicial do Let's Encrypt
```

## Licenca

MIT
