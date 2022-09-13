const express = require('express');
const login = require('../Controllers/login');
const router = express.Router();

router.post('/',login.loginUser);
router.post('/forgotPassword',login.sendCode);
router.post('/resetpassword/:id',login.reSetPassword);
router.post('/varifyCode/:id',login.varifyCode);
router.get('/resend/:id',login.resendCode);

module.exports = router;