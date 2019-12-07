const Router = require('express');
const bodyParser = require('body-parser');
const userActionApi = require('../../actions/userActionApi');
const router = Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));



// Reuse database object in request handlers
router.post('/login', userActionApi.authenticateUser)
/* router.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'API Connected successfully!',
  });
}); */

module.exports = router;
