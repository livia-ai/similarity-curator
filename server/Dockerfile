FROM node:lts-alpine

WORKDIR src
COPY data data/
COPY db db/
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
RUN npm run build