# base image
FROM node:10.15.1

#install netcat
RUN apt-get update
RUN apt-get install -y netcat

# set working directory
RUN mkdir /usr/src/app
RUN chmod 755 -R /usr/src/app/
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /usr/src/app
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install -g nodemon
RUN npm install --silent

EXPOSE 3000
ENTRYPOINT [ "sh", "/usr/src/app/bin/entrypoint" ]