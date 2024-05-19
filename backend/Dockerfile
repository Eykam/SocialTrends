FROM node:alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./ ./

RUN npm install

CMD sleep 3 && npm run start
