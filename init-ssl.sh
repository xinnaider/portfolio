#!/bin/bash
# Setup inicial do servidor — execute uma vez
set -e

DOMAIN="jfernando.dev"
EMAIL="josefernandogmarcial@gmail.com"

echo "==> Fazendo pull da imagem..."
docker compose pull portfolio

echo "==> Subindo nginx (HTTP only)..."
# Usa config temporária sem SSL para o Certbot validar o domínio
docker compose -f docker-compose.yml up -d portfolio
docker run --rm -d --name nginx-temp \
  --network portfolio_default \
  -v "$(pwd)/nginx-http.conf:/etc/nginx/conf.d/default.conf:ro" \
  -v certbot-webroot:/var/www/certbot:ro \
  -p 80:80 \
  nginx:alpine

echo "==> Gerando certificado SSL..."
docker run --rm \
  -v certbot-webroot:/var/www/certbot \
  -v certbot-certs:/etc/letsencrypt \
  certbot/certbot certonly \
  --webroot \
  -w /var/www/certbot \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  --non-interactive

echo "==> Parando nginx temporário..."
docker stop nginx-temp

echo "==> Subindo com HTTPS..."
docker compose up -d

echo "==> Pronto! https://$DOMAIN"
