const express = require('express');
const router = express.Router();

const emailControllers = require('../controllers/email');
const { auth, permission } = require('../middleware/auth');
const { role } = require('../middleware/role');

router.post('/', auth, permission('email', 'postEmail'), emailControllers.postEmail);

module.exports = router;