#!/usr/bin/env bash
# =============================================================================
# Glädje & Harmoni – Installation Script
# Run as root on a fresh Ubuntu 22.04 server
# Usage: sudo bash install.sh
# =============================================================================
set -euo pipefail

APP_DIR="/var/www/gladje"
APP_USER="www-data"
SERVICE_NAME="gladje-harmoni"
REPO_URL="${REPO_URL:-https://github.com/YOUR_ORG/gladje.git}"
NODE_VERSION="20"

info()    { echo "[INFO]  $*"; }
success() { echo "[OK]    $*"; }
error()   { echo "[ERROR] $*" >&2; exit 1; }

# ---------------------------------------------------------------------------
# 1. System packages
# ---------------------------------------------------------------------------
info "Updating system packages..."
apt-get update -qq
apt-get install -y -qq curl git nginx certbot python3-certbot-nginx ufw

# ---------------------------------------------------------------------------
# 2. Node.js 20 LTS via NodeSource
# ---------------------------------------------------------------------------
if ! command -v node &>/dev/null || [[ "$(node -e 'process.stdout.write(process.version.split(".")[0].slice(1))')" != "$NODE_VERSION" ]]; then
  info "Installing Node.js $NODE_VERSION LTS..."
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | bash -
  apt-get install -y nodejs
  success "Node.js $(node --version) installed"
else
  success "Node.js $(node --version) already installed"
fi

# ---------------------------------------------------------------------------
# 3. Clone or update repository
# ---------------------------------------------------------------------------
if [[ -d "$APP_DIR/.git" ]]; then
  info "Repository already cloned, pulling latest..."
  git -C "$APP_DIR" pull origin main
else
  info "Cloning repository to $APP_DIR..."
  git clone "$REPO_URL" "$APP_DIR"
fi
success "Repository ready at $APP_DIR"

# ---------------------------------------------------------------------------
# 4. Install Node.js dependencies
# ---------------------------------------------------------------------------
info "Installing production dependencies..."
npm ci --production --prefix "$APP_DIR/server"
success "Dependencies installed"

# ---------------------------------------------------------------------------
# 5. Environment configuration
# ---------------------------------------------------------------------------
ENV_FILE="$APP_DIR/server/.env"
if [[ ! -f "$ENV_FILE" ]]; then
  info "Creating .env from template..."
  cp "$APP_DIR/server/.env.example" "$ENV_FILE"
  # Generate a random webhook secret
  RAND_SECRET=$(node -e "require('crypto').randomBytes(32).toString('hex').split('').join('') |0; process.stdout.write(require('crypto').randomBytes(32).toString('hex'))")
  sed -i "s/your_github_webhook_secret_here/$RAND_SECRET/" "$ENV_FILE"
  RAND_SALT=$(node -e "process.stdout.write(require('crypto').randomBytes(16).toString('hex'))")
  echo "IP_HASH_SALT=$RAND_SALT" >> "$ENV_FILE"
  echo "NODE_ENV=production" >> "$ENV_FILE"
  echo ""
  echo "  ================================================================"
  echo "  IMPORTANT: Edit $ENV_FILE and set:"
  echo "    MAILERLITE_API_KEY=..."
  echo "    MAILERLITE_GROUP_ID=..."
  echo "    FRONTEND_URL=https://gladjeharmoni.se"
  echo "  ================================================================"
  echo ""
else
  info ".env file already exists, skipping template copy"
fi

# ---------------------------------------------------------------------------
# 6. Create data directory and initialize database
# ---------------------------------------------------------------------------
info "Initializing database..."
mkdir -p "$APP_DIR/server/data"
chown -R "$APP_USER:$APP_USER" "$APP_DIR/server/data"
sudo -u "$APP_USER" node "$APP_DIR/server/scripts/setup-db.js"
success "Database initialized"

# ---------------------------------------------------------------------------
# 7. Nginx configuration
# ---------------------------------------------------------------------------
info "Configuring Nginx..."
cp "$APP_DIR/deploy/nginx.conf" "/etc/nginx/sites-available/$SERVICE_NAME"
ln -sf "/etc/nginx/sites-available/$SERVICE_NAME" "/etc/nginx/sites-enabled/$SERVICE_NAME"
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
success "Nginx configured"

# ---------------------------------------------------------------------------
# 8. Systemd service
# ---------------------------------------------------------------------------
info "Installing systemd service..."
cp "$APP_DIR/deploy/$SERVICE_NAME.service" "/etc/systemd/system/$SERVICE_NAME.service"
systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl start "$SERVICE_NAME"
success "Service $SERVICE_NAME started"

# ---------------------------------------------------------------------------
# 9. UFW firewall
# ---------------------------------------------------------------------------
info "Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
success "Firewall configured"

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
echo ""
echo "============================================================"
echo " Installation complete!"
echo ""
echo " Next steps:"
echo "  1. Edit $ENV_FILE with your API keys"
echo "  2. Run: certbot --nginx -d gladjeharmoni.se -d www.gladjeharmoni.se"
echo "  3. Set up GitHub webhook (see deploy/README.md)"
echo "  4. Restart service: systemctl restart $SERVICE_NAME"
echo "============================================================"
