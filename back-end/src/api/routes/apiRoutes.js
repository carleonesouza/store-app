const Router = require('express');
const bodyParser = require('body-parser');
const router = Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));



// Reuse database object in request handlers
router.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'API Connected successfully!',
  });
}); 

module.exports = router;
