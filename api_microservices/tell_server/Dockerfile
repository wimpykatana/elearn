FROM node:10.15.1

#install netcat
RUN apt-get update
RUN apt-get install -y bc
RUN apt-get install -y netcat
RUN apt-get install -y nano
RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository ppa:mc3man/trusty-media
RUN apt-get install -y ffmpeg


# Create app directory
WORKDIR /app/server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN npm install nodemon -g

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

ENTRYPOINT [ "sh", "./bin/entrypoint" ]