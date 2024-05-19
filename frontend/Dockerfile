FROM node:latest

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN yes | npm install -g npm
RUN yes | npm install

COPY ./client/package.json ./client/package.json
COPY ./client/package-lock.json ./client/package-lock.json
COPY ./client/public ./client/public
COPY ./client/src ./client/src

RUN cd ./client && npm install --omit-dev=true && npm run build

COPY ./index.js ./index.js


CMD [ "node", "index.js"]