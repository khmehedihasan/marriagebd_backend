const express = require('express');
const router = express.Router();
const varify = require('../Controllers/verify');
const validObjectId = require('../Middlewares/validObjectId')

router.get('/resend/:id', validObjectId, varify.resendCode);
router.post('/',varify.AddUnverified);
router.put('/:id', validObjectId, varify.varifyEmail);

module.exports = router;