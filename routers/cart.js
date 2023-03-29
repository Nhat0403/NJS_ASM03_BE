const express = require('express');
const router = express.Router();

const cartControllers = require('../controllers/cart');

router.get('/', cartControllers.getCartsById);
router.post('/add', cartControllers.postAddToCart);
router.put('/update', cartControllers.putToCart);
router.delete('/delete', cartControllers.deleteToCart);

module.exports = router;