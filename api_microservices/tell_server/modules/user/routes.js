const express = require('express');
const router = express.Router();
const controller = require('./controller');
const JWT = require('../../services/jwt');
const validation = require('./validation');
const auth = require('../../services/auth');
const reCaptcha = require('../../services/reCaptcha');

router.get('/users', JWT.verify, controller.getAllUser);
// router.get('/users', controller.getAllUser);
router.get('/users/:id', controller.getSingleUser);
router.get('/user/me', controller.me);

router.get('/users/acc/logout', controller.logoutUser);
router.get('/users/acc/verify', controller.verifyUser);

router.post('/users/acc/regis', reCaptcha.verify, auth.verify, validation.create, controller.regisUser);
router.post('/users/acc/login', reCaptcha.verify, validation.signin, controller.loginUser);

/** ini belum dipasang validation usernya */
router.post('/user/update', controller.updateUser);  //ini untuk user change profile
router.post('/user/chnp', controller.changePaswProfile);  //ini untuk user change password dari profile page

router.post('/users/resetpassword', reCaptcha.verify, validation.resetpassword, controller.resetpassword);
router.get('/users/resetpassword/:token', validation.checktokenpassword, controller.checkTokenPassword);
router.post('/users/resetpassword/:token', reCaptcha.verify, validation.checktokenpassword, validation.forgetpassword, controller.updatePassword);
router.get('/user/verifyemail/:id', controller.verifyEmail)

//social network
router.post('/user/socialnetwork/login', controller.loginSocialNetwork);

// video chunk
router.get('/videos/:emiten/:id/:videoname', controller.videoStreamEmiten);
router.get('/videos/:subfolder/:videoname', controller.videoStreamSubFolder);
router.get('/videos/:videoname', controller.videoStream);

module.exports = router;