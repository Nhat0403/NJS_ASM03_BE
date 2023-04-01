const express = require('express');
const router = express.Router();

const ProductControllers = require('../controllers/products');
const OrderControllers = require('../controllers/order');
const UserControllers = require('../controllers/auth');
const { permission, auth } = require('../middleware/auth');

router.get('/products', auth, permission('admin', 'getAllProducts'), ProductControllers.getAllProducts);
router.post('/products/search', auth, permission('admin', 'searchProductByQuery'), ProductControllers.searchProductByQuery);
// router.post('/products/add-product', ProductControllers.postAddProduct);
router.get('/orders', auth, permission('admin', 'getAllOrders'), OrderControllers.getAllOrders);
router.get('/order', auth, permission('admin', 'getOrderById'), OrderControllers.getOrderById);
router.get('/users/clients', auth, permission('admin', 'getAllClients'), UserControllers.getAllClients);

module.exports = router;