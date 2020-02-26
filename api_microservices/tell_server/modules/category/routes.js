const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/category', controller.getAllCategory);
router.post('/category/upload', controller.upload);
router.get('/categorycontent', controller.getAllCategoryAndContent);
router.post('/category', controller.createCategory);
router.get('/categoryByParent/:id',controller.getCategoryByParent); //get child category by parent ( id yg dikirm id_parent )
router.get('/category/:id', controller.getCategoryByid);
router.get('/categoryByName/:id', controller.getCategoryByName);
router.get('/admin/category', controller.getAllCategoryAdmin);
router.put("/category/update", controller.updateCategory);

module.exports = router;