#!/usr/bin/env bash

set -e  # encerra o script em caso de erro

# 1) Instalar ou atualizar o Nginx (Ubuntu/Debian) - ajuste para sua distro
echo ">>> Instalando ou atualizando o Nginx..."
apt-get update
apt-get install -y nginx

# 2) Criar a pasta /var/www/hi-snapqr-web caso não exista
if [ ! -d "/var/www/hi-snapqr-web" ]; then
  echo ">>> Criando /var/www/hi-snapqr-web..."
  mkdir -p /var/www/hi-snapqr-web
  # Exemplo de arquivo index.html provisório (se não houver build do Angular ainda)
  echo "<h1>Hi SnapQR Em construção...</h1>" > /var/www/hi-snapqr-web/index.html
fi

# 3) Copiar a configuração de Nginx (hi-snapqr-web.conf) para sites-available
#    (supondo que este script e o arquivo .conf estejam no mesmo diretório)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONF_SOURCE="${SCRIPT_DIR}/hi-snapqr-web.conf"
CONF_TARGET="/etc/nginx/sites-available/hi-snapqr-web.conf"

if [ ! -f "$CONF_SOURCE" ]; then
  echo "ERRO: Arquivo de configuração '$CONF_SOURCE' não encontrado!"
  exit 1
fi

echo ">>> Copiando configuração do Nginx para $CONF_TARGET ..."
cp "$CONF_SOURCE" "$CONF_TARGET"

# 4) Criar link simbólico em sites-enabled
echo ">>> Habilitando configuração de hi-snapqr-web..."
ln -sf "$CONF_TARGET" /etc/nginx/sites-enabled/hi-snapqr-web.conf

# 5) Testar configuração
echo ">>> Testando configuração do Nginx..."
nginx -t

# 6) Reiniciar (ou recarregar) o Nginx
echo ">>> Reiniciando Nginx..."
systemctl restart nginx

echo ">>> Deploy concluído com sucesso!"
echo ">>> Verifique se o site está acessível em http://hisnapqr.app/"
