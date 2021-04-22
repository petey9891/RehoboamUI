FROM node:12-alpine3.12 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

# RUN npm run build
# RUN npm run build-prod
RUN npm prune --production

FROM gcr.io/distroless/nodejs:12
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

WORKDIR /app

CMD ["dist/server.js"]