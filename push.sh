#!/bin/bash

if [ -z "$1" ]; then
  echo "Por favor, forneça a tag como argumento."
  exit 1
fi

# Atribui o primeiro argumento à variável TAG
TAG="$1"

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 068497365251.dkr.ecr.us-east-1.amazonaws.com
docker build -t bertie-v2-backend/dev:$TAG .
docker tag bertie-v2-backend/dev:$TAG 068497365251.dkr.ecr.us-east-1.amazonaws.com/bertie-v2-backend/dev:$TAG
docker push 068497365251.dkr.ecr.us-east-1.amazonaws.com/bertie-v2-backend/dev:$TAG
