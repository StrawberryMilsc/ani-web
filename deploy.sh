#!/bin/bash

# Pull the latest image
docker pull StrawburryMilk/ani-web:latest

# Stop and remove existing container
docker-compose down

# Start new container
docker-compose up -d

# Optionally, clean up old images
docker image prune -f