const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validation = require('./validation');

router.get('/gettoken', validation.token, controller.token);
router.get('/signin', validation.signin, controller.signin)

module.exports = router;