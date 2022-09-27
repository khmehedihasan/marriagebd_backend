const express = require('express');
const router = express.Router();
const admin = require('../Controllers/admin');
const cheackTokenAdmin = require('../Middlewares/cheackTokenAdmin')


router.post('/',cheackTokenAdmin, admin.addAdmin);

router.get('/', cheackTokenAdmin, admin.allAdmin);
router.get('/search', cheackTokenAdmin, admin.searchAdmin);

router.post('/login',admin.loginAdmin);
router.delete('/:id', cheackTokenAdmin, admin.deleteAdmin);

router.delete('/logout', cheackTokenAdmin, admin.logoutAdmin);

module.exports = router;