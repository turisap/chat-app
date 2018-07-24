# chat-app

A real-time chat application build with React and Redux on the front-end, Node + Socket.io on a back-end and Redis as a database. It was 
initially planned as a part of a larger application which hasn't been built so far, so it is quite poor in terms of styling and 
design for now.

## Getting Started

Clone the repository, run `npm install` in the root and in `./server`. Then you can `npm run app` in repo directory to get everything working.
Make sure you redis server is app and running. There are two parts on the backend: a node server which is responsible for handling API 
requests to redis database (on `port 3000`) and `socket.io` manager which works on `port 8080`. You can change those in `./server/index.js`
and `./server/.env` for the back-end and `./src/config/chatConfig.js` for requests from the front-end.

### Prerequisites

You need to make sure you redis server is up and running. I personally use docker for that purpose.

## Deployment

`npm run build` for a deployment build in `./dist`
