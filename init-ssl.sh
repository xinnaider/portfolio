#!/bin/bash
# Setup inicial do servidor — execute uma vez
set -e

DOMAIN="jfernando.dev"
EMAIL="josefernandogmarcial@gmail.com"

echo "==> Fazendo pull da imagem..."
docker compose pull portfolio

echo "==> Subindo nginx (HTTP only)..."
docker compose up -d nginx portfolio

echo "==> Gerando certificado SSL..."
docker compose run --rm certbot certonly \
  --webroot \
  -w /var/www/certbot \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email

echo "==> Reiniciando com HTTPS..."
docker compose up -d

echo "==> Pronto! https://$DOMAIN"
