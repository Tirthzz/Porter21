# Use Node LTS Alpine for smaller images
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package.json yarn.lock* package-lock.json* ./

COPY prisma ./prisma

# Install dependencies with yarn if yarn.lock exists, else npm
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else npm install; fi

# Copy the rest of your project
COPY . .

# Expose Next.js port
EXPOSE 3000

# Start the app using yarn
CMD ["yarn", "dev"]
