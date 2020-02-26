# base image
FROM node:10.15.1

# set working directory
RUN mkdir /usr/src/admin
WORKDIR /usr/src/admin

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/admin/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /usr/src/admin
COPY package.json /usr/src/admin/package.json
COPY package-lock.json /usr/src/admin/package-lock.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# start app
CMD ["npm", "start"]