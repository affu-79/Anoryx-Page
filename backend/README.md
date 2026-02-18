# Anoryx Backend — Contact API

Sends contact form submissions to **afnan.ceo@anoryxtechsolutions.com** via email.

## Run locally

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set SMTP_USER + SMTP_PASS (Gmail App Password)
node server.js
```

Server runs on **http://localhost:5000**. The frontend (Vite) uses `VITE_API_URL=http://localhost:5000` by default when not set.

## Gmail setup

1. Use **Google App Password** (not your normal password): [Google App Passwords](https://myaccount.google.com/apppasswords).
2. In `.env` set:
   - `SMTP_USER=afnan.ceo@anoryxtechsolutions.com`
   - `SMTP_PASS=<your-16-char-app-password>`

## Endpoints

- `POST /api/contact` — body: `{ fullName, workEmail, companyName?, subject?, message }`. Sends email to `CONTACT_EMAIL`.
- `GET /api/health` — returns `{ ok: true }`.

## Production

Set `PORT` and `VITE_API_URL` (frontend) to your backend URL. Ensure `.env` is not committed (use your host’s env config).
