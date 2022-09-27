const express = require('express');
const router = express.Router();
const message = require('../Controllers/message');
const validObjectId = require('../Middlewares/validObjectId');
const cheackTokenAdmin = require('../Middlewares/cheackTokenAdmin');

router.get('/', cheackTokenAdmin, message.allRequest);

router.get('/search', cheackTokenAdmin, message.allRequest);

router.post('/', message.addRequest)

router.delete('/:id', cheackTokenAdmin, validObjectId, message.deleteRequest);

module.exports = router;