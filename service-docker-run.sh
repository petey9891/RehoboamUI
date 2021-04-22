#!/bin/bash

git pull

docker stop rehoboam-ui-service
docker rm rehoboam-ui-service
docker rmi rehoboam-ui-service

cd /service

docker build -t rehoboam-ui-service .

docker-compose up -d

docker ps

echo "[Process complete]"
