#!/bin/bash

# Build the Docker image from the deployment directory
echo "Building Docker image..."
cd ..  # Go back to root directory
docker build -f deployment/Dockerfile -t auction-system .

# Test the image locally (optional)
echo "Testing Docker image..."
docker run -d -p 3001:3001 --name auction-test auction-system

# Wait for the container to start
sleep 10

# Check if the container is running
if docker ps | grep -q auction-test; then
    echo "✅ Container is running successfully!"
    echo "�� Frontend available at: http://localhost:3001"
    echo "🔌 Backend API available at: http://localhost:3001"
else
    echo "❌ Container failed to start"
    docker logs auction-test
fi

# Stop and remove the test container
docker stop auction-test
docker rm auction-test

echo "Build completed! Image 'auction-system' is ready for deployment."