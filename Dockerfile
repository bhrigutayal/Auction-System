FROM node:20-alpine AS builder
WORKDIR /app/auction-client
COPY auction-client/ ./
RUN npm install
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --production
COPY server.js ./
COPY --from=builder /app/auction-client/.next ./auction-client/.next
COPY --from=builder /app/auction-client/public ./auction-client/public
EXPOSE 8080
CMD ["node", "server.js"]