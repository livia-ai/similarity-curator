FROM node:lts-alpine

WORKDIR .
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
RUN npm run build
