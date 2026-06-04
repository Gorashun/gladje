# Deployment Guide – Glädje & Harmoni

## Serverkrav

- Ubuntu 22.04 LTS
- 1 GB+ RAM (2 GB rekommenderas)
- 20 GB+ diskutrymme
- Root-åtkomst (eller sudo)
- Domän: `gladjeharmoni.se` pekar på serverns IP

---

## Steg-för-steg

### 1. Anslut till servern

```bash
ssh root@YOUR_SERVER_IP
```

### 2. Installera Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node --version  # ska visa v20.x.x
```

### 3. Klona repot

```bash
git clone https://github.com/YOUR_ORG/gladje.git /var/www/gladje
cd /var/www/gladje
```

### 4. Kör installationsskriptet

```bash
sudo bash deploy/install.sh
```

Skriptet installerar automatiskt:
- Nginx
- Certbot (Let's Encrypt)
- Systemd service
- UFW firewall
- Node.js dependencies
- Databasen med exempelartiklar

### 5. Konfigurera .env

```bash
nano /var/www/gladje/server/.env
```

Fyll i:
```
MAILERLITE_API_KEY=din_api_nyckel_här
MAILERLITE_GROUP_ID=ditt_grupp_id_här
FRONTEND_URL=https://gladjeharmoni.se
NODE_ENV=production
```

Valfritt (per quiz-kategori):
```
MAILERLITE_GROUP_BORJA=group_id_för_nybörjare
MAILERLITE_GROUP_FORBATTRING=group_id_för_förbättring
MAILERLITE_GROUP_GOD=group_id_för_god_hälsobas
MAILERLITE_GROUP_OPTIMERARE=group_id_för_optimerare
MAILERLITE_AUTOMATION_GROUP_ID=group_id_för_quiz_resultat_automation
```

### 6. SSL med Certbot

```bash
certbot --nginx -d gladjeharmoni.se -d www.gladjeharmoni.se
```

Följ anvisningarna. Certbot uppdaterar nginx.conf automatiskt med SSL-sökvägar.

### 7. Starta om tjänsten

```bash
systemctl restart gladje-harmoni
systemctl status gladje-harmoni
```

Testa:
```bash
curl https://gladjeharmoni.se/health
```

---

## MailerLite API Key

1. Logga in på [MailerLite](https://app.mailerlite.com)
2. Gå till **Integrations → Developer API**
3. Kopiera API-nyckeln och klistra in i `.env`
4. Skapa en grupp per quiz-kategori under **Subscribers → Groups**
5. Kopiera grupp-ID:n (sista delen i URL:en) till `.env`

---

## GitHub Webhook (auto-deploy)

1. Gå till ditt GitHub-repo → **Settings → Webhooks → Add webhook**
2. Payload URL: `https://gladjeharmoni.se/webhook/github`
3. Content type: `application/json`
4. Secret: kopiera värdet av `WEBHOOK_SECRET` från `.env`
5. Events: välj **Just the push event**
6. Se till att `deploy/update.sh` är körbar:

```bash
chmod +x /var/www/gladje/deploy/update.sh
```

---

## Löpande underhåll

### Manuell uppdatering

```bash
bash /var/www/gladje/deploy/update.sh
```

### Loggar

```bash
# Application logs
journalctl -u gladje-harmoni -f

# Nginx access log
tail -f /var/log/nginx/gladje-harmoni.access.log

# Deploy log
tail -f /var/log/gladje-harmoni-deploy.log
```

### Säkerhetskopiera databasen

```bash
cp /var/www/gladje/server/data/gladje.db \
   /root/backups/gladje-$(date +%Y%m%d).db
```

Rekommenderat: sätt upp ett cron-jobb för daglig backup.

---

## GDPR & Privacy

- IP-adresser hashas med SHA-256 + salt – aldrig i klartext
- GDPR-raderingar via `DELETE /api/leads/:email` (kräver Bearer token)
- Avregistrering via `GET /api/leads/unsubscribe?email=...&token=...`
- Alla GDPR-förfrågningar loggas i `gdpr_requests`-tabellen

---

## Troubleshooting

**Service startar inte:**
```bash
systemctl status gladje-harmoni
journalctl -u gladje-harmoni --no-pager -n 50
```

**Port 3000 används redan:**
```bash
lsof -i :3000
```

**Nginx-fel:**
```bash
nginx -t
tail /var/log/nginx/error.log
```

**Databasproblem:**
```bash
cd /var/www/gladje/server && node scripts/setup-db.js
```
