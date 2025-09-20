FROM node:20-alpine AS build
WORKDIR /app

# Copy entire monorepo to satisfy Vite aliases used by trace-viewer
COPY . .

# Install repo dependencies
RUN npm ci

# Build trace-viewer (service worker first, then app)
WORKDIR /app/packages/trace-viewer
RUN npx vite build -c ./vite.sw.config.ts
RUN npx vite build -c ./vite.config.ts

# Runtime image serving static assets with nginx
FROM nginx:alpine

# Copy build output to nginx web root
COPY --from=build /app/packages/playwright-core/lib/vite/traceViewer /usr/share/nginx/html

# Use hardened nginx config (path is relative to the build context root)
COPY packages/trace-viewer/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
