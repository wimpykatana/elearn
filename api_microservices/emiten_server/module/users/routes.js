const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validation = require('./validation');
const JWT = require('../../services/jwt');

router.post('/user/register', validation.create, controller.create);
router.post('/user/login', validation.signin, controller.signin);
router.get('/user/list', JWT.verify, controller.list);
router.post('/user/upload', JWT.verify, controller.upload);
router.get('/user/me', controller.session);
router.get('/user/logout', JWT.verify, controller.sessionDestroy);

module.exports = router;