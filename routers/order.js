const express = require('express');
const router = express.Router();

const orderControllers = require('../controllers/order');
const { permission } = require('../middleware/auth');
const { role } = require('../middleware/role');

router.post('/', permission(role.customer), orderControllers.postOrder);

module.exports = router;