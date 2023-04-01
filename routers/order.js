const express = require('express');
const router = express.Router();

const orderControllers = require('../controllers/order');
const { permission, auth } = require('../middleware/auth');
const { role } = require('../middleware/role');

router.post('/', auth, permission('order', 'postOrder'), orderControllers.postOrder);

module.exports = router;