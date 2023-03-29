const { role } = require("./role");
const User = require('../models/user');

exports.authUser = (req, res, next) => {
  if(!req.user) {
    return res.status(401).send({ message: 'You need to sign in.' });
  }
  next();
}

exports.authRole = (role) => {
  return (req, res, next) => {
    console.log(req.user);
    if(req.user.role !== role) {
      return res.status(401).send({ message: 'Not allow.' })
    }
    next();
  }
}

exports.authNotCustomer = () => {
  return (req, res, next) => {
    if(req.user.role === role.customer) {
      return res.status(401).send({ message: 'Not allow.' })
    }
    next();
  }
}

exports.permission = (permission) => {
  return (req, res, next) => {
    const { cookieId } = req.query;
    console.log(cookieId)
    User.findById(cookieId)
      .then(user => {
        if(!user) {
          console.log('no')
          return res.status(401).send({ message: 'You need to sign in!'});
        }
        // if(permission === role.counselor) {
        //   if(user.role !== permission && user.role !== role.admin) {
        //     console.log('no counselor')
        //     return res.status(401).send({ message: 'Not allow.' })
        //   }
        // }
        // if(permission === role.admin) {
        //   if(user.role !== permission) {
        //     console.log('no admin')
        //     return res.status(401).send({ message: 'Not allow.' })
        //   }
        // } else {
        //   next();
        // }
        // console.log('ok')
        // next();
        if(permission !== user.role && user.role !== role.admin) {
          console.log('no');
          return res.status(401).send({ message: 'Not allow.' });
        } 
        console.log('ok');
        next();
      })
  }
}