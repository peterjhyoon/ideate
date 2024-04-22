#
FROM node:21

# Set up work directory in container
WORKDIR /app

# COPY package.json and package-lock.json
COPY package*.json ./server/

# Server dependencies
RUN cd server && npm install

# Copy client package and package-lock
COPY client/package*.json ./client/

# Client dependencies
RUN cd client && npm install

# Copy source code
COPY . .

# Build
WORKDIR /app/client
RUN npm run build

# Server app static files from server
WORKDIR /app/server

# Port to listen to
EXPOSE 3000

# Start server
CMD ["npm", "start"]