const Session = require('../models/session');
const User = require('../models/user');
const role = require('../middleware/role');
// const io = require('../socket');
// const socket = require('socket.io');

exports.getMessageByRoomId = (req, res, next) => {
  const { roomId } = req.query;
  console.log(roomId);
  Session.findById(roomId)
    .then(message => {
      // io.getIO().emit('receive_message', message);
      return res.status(200).send(message);
    })
    .catch(err => console.log(err));
}

exports.createNewRoom = (req, res, next) => {
  const session = new Session({
    content: [
      {
        is_admin: false,
        id: 0,
        message: "==NEW ROOM=="
      }
    ]
  });
  session.save();
  // io.getIO().emit('create_room', session);
  return res.status(200).send(session);
}

exports.addMessage = (req, res, next) => {
  const { message, roomId, idUser } = req.query;
  console.log(roomId);
  // let is_admin = false;
  User.findById(idUser)
    .then(user => {
      is_admin = user.role === role.role.customer ? false : true;
      // console.log(user.role)
      Session.findByIdAndUpdate(
        roomId, 
        { 
          $push: 
          { 
            content: 
            {
              is_admin: is_admin,
              id: idUser,
              message: message
            }
          }
        }
      )
      .then(message => {
        return res.status(200).send(message);
      })
    })
    .catch(err => console.log(err))
}

exports.searchMessage = (req, res, next) => {
  const { idUser, chatSearch } = req.query;
  Session.find()
    .then(message => {
      if(chatSearch.trim() === '') {
        return res.status(200).send(message);
      }
      const filteredMessage = message.filter(m => m._id.toString().includes(chatSearch));
      return res.status(200).send(filteredMessage);
    })
    .catch(err => console.log(err));
}

exports.getAllRoom = (req, res, next) => {
  const { idUser } = req.query;
  Session.find()
    .then(message => res.status(200).send(message))
    .catch(err => console.log(err));
}