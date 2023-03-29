const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Session = require('../models/session');
const { role } = require('../middleware/role');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

exports.postLogin = (req, res, next) => {
  const { email, password } = req.query;
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).send({ message: errors.array()[0].msg })
  }

  User.findOne({ email: email })
    .then(user => {
      if(!user) {
        return res.status(422).send({ message: 'Invalid email or password!' })
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if(!doMatch) {
            return res.status(422).send({ message: 'Wrong password!' })
          }
          if(
            user.role === req.role ||
            user.role === role.admin
          ) {
            // return res.status(200).send({ user: { ...user._doc, token }});
            // return res.status(200).send({ ...user._doc, token: session._id });
            return res.status(200).send(user);
          } else {
            return res.status(422).send({ message: 'Not allow.'});
          }
        })
      })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, fullname, phone } = req.query;
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).send({ message: errors.array()[0].msg });
  }

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        fullname: fullname,
        phone: phone,
        order: { items: [] },
        role: req.role,
      });
      user.save();
      return res.status(200).send(user);
    })
    // .catch(err => res.status(500).send({ message: err }));
    .catch(err => console.log(err));
};

exports.getUserById = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => res.status(200).send(user))
    .catch(err => console.log(err));
}

exports.getAllClients = (req, res, next) => {
  const { cookieId } = req.query;
  User.find()
    .then(users => {
      const clients = users.filter(u => u.role === role.customer);
      return res.status(200).send(clients);
    })
    .catch(err => console.log(err));
}