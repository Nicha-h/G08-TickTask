# ── Stage 1: Build frontend ──────────────────────────────────────────
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# ── Stage 2: Install backend dependencies & generate Prisma ─────────
FROM node:20-alpine AS backend-build

WORKDIR /app/backend

# Install build tools needed for native modules (bcrypt)
RUN apk add --no-cache python3 make g++

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/prisma ./prisma
RUN npx prisma generate

COPY backend/ .

# ── Stage 3: Production image ────────────────────────────────────────
FROM node:20-alpine

RUN apk add --no-cache tini

WORKDIR /app

# Copy backend with dependencies
COPY --from=backend-build /app/backend ./

# Copy built frontend into public/ for static serving
COPY --from=frontend-build /app/frontend/dist ./public

# Ensure the SQLite data directory exists
RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Run Prisma migrations then start the server
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["sh", "-c", "npx prisma migrate deploy --schema ./prisma/schema.prisma && npm start"]
