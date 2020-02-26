const express = require('express');
const router = express.Router();

const Controler = require('./controller');
const validation = require('./validation');
const auth = require('../../services/auth');
const jwt = require('../../services/jwt');

router.post('/emiten', Controler.search);
router.get('/emiten', Controler.list);


module.exports = router;