# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 5173 for the app (change to the correct port if needed)
EXPOSE 5173

# Use npx to run the Vite development server with --host flag
CMD ["npx", "vite", "--host"]