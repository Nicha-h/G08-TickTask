# TickTask API

Hono + Prisma API for TickTask, backed by PostgreSQL on Neon. Sign-in is handled by Neon Auth; this API only verifies the JWT.

## Setup

Environment variables come from the repo root `.env.local` (run `neon env pull` in the repo root). See `.env.example` for the full list.

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
