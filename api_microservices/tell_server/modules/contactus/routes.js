const express = require('express');
const router = express.Router();

const Controler = require('./controller');
const validation = require('./validation');
const auth = require('../../services/auth');
const jwt = require('../../services/jwt');

const reCaptcha = require('../../services/reCaptcha');

router.post('/contactus', reCaptcha.verify, Controler.create);


module.exports = router;