FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Vue.js application
RUN npm run build

# Create data directory for notes
RUN mkdir -p data

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]