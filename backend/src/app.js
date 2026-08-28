const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const songRoutes = require('./routes/song.routes');
const statisticsRoutes = require('./routes/statistics.routes');

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/songs', songRoutes);
app.use('/api/statistics', statisticsRoutes);

// ── 404 for unknown routes ─────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler (must be last) ────────────────────────────────────
app.use(errorHandler);

module.exports = app;