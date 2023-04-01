const express = require('express');
const { query } = require('express-validator/check');
const router = express.Router();

const authController = require('../controllers/auth');
const { setRole, role } = require('../middleware/role');
const User = require('../models/user');

const validateLogin = [
  query('email')
    .isEmail()
    .withMessage('Email invalid.')
    .normalizeEmail(),
  query('password', 'Password invalid.')
    .isLength({ min: 5 })
    .trim()
];

const validateSignUp = [
  query('email')
    .isEmail()
    .withMessage('Email invalid.')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
        .then(userDoc => {
          if(userDoc) {
            return Promise.reject('Email exists already');
          }
        })
    })
    .normalizeEmail(),
  query('password', 'Password invalid.')
    .isLength({ min: 5 })
    .trim(),
  query('fullname', 'Fullname invalid.')
    .trim(),
  query('phone')
    .isInt()
    .withMessage('Phone invalid.')
]

router.post(
  '/login', 
  validateLogin, 
  setRole(role.customer),
  authController.postLogin);

router.post(
  '/counselor/login', 
  validateLogin, 
  setRole(role.counselor), 
  authController.postLogin
);

router.post(
  '/signup', 
  validateSignUp, 
  setRole(role.customer),
  authController.postSignup,
);

router.post(
  '/counselor/signup', 
  validateSignUp, 
  setRole(role.counselor),
  authController.postSignup,
);

router.get('/:id', authController.getUserById);

module.exports = router;