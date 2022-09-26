const express = require('express');
const router = express.Router();
const chat = require('../controllers/chat');

// router.post('/', chat.sendChat);
router.get('/', chat.getMessage);
router.get('/friends', chat.getFrends);

module.exports = router;