'use strict'

require('dotenv').config({path: __dirname+'/.env'});
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
const redisStore = require('connect-redis')(session);
var dbConfig = require('./config/db');
var fileUpload = require('express-fileupload');
const helmet = require('helmet');
var adminuser = require('./modules/adminuser');
var users = require('./modules/user');
var course = require('./modules/course');
var category = require('./modules/category');
var queueing = require('./modules/queueing');
var emiten = require('./modules/emiten');
var contactus = require('./modules/contactus');

var http = require('http');
const socketIO = require('socket.io');

/* Api */
// var users = require('./routes/users');
// var courses = require('./modules/course');
// const seeder = require('./seeder/index.js');

var app = express();


// protect app
app.use(helmet());


/** DATABASE Connect */
dbConfig.con();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });

// allow seession get from client
app.use(cors({
    origin: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//set session configuration
const optionRedis = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_POR
}

app.use(session({
    /** harus ada install redis di local atau line storenya di comment aja buat bypass  */
    // store: new redisStore(optionRedis),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: false,
        expires: process.env.ACTIVE_TOKEN_H * 60 * 60 * 1000,
        maxAge: process.env.ACTIVE_TOKEN_H * 60 * 60 * 1000
    }
}));

//upload file
app.use(fileUpload())
// app.use('/public', express.static(__dirname + '/public'))

// implement ejs for email templet
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

const io = socketIO(server);

//assign socket to controllers
app.use(function (req, res, next) {
  req.io = io;
  
  next();
});

app.use('/api/v1', [
    adminuser,
    users,
    course,
    category,
    queueing,
    emiten,
    contactus
]);
// ini ip4
// server.listen(port:q,'127.0.0.1');

// ini ip6
server.listen(port);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = server;
