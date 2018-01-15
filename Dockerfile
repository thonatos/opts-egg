FROM node:8.5-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm i --registry=https://registry.npm.taobao.org

COPY . /usr/src/app

EXPOSE 7001

CMD [ "npm", "start" ]