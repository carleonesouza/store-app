const Router = require('express');
const bodyParser = require('body-parser');
const router = Router();
const actions = require('../../actions/managementAction')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));



router.post('/account/login', actions.login)
router.post('/account/check', actions.check)
router.post('/account/logout', actions.logout)

module.exports = router;
