#!/bin/bash

git pull

docker stop rehoboam-ui
docker rm rehoboam-ui
docker rmi rehoboam-ui

cd /app

docker build -t rehoboam-ui .

docker-compose up -d

docker ps

echo "[Process complete]"
