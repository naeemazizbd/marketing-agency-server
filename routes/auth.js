const { registration, login } = require('../controllers/auth');
const { registrationValidator } = require('../validators/auth');
const router = require('express').Router();

router.post('/sign-up', registrationValidator, registration);
router.post('/login', login);

module.exports = router;
