# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire application code
COPY . .

# Expose the port defined in .env
EXPOSE 3000

# Command to start the app
CMD ["node", "src/app.js"]
