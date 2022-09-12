const express = require('express');
const login = require('../Controllers/login');
const router = express.Router();

router.post('/forgotPassword',login.sendCode);

module.exports = router;