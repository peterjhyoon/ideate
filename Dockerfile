# specify node version
FROM node:21

# set up work directory in container
WORKDIR /app

# copy package.json and package-lock.json
COPY server/package*.json ./server/

# server dependencies
RUN cd server && npm install

# copy client package and package-lock
COPY client/package*.json ./client/

# client dependencies
RUN cd client && npm install

# Copy source code
COPY . .

# build
WORKDIR /app/client
RUN npm run build

# server app static files from server
WORKDIR /app/server

# port to listen to
EXPOSE 3000

# start server
CMD ["npm", "start"]