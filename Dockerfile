# Stage 1: Build the React app
# This sets up a Node.js environment for building the app
FROM node:24.11.1 AS build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy dependency files to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build


# Stage 2: Serve the built React app
# Use a lightweight Node.js image to serve static files
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install a lightweight static server to serve the React build
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist

# Expose port 3000 so the app is accessible
EXPOSE 3000

# Start the app using the `serve` command
CMD ["serve", "-s", "dist", "-l", "3000"]