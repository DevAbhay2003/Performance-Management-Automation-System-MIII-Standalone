# =========================================================================
# THE NEOTIA UNIVERSITY (TNU) — MODULE III STANDALONE AUTOMATION SYSTEM
# Multi-stage production container
# =========================================================================

FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
WORKDIR /app/client
RUN npm install && npm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
COPY package*.json ./
RUN npm install --omit=dev
COPY server ./server
COPY --from=builder /app/client/dist ./client/dist
COPY data ./data

EXPOSE 5000
CMD ["node", "server/index.js"]
