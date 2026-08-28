const statisticsService = require('../services/statistics.service');

async function getStatistics(req, res, next) {
  try {
    const stats = await statisticsService.getStatistics();
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}

module.exports = { getStatistics };