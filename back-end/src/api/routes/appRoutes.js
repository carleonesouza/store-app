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


router.post('/products/add', productActionApi.createProduct);
router.post('/categories/add', vendorsActionApi.createCategory);
// router.post('/method', billMethodAction.createABill);
router.post('/create-user', userActionApi.createUser);
router.post('/wallets/add', walletActionApi.createWallet);
router.post('/wallets/add/vendor', walletActionApi.addAVendorAWallet);
router.post('/wallets/add/bill', walletActionApi.addABillAWallet);
router.post('/wallets', walletActionApi.findAllWallets);
router.post('/wallets/:date', walletActionApi.findAWallet);

router.get('/wallets/bills', walletActionApi.getAWalletWithBills);
router.get('/wallets/:id', walletActionApi.findAWallet);
router.get('/wallets/user/:userId', walletActionApi.findAWalletByUserId);
router.get('/products', productActionApi.findAllProducts);
router.get('/categories', vendorsActionApi.findAllCategories);
router.get('/users', userActionApi.findAllUsers);
router.get('/users/:id', userActionApi.findUserById);
router.get('/vendors', vendorsActionApi.findAVendors);
router.get('/methods', billMethodAction.findABill);
router.get('/products/:id', productActionApi.findByIdProduct);
router.get('/vendors/populates', vendorsActionApi.findVendorsByProduct);

router.put('/products/:id', productActionApi.updateProduct);
router.put('/wallets/:id', walletActionApi.closeAWallet);

router.delete('/products/:id', productActionApi.deleteProduct);

module.exports = router;
