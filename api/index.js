const express = require('express');
const router = express.Router();

// ROUTER: /api/films
router.use('/films', require('./films'));

module.exports = router;