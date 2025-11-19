const express = require('express');
const router = express.Router();
const { getInventaris } = require('../controllers/inventarisController');

router.get('/', getInventaris);

module.exports = router;
