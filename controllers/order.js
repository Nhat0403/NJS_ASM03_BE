const Order = require('../models/order');
const User = require('../models/user');

exports.postOrder = (req, res, next) => {
  const { cookieId, products, total, fullname, email, phone, address } = req.query;

  User.findById(cookieId)
    .then(user => {
      const order = new Order({
        userId: cookieId,
        total: total,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        delivery: 'Chưa Vận Chuyển',
        status: 'Chưa Thanh Toán',
        products: []
      });
      order.products = user.cart.items;
      order.save();
      // user.cart = [];
      // user.save();
      return res.status(200).send(order);
    })
    .catch(err => console.log(err));
}

exports.getAllOrders = (req, res, next) => {
  const { cookieId } = req.query;
  Order.find()
    .sort({ updatedAt: -1 })
    .then(orders => {
      const date = new Date();
      const month = date.getMonth() + 1;
      const earningThisMonth = orders
        .filter(o => o.status === 'Đã Thanh Toán')
        .filter(o => +o.updatedAt.slice(5,7) === month)
        .reduce((cur, mov) => cur + mov, 0);
      const newOrders = orders
        .filter(o => o.delivery !== 'Đã Giao Hàng');
      return res.status(200).send({ orders: orders, earningThisMonth: earningThisMonth, newOrders: newOrders });
    })
    .catch(err => console.log(err));
}

exports.getOrderById = (req, res, next) => {
  const { cookieId, orderId } = req.query;
  Order.findById(orderId)
    .then(order => res.status(200).send(order))
    .catch(err => console.log(err));
}