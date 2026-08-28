const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics.controller');

router.get('/', statisticsController.getStatistics);

module.exports = router;