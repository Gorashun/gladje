#!/usr/bin/env bash
# =============================================================================
# Glädje & Harmoni – Update Script
# Called by GitHub webhook on push to main
# =============================================================================
set -euo pipefail

APP_DIR="/var/www/gladje"
SERVICE_NAME="gladje-harmoni"
LOG_FILE="/var/log/$SERVICE_NAME-deploy.log"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }

log "=== Deploy started ==="

# ---------------------------------------------------------------------------
# 1. Pull latest code
# ---------------------------------------------------------------------------
log "Pulling latest code from origin/main..."
git -C "$APP_DIR" fetch origin main
git -C "$APP_DIR" reset --hard origin/main
log "Code updated to $(git -C "$APP_DIR" rev-parse --short HEAD)"

# ---------------------------------------------------------------------------
# 2. Install/update dependencies
# ---------------------------------------------------------------------------
log "Installing production dependencies..."
npm ci --production --prefix "$APP_DIR/server"
log "Dependencies up to date"

# ---------------------------------------------------------------------------
# 3. Run any pending DB migrations / schema updates
# ---------------------------------------------------------------------------
log "Running database setup..."
cd "$APP_DIR/server"
node scripts/setup-db.js >> "$LOG_FILE" 2>&1 || log "WARNING: setup-db reported an error (non-fatal)"

# ---------------------------------------------------------------------------
# 4. Restart service
# ---------------------------------------------------------------------------
log "Restarting $SERVICE_NAME..."
systemctl restart "$SERVICE_NAME"

# Wait a moment and check the service came up
sleep 3
if systemctl is-active --quiet "$SERVICE_NAME"; then
  log "Service $SERVICE_NAME is running"
else
  log "ERROR: Service $SERVICE_NAME failed to start"
  systemctl status "$SERVICE_NAME" >> "$LOG_FILE" 2>&1
  exit 1
fi

log "=== Deploy completed successfully ==="
