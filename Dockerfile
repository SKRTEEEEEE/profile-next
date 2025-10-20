# Multi-stage build for Next.js application

# ===== Base stage =====
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat wget
WORKDIR /app

# ===== Dependencies stage =====
FROM base AS deps

COPY package.json package-lock.json* ./
RUN npm ci

# ===== Development stage =====
FROM base AS development

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ===== Test stage =====
FROM base AS test

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=test
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["npm", "run", "test"]

# ===== Builder stage =====
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ===== Production stage =====
FROM base AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
