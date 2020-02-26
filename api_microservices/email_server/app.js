'use strict'

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const redisStore = require('connect-redis')(session);
const cors = require('cors');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 4002

// protect app
app.use(helmet());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// allow seession get from client
app.use(cors({
    origin: true,
    methods: ['PUT, POST, GET, DELETE, OPTIONS'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//set session configuration

const optionRedis = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
}

app.use(session({
    store: new redisStore(optionRedis),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      httpOnly: false,
      expires: process.env.ACTIVE_TOKEN_H * 60 * 60 * 1000,
      maxAge: process.env.ACTIVE_TOKEN_H * 60 * 60 * 1000
    }
  }));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: process.env.ROOT_FOLDER_UPLOAD,
    createParentPath: true
}));

const dbConfig = require('./config/db');
const users = require('./module/users');
const email = require('./module/email');

dbConfig.con();

app.use('/api/v1/email', [
    email,
    users
]);
// console.log('ini port email =>app.port())
module.exports = app;