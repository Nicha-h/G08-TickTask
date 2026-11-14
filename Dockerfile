# ── Stage 1: Build frontend ──────────────────────────────────────────
FROM node:24-alpine AS frontend-build

WORKDIR /app/frontend
# Public Neon URLs baked into the browser bundle (the secrets stay runtime-only)
ARG NEON_AUTH_BASE_URL
ARG NEON_REALTIME_URL
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# ── Stage 2: Install backend dependencies & generate Prisma ─────────
FROM node:24-alpine AS backend-build

WORKDIR /app/backend

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/prisma ./prisma
RUN npx prisma generate

COPY backend/ .

# ── Stage 3: Production image ────────────────────────────────────────
FROM node:24-alpine

RUN apk add --no-cache tini

WORKDIR /app

# Copy backend with dependencies
COPY --from=backend-build /app/backend ./

# Copy built frontend into public/ for static serving
COPY --from=frontend-build /app/frontend/dist ./public

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Run Prisma migrations (DATABASE_URL_UNPOOLED) then start the server; Neon vars come from the container env
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["sh", "-c", "npx prisma migrate deploy --schema ./prisma/schema.prisma && npm start"]
