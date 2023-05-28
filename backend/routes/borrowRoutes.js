const express = require('express');
const borrowController = require('../controllers/borrowConroller');

const router = express.Router();

router.post('/addborrow', borrowController.addBorrow);
router.get('/getUserBorrows', borrowController.getUserBorrows);
module.exports = router;
