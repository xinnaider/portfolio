#!/bin/bash
# Script para gerar o primeiro certificado SSL com Let's Encrypt
# Execute uma vez no servidor antes de usar o docker-compose completo

set -e

DOMAIN="jfernando.dev"
EMAIL="josefernandogmarcial@gmail.com"

echo "==> Subindo nginx temporário (só HTTP)..."
docker compose up -d nginx

echo "==> Gerando certificado para $DOMAIN..."
docker compose run --rm certbot certonly \
  --webroot \
  -w /var/www/certbot \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email

echo "==> Reiniciando nginx com HTTPS..."
docker compose restart nginx

echo "==> Subindo todos os serviços..."
docker compose up -d

echo "==> Pronto! https://$DOMAIN deve estar funcionando."
