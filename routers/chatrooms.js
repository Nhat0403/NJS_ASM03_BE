const express = require('express');
const { body, query } = require('express-validator/check');
const router = express.Router();

const chatRoomControllers = require('../controllers/chatrooms');
const { permission } = require('../middleware/auth');
const { setRole, role } = require('../middleware/role');

router.get(
  '/getById',
  [
    query('roomId', 'No')
      .trim()
  ], 
  chatRoomControllers.getMessageByRoomId);

router.put(
  '/addMessage', 
  [
    body('message')
    .trim()
  ],
  permission(role.customer),
  chatRoomControllers.addMessage
);
router.put(
  '/addMessage/counselor', 
  [
    body('message')
    .trim()
  ],
  permission(role.counselor),
  chatRoomControllers.addMessage
);
router.post('/createNewRoom', chatRoomControllers.createNewRoom);
router.post('/searchMessage', permission(role.counselor), chatRoomControllers.searchMessage);
router.get('/getAllRoom', permission(role.counselor), chatRoomControllers.getAllRoom);

module.exports = router;
