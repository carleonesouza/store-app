const router = require('express-promise-router')();
const bodyParser = require('body-parser');
const productActionApi = require('../../actions/productActionApi');
const vendorsActionApi = require('../../actions/vendorsActionApi');
const billMethodAction = require('../../actions/billMethodActionApi');
const userActionApi = require('../../actions/userActionApi');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));


router.post('/product/add', productActionApi.createProduct);
// router.post('/populate/bag/add', vendorsActionApi.createBag);
router.post('/vendor/add', vendorsActionApi.createVendor);
router.post('/method', billMethodAction.createABill);
router.post('/singup', userActionApi.createUser);

router.get('/products', productActionApi.findAllProducts);
// router.get('/bags', vendorsActionApi.findAllBags);
router.get('/vendors', vendorsActionApi.findAVendors);
router.get('/methods', billMethodAction.findABill);
router.get('/product/:id', productActionApi.findByIdProduct);


router.put('/product/:id', productActionApi.updateProduct);

router.delete('/product/:id', productActionApi.deleteProduct);

module.exports = router;
