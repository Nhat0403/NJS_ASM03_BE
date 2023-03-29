const User = require('../models/user');

exports.role = {
  customer: 'customer',
  counselor: 'counselor',
  admin: 'admin'
};

exports.setRole = (role) => {
  return (req, res, next) => {
    req.role = role;
    next();
  };
};