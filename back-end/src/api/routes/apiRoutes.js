const Router = require('express');

const router = Router();

// Reuse database object in request handlers
router.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'API Connected successfully!',
  });
});

module.exports = router;
