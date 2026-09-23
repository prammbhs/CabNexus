# ─── Multi-Stage Dockerfile for CabNexus ────────────────────────────────────────

# Stage 1: Build Application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with caching layer
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and config
COPY . .

# Build production bundle
RUN npm run build

# ─── Stage 2: Production Nginx Server ──────────────────────────────────────────
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
