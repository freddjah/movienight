# create a file named Dockerfile
FROM node:10.14.2

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npm", "run", "start"]