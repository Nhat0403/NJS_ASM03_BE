const Product = require('../models/product');
const path = require('path');
const fs = require('fs');

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then(products => res.status(200).send(products))
    .catch(err => console.log(err));
}

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      if(!product) {
        res.status(404).send({ message: 'Product not found!' })
      }
      return res.status(200).send(product)
    })
    .catch(err => console.log(err));
}


exports.searchProductByQuery = (req, res, next) => {
  const { idUser, searchQuery } = req.query;
  if(searchQuery.trim() === '') {
    Product.find()
      .then(product => res.status(200).send(product))
      .catch(err => console.log(err));
  } else {
    // Product.find({ name: { $regex: searchQuery}})
    //   .then(product => res.status(200).send(product))
    //   .catch(err => console.log(err));
    Product.find()
      .then(product => {
        const filteredProduct = product.filter(p => p.name.toString().toLowerCase().includes(searchQuery.toString().toLowerCase()));
        return res.status(200).send(filteredProduct);
      })
      .catch(err => console.log(err));
  }
}

exports.postAddProduct = (req, res, next) => {
  const { idUser, category, img1, long_desc, name, price, short_desc } = req.body;
  console.log(req.file);
}
