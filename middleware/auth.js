const jwt = require('jsonwebtoken');
require('dotenv').config();

const { role } = require("./role");
const User = require('../models/user');
const { permission } = require('./permission');

exports.auth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token: ' + token);
  if(!token) {
    console.log('token no');
    res.status(401).send({ message: 'Unauthorized.'});
  }
  jwt.verify(
    token, 
    process.env.YOUR_SECRET_KEY,
    (err, user) => {
      if(err) {
        console.log('jwt no');
        console.log(err);
        res.status(401).send({ message: 'You need to login.'});
      } else {
        console.log('token ok');
        console.log('user:');
        console.log(user);
        req.user = user;
        next();
      }
    }
  )
}

exports.permission = (route, can) => {
  return (req, res, next) => {
    // const idUser = req.query.idUser ? req.query.idUser : req.user.id;
    const idUser = req.user.id;
    User.findById(idUser)
      .then(user => {
        if(!user) {
          console.log('no user');
          res.status(401).send({ message: 'You need to sign in!' });
        } else if(user) {
          console.log(user.role)
          console.log(permission[user.role])
          const filteredUserPermission = permission[user.role].filter(i => i.route.includes(route))
          console.log(filteredUserPermission);
          if(!filteredUserPermission) {
            console.log(permission[user.role]);
            console.log('no permission role route');
            res.status(401).send({ message: 'Not allow.' });
          } 
          else if(filteredUserPermission) {
            console.log(filteredUserPermission[0].can.includes(can));
            if(!filteredUserPermission[0].can.includes(can)) {
              console.log('no permission role route can');
              res.status(401).send({ message: 'Not allow.' });
            } else {
              console.log('permission ok');
              next();
            }
          }
        }
      })
  }
}