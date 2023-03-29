const Order = require('../models/order');

exports.getHistoryAPI = (req, res, next) => {
  const { idUser } = req.query;
  Order.find({ userId: idUser })
    .populate('userId')
    .then(orders => res.status(200).send(orders))
    .catch(err => console.log(err));
};

exports.getDetail = (req, res, next) => {
  const { id } = req.params;
  Order.findById(id)
    .populate('userId')
    .populate('products.productId')
    .then(order => {
      order.userId = order.userId._id;
      return res.status(200).send(order);
    })
    .catch(err => console.log(err));
}