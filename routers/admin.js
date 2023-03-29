const express = require('express');
const router = express.Router();

const ProductControllers = require('../controllers/products');
const OrderControllers = require('../controllers/order');
const UserControllers = require('../controllers/auth');

router.get('/products', ProductControllers.getAllProducts);
router.post('/products/search', ProductControllers.searchProductByQuery);
// router.post('/products/add-product', ProductControllers.postAddProduct);
router.get('/orders', OrderControllers.getAllOrders);
router.get('/order', OrderControllers.getOrderById);
router.get('/users/clients', UserControllers.getAllClients);

module.exports = router;