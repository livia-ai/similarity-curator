FROM node:lts-alpine

WORKDIR dist
COPY dist dist/
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
