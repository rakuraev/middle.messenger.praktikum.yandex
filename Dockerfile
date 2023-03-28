FROM alpine:latest

RUN apk add --update nodejs npm g++ make py3-pip 

RUN mkdir /app

WORKDIR /app

COPY  . /app

RUN npm i && npm run build:docker
