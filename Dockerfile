FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Instala Angular CLI
RUN npm install -g @angular/cli

# Compila la aplicación Angular

RUN ng build 

EXPOSE 4200

CMD ["npm", "start"]