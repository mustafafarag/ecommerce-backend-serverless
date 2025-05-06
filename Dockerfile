# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port (make sure this matches your app)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
