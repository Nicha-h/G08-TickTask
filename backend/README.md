# TickTask API

Hono + Prisma API for TickTask, backed by PostgreSQL on Neon. Sign-in is handled by Neon Auth; this API only verifies the JWT.

## Setup

Environment variables come from the repo root `.env.local`. To create it, run these in the repo root:

```bash
npm install -g neon
neon login
neon link --project-id <project-id>   # ask a teammate, or copy it from the Neon Console
neon env pull
```

`.env.example` lists every variable, including the Cloudinary keys you add yourself.

```bash
npm install
npm run db:migrate
npm run dev
```

The API runs on http://localhost:3000. Swagger UI is at `/swagger` and the OpenAPI spec at `/doc`.

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the API with reload on change |
| `npm start` | Start the API without reload |
| `npm run build` | Generate the Prisma client and type-check |
| `npm run db:migrate` | Apply Prisma migrations to the Neon database |
| `npm test` | Run the API tests in `test.mjs` |
