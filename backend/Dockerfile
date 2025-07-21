# backend/Dockerfile

# Используем официальный Node.js образ
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
