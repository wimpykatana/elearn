const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validation = require('./validation');
const JWT = require('../../services/jwt');

router.post('/adminuser/register', validation.create, controller.create);
router.post('/adminuser/login', validation.signin, controller.signin);
router.get('/adminuser/me', controller.session);
router.get('/adminuser/logout', JWT.verify, controller.sessionDestroy);

module.exports = router;
