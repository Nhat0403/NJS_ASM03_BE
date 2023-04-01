const express = require('express');
const router = express.Router();

const chatRoomControllers = require('../controllers/chatrooms');
const { permission, auth } = require('../middleware/auth');
const { setRole, role } = require('../middleware/role');

router.get('/getById', chatRoomControllers.getMessageByRoomId);
router.put('/addMessage', auth, permission('chatrooms', 'addMessage'), chatRoomControllers.addMessage);
router.put('/counselor/addMessage', auth, permission('chatrooms', 'addMessage'), chatRoomControllers.addMessage);
router.post('/createNewRoom', auth, permission('chatrooms', 'createNewRoom'), chatRoomControllers.createNewRoom);
router.post('/counselor/searchMessage', auth, permission('chatrooms', 'searchMessage'), chatRoomControllers.searchMessage);
router.get('/counselor/getAllRoom', auth, permission('chatrooms', 'getAllRoom'), chatRoomControllers.getAllRoom);

module.exports = router;
