FROM node:10.15.1

#install netcat
RUN apt-get update
RUN apt-get install -y netcat

# Create app directory
WORKDIR /app/emiten

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN npm install nodemon -g

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3002

ENTRYPOINT [ "sh", "./bin/entrypoint" ]