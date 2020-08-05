FROM node:10.16.3
MAINTAINER Harry Nguyen

WORKDIR /var/source


# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source

COPY . /var/source
EXPOSE 4000

CMD [ "npm", "start" ]
