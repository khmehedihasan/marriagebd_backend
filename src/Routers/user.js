const express = require('express');
const router = express.Router();
const user = require('../Controllers/user');

router.get('/', user.getAlluser);
router.get('/search', user.search);
router.post('/search', user.allCategory);

module.exports = router;