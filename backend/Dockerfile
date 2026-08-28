FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy dependency manifests first (layer caching)
COPY package.json package-lock.json* ./

RUN npm install --omit=dev

# Copy the rest of the source
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
