#!/bin/bash
# Setup inicial do servidor — execute uma vez
set -e

DOMAIN="jfernando.dev"
EMAIL="josefernandogmarcial@gmail.com"
PROJECT="portfolio"

echo "==> Fazendo pull da imagem..."
docker compose pull portfolio

echo "==> Subindo nginx (HTTP only)..."
docker compose up -d portfolio
docker run --rm -d --name nginx-temp \
  --network ${PROJECT}_default \
  -v "$(pwd)/nginx-http.conf:/etc/nginx/conf.d/default.conf:ro" \
  -v ${PROJECT}_certbot-webroot:/var/www/certbot:ro \
  -p 80:80 \
  nginx:alpine

echo "==> Gerando certificado SSL..."
docker run --rm \
  -v ${PROJECT}_certbot-webroot:/var/www/certbot \
  -v ${PROJECT}_certbot-certs:/etc/letsencrypt \
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
