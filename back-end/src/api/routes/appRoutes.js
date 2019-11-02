const router = require('express-promise-router')();
const bodyParser = require('body-parser');
const productActionApi = require('../../actions/productActionApi');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));


router.post('/product/add', productActionApi.createProduct);

router.get('/products', productActionApi.findAllProducts);

router.get('/product/:id', productActionApi.findByIdProduct);

router.put('/product/:id', productActionApi.updateProduct);

router.delete('/products/:id', productActionApi.deleteProduct);

module.exports = router;
