# --------------------------------
# Builder
# --------------------------------
FROM node:20-alpine AS builder

# create working directory in container
WORKDIR /app

# copy package.json and package-lock.json to container
COPY package.json package-lock.json ./

# install dependencies
RUN npm install

# copy all files to container
COPY . .

# build the project
RUN npm run build

# --------------------------------
# Runner
# --------------------------------
FROM node:20-slim

# ensure that the app runs in production mode
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST="0.0.0.0"

# create working directory in container
WORKDIR /app

# copy package.json and package-lock.json to container
COPY package.json package-lock.json ./

# install dependencies
RUN npm install --omit=dev

# copy build files from builder
COPY --from=builder /app/dist ./dist

# expose port
EXPOSE 8080

# start the server
CMD ["node", "dist/index.js"]
