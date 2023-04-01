const express = require('express');
const router = express.Router();

const historiesControllers = require('../controllers/histories');
const { permission, auth } = require('../middleware/auth');
const { role } = require('../middleware/role');

router.get('/', auth, permission('histories', 'getHistoryAPI'), historiesControllers.getHistoryAPI);
router.get('/:id', auth, permission('histories', 'getDetail'), historiesControllers.getDetail);

module.exports = router;