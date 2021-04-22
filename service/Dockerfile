FROM node:12-alpine3.12 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build-unix
RUN npm prune --production

FROM gcr.io/distroless/nodejs:12
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/crypto /app/crypto

WORKDIR /app

CMD ["build/service.js"]