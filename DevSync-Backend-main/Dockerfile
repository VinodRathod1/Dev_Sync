# Use Node.js 20 Alpine as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5001

# Command to run the application
CMD ["node", "server.js"]
