FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source files
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
