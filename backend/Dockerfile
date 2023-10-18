FROM node:lts-alpine3.18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3001

CMD ["node", "server.js"]



