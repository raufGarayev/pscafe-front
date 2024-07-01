# Use Node.js 18 image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install --production

# Install TypeScript globally
RUN npm install -g typescript

RUN npm i --save-dev @types/react-dom

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Expose port 3002 (optional, depending on your setup)
EXPOSE 3005

# Run the built app
CMD ["npm", "run", "preview"]


