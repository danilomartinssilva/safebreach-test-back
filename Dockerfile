FROM node:14-alpine

WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3339
RUN npm run build

COPY ./dist ./dist

CMD [ "node", "dist/src/server.js" ]
