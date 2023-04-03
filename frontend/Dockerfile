FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# # Build for production.
# RUN npm run build

# Install `serve` to run the application.
RUN npm install -g serve


CMD ["serve", "-s", "build"]
