# NewsMania

A modern news aggregation platform with real-time updates and personalized category subscriptions.

## Features

- Real-time news updates
- Category-based news filtering
- User subscriptions to favorite categories
- Article read time estimation
- Like and view tracking

## Installation

### Client Setup

1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Server Setup

1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Start server: `node index.js`

## API Documentation

API documentation is available via Swagger UI when the server is running at `/api-docs`.

## Database Schema

News articles are stored with the following fields:

- Title
- Content
- Category
- Author
- Read time (minutes)
- Likes count
- Views count
- Timestamp

## Deployment

### Docker

1. Build images: `docker-compose build`
2. Start containers: `docker-compose up`

### Kubernetes

1. Apply configurations: `kubectl apply -f k8s/`
2. Access via ingress or port-forward
