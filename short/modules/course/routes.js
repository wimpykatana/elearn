const express = require('express');
const router = express.Router();
const Controler = require('./controller');
const validation = require('./validation');
const jwt = require('../../services/jwt');

router.get('/course', Controler.getAllcontent);
router.post('/course', jwt.verify, validation.create, Controler.createContent);
router.post('/course/search', Controler.search);
router.get('/course/:id',Controler.getSingleContent);
router.get('/coursebycategory/:categoryid', validation.getContentsByCategory, Controler.getContentByCategoryLanding);
router.post('/c/uploadvideo', Controler.uploadVideo);
router.post('/c/uploadvideoposter', Controler.uploadVideoPoster);
router.post('/c/uploaddisplayimage', Controler.uploadDisplayImage);
router.put('/course/', Controler.updateSingleContent);
router.get('/coursebycategorydetail/:id/:categoryId', Controler.getContentByCategoryDetail);
router.post('/ratevideo', Controler.rateVideo);
router.post('/israted', Controler.isRated);

module.exports = router;