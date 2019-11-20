const router = require('express-promise-router')();
const bodyParser = require('body-parser');
const productActionApi = require('../../actions/productActionApi');
const vendorsActionApi = require('../../actions/vendorsActionApi');
const billMethodAction = require('../../actions/billMethodActionApi');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));


router.post('/product/add', productActionApi.createProduct);
router.post('/populate/bag/add', vendorsActionApi.createBag);
router.post('/populate/vendor/add', vendorsActionApi.createVendor);
router.post('/populate/method', billMethodAction.createABill);

router.get('/product', productActionApi.findAllProducts);
router.get('/populate/bags', vendorsActionApi.findAllBags);
router.get('/populate/vendors', vendorsActionApi.findAVendors);
router.get('/populate/methods', billMethodAction.findABill);
router.get('/product/:id', productActionApi.findByIdProduct);

router.put('/product/:id', productActionApi.updateProduct);

router.delete('/product/:id', productActionApi.deleteProduct);

module.exports = router;
