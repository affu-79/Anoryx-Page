# Production Deployment

This document covers how to deploy the Anoryx frontend and backend for production.

## Backend

### Environment variables

Set these in your production environment (e.g. host dashboard or server `.env`). Do not commit `.env`.

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Recommended | Set to `production` so CORS and error responses are strict. |
| `FRONTEND_ORIGIN` | Production | Allowed frontend origin(s), comma-separated (e.g. `https://anoryx.com,https://www.anoryx.com`). |
| `MONGODB_URI` or `MONGO_URI` | Yes | MongoDB Atlas connection string. |
| `JWT_SECRET` | Yes | Strong random string for JWT signing. |
| `GOOGLE_CLIENT_ID` | Yes (for Google sign-in) | Same Web client ID as frontend. |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth client secret. |
| `GOOGLE_REDIRECT_URI` | Optional | Redirect URI if using redirect-based OAuth. |
| `CONTACT_EMAIL` | Optional | Where contact form messages are sent. |
| `SMTP_*` | Optional | SMTP settings for contact form email. |
| `PORT` | Optional | Server port (default 5000). |
| `RATE_LIMIT_WINDOW_MS` | Optional | Auth rate limit window in ms (default 900000). |
| `RATE_LIMIT_MAX` | Optional | Max auth requests per window per IP (default 20). |

### Run

```bash
cd backend
npm install
node server.js
```

Use a process manager (e.g. PM2) in production for restarts and logging.

---

## Frontend

### Build with production env

Set `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID` to your production values **at build time**. Vite bakes them into the bundle.

```bash
cd frontend
npm install
VITE_API_URL=https://api.yourdomain.com VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com npm run build
```

Or set them in your CI/host environment and run `npm run build`.

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Full URL of the backend API (e.g. `https://api.yourdomain.com`). |
| `VITE_GOOGLE_CLIENT_ID` | Yes (for Google sign-in) | Google OAuth 2.0 Web client ID. |

### Deploy

Deploy the contents of `frontend/dist/` to a static host (Vercel, Netlify, S3 + CloudFront, etc.) with HTTPS.

---

## Google Cloud Console

For “Sign in with Google” to work in production:

1. Open [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials.
2. Edit your OAuth 2.0 Client ID (Web application).
3. Under **Authorized JavaScript origins**, add your production frontend URL(s), e.g. `https://yourdomain.com`, `https://www.yourdomain.com`.
4. Under **Authorized redirect URIs**, add any production redirect URLs if you use them.

---

## Checklist

- [ ] Backend: `NODE_ENV=production` and `FRONTEND_ORIGIN` set.
- [ ] Backend: Strong `JWT_SECRET`; never commit it.
- [ ] Backend: MongoDB Atlas connection string and network access (IP allowlist or VPC) configured.
- [ ] Frontend: Built with production `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID`.
- [ ] Frontend and backend served over **HTTPS**.
- [ ] Google Console: Production URLs added to Authorized JavaScript origins.
- [ ] `.env` and `.env.local` are in `.gitignore` and never committed.
