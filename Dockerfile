# Fase de construção
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Fase de produção
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --production

# Expõe a porta que o app vai usar
EXPOSE 3000

# Comando para iniciar o app
CMD ["npm", "run", "preview"]