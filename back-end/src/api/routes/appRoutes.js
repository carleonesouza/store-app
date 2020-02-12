const router = require('express-promise-router')();
const bodyParser = require('body-parser');
const productActionApi = require('../../actions/productActionApi');
const vendorsActionApi = require('../../actions/vendorsActionApi');
const billMethodAction = require('../../actions/billMethodActionApi');
const userActionApi = require('../../actions/userActionApi');
const walletActionApi = require('../../actions/walletActionApi');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));


router.post('/product/add', productActionApi.createProduct);
router.post('/vendor/add', vendorsActionApi.createVendor);
router.post('/method', billMethodAction.createABill);
router.post('/create-user', userActionApi.createUser);
router.post('/wallet/add', walletActionApi.createWallet);
router.post('/wallet/add/vendor', walletActionApi.addAVendorAWallet);
router.post('/wallet/add/bill', walletActionApi.addAVendorABill);

router.get('/wallet/:date', walletActionApi.findAWallet);
router.get('/products', productActionApi.findAllProducts);
router.get('/wallets', walletActionApi.findAllWallets);
router.get('/users', userActionApi.findAllUsers);
router.get('/user/:id', userActionApi.findUserById);
router.get('/user/:email', userActionApi.findUserByEmail);
router.get('/vendors', vendorsActionApi.findAVendors);
router.get('/methods', billMethodAction.findABill);
router.get('/product/:id', productActionApi.findByIdProduct);
router.get('/vendors/populates', vendorsActionApi.findVendorsByProduct);

router.put('/product/:id', productActionApi.updateProduct);

router.delete('/product/:id', productActionApi.deleteProduct);

module.exports = router;
