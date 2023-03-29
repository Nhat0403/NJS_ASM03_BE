const User = require('../models/user');

exports.getCartsById = (req, res, next) => {
  const { idUser } = req.query;

  User.findById(idUser)
    .populate('cart.items.productId')
    .then(user => user.cart.items)
    .then(items => res.status(200).send(items))
    .catch(err => console.log(err));
};

exports.postAddToCart = (req, res, next) => {
  const { idUser, idProduct, count } = req.query;

  User.findById(idUser)
    .then(user => {
      const cartProductIndex = user.cart.items.findIndex(cp => {
        return cp.productId.toString() === idProduct.toString();
      })
      let newQuantity = count;
      const updatedCartItems = [...user.cart.items];

      if(cartProductIndex >=0) {
        newQuantity = +user.cart.items[cartProductIndex].quantity + +count;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
      } else {
        updatedCartItems.push({
          productId: idProduct,
          quantity: newQuantity
        })
      }
      const updatedCart = {
        items: updatedCartItems
      }
      user.cart = updatedCart;
      user.save();
      return res.status(200).send(user.cart.items);
    })
    .catch(err => console.log(err));
};

exports.putToCart = (req, res, next) => {
  const { idUser, idProduct, count } = req.query;

  User.findById(idUser)
    .then(user => {
      const cartProductIndex = user.cart.items.findIndex(cp => {
        return cp.productId.toString() === idProduct.toString();
      });
      user.cart.items[cartProductIndex].quantity = count;
      user.save();
      return res.status(200).send(user);
    })
    .catch(err => console.log(err));
};

exports.deleteToCart = (req, res, next) => {
  const { idUser, idProduct } = req.query;

  User.findById(idUser)
    .then(user => {
      const updatedCartItems = user.cart.items.filter(cp => {
        return cp.productId.toString() !== idProduct.toString();
      });
      user.cart.items = updatedCartItems;
      user.save();
      return res.status(200).send(user);
    })
    .catch(err => console.log(err));
};