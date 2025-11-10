# Backend (Fullstack Auth API)

This backend is an Express API for a simple authentication flow (register, login, profile).

Quick start (Windows PowerShell):

1. Install dependencies

```powershell
cd backend
npm install
```

2. Create a `.env` file (optional). If you don't provide `MONGO_URI`, the server will start an in-memory MongoDB automatically for local development.

You can copy the example:

```powershell
copy .env.example .env
```

3. Start the server in development mode (nodemon):

```powershell
npm run dev
```

The API will be available at http://localhost:5000 by default.

Endpoints:
- POST /api/auth/register  { name, email, password }
- POST /api/auth/login     { email, password }
- GET  /api/auth/profile   (requires Authorization: Bearer <token>)
