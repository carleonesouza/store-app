const router = require('express-promise-router')();
const bodyParser = require('body-parser');
const productActionApi = require('../../actions/productActionApi');
const vendersActionApi = require('../../actions/vendersActionApi');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));


router.post('/product/add', productActionApi.createProduct);
router.post('/vender/add', vendersActionApi.createBag);

router.get('/product', productActionApi.findAllProducts);
router.get('/vender', vendersActionApi.findAllBags);

router.get('/product/:id', productActionApi.findByIdProduct);

router.put('/product/:id', productActionApi.updateProduct);

router.delete('/product/:id', productActionApi.deleteProduct);

module.exports = router;
