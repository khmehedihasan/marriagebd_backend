const express = require('express');
const router = express.Router();
const user = require('../Controllers/user');
const validObjectId = require('../Middlewares/validObjectId');
const cheackToken = require('../Middlewares/cheackToken');
const uploadPhoto = require('../Middlewares/uploadPhoto');

router.get('/', user.getAlluser);
router.get('/search', user.searchUser);
router.get('/:id', user.getSingle);
router.post('/search', user.search);
router.put('/packageValidity/:id', user.packageValidity);
router.put('/changePic/:id', validObjectId,  uploadPhoto.single('photo'), user.changePic);

module.exports = router;