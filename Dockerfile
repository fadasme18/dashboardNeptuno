FROM node:18.19.1 as angular
WORKDIR /app
COPY . .
RUN npm install --force

# Establecer NODE_OPTIONS para asignar más memoria al heap de Node.js
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

FROM httpd:alpine3.15
WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/dashboardNeptuno .