const express = require('express');
const router = express.Router();
const filter = require('../Controllers/filter');

// router.post('/', filter.addFilter);
router.get('/', filter.getFilter);

module.exports = router;