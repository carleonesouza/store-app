const router = require('express-promise-router')();
const productController = require('../controllers/product.controller');

router.post('/product/add', productController.create);

router.get('/products', productController.findAll);

router.get('/product/:id', productController.findById);

router.put('/product/:id', productController.update);

router.delete('/products/:id', productController.delete);

module.exports = router;