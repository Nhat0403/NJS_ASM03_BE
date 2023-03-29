const express = require('express');
const router = express.Router();

const ProductControllers = require('../controllers/products');

router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getProductById);

module.exports = router;