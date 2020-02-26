'use strict'

require('dotenv').config({path:__dirname+'/.env'});
const express = require('express');
const session = require('express-session');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const redisStore = require('connect-redis')(session);
const cors = require('cors');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3003
const cron = require('./cron');

// cron job
cron;

// protect app
app.use(helmet());

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
    resave: true,
    saveUninitialized: true
}));

const dbConfig = require('./config/db');
const auth = require('./module/auth');

dbConfig.con();

app.use('/api/v1/auth', [
    auth
]);

module.exports = app;
