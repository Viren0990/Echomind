# Use official Node.js LTS image as base
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the code
COPY . .

RUN npx prisma generate

# Build the Next.js project
RUN npm run build 

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
