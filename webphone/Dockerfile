# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /react-docker-example

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json tsconfig.json /react-docker-example/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY build/ /react-docker-example/build
COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src

# Expose the application port (optional)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]


