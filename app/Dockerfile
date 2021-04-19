FROM node:12-alpine3.12 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm prune --production

COPY . .

FROM gcr.io/distroless/nodejs:12

