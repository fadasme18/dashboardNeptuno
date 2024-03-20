FROM node:18.19.1 as angular
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install --force
RUN npm install -g @angular/cli@16.2.1

COPY . /app

# Establecer NODE_OPTIONS para asignar más memoria al heap de Node.js
ENV NODE_OPTIONS="--max-old-space-size=4096"

CMD ng serve --host 0.0.0.0



