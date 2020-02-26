const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validation = require('./validation');
const JWT = require('../../services/jwt');

router.post('/send', validation.send, controller.send);

module.exports = router;