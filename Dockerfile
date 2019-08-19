FROM node:8.10.0
MAINTAINER "bogdanshishkin1998@gmail.com"
WORKDIR /app
COPY src /app/src
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.7
COPY . /app
EXPOSE 4200
ENTRYPOINT ng serve --host 0.0.0.0
