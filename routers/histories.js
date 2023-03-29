const express = require('express');
const router = express.Router();

const historiesControllers = require('../controllers/histories');

router.get('/', historiesControllers.getHistoryAPI);
router.get('/:id', historiesControllers.getDetail);

module.exports = router;