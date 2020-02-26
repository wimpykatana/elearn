const express = require('express');
const router = express.Router();
const Controler = require('./controller');
const validation = require('./validation');
const auth = require('../../services/auth');
const jwt = require('../../services/jwt');

router.get('/queueing/ffmpeg', jwt.verify, Controler.ffmpegStatus);


module.exports = router;