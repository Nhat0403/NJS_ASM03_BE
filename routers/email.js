const express = require('express');
const router = express.Router();

const emailControllers = require('../controllers/email');

router.post('/', emailControllers.postEmail);

module.exports = router;