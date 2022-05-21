FROM node:14-alpine

RUN mkdir /usr/app
WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 3339
ENTRYPOINT  [ "node", "dist/src/server.js" ]
