const songService = require('../services/song.service');

async function createSong(req, res, next) {
  try {
    const song = await songService.createSong(req.body);
    res.status(201).json({ success: true, data: song });
  } catch (err) {
    next(err);
  }
}

async function getAllSongs(req, res, next) {
  try {
    const songs = await songService.getAllSongs(req.query);
    res.status(200).json({ success: true, count: songs.length, data: songs });
  } catch (err) {
    next(err);
  }
}

async function getSongById(req, res, next) {
  try {
    const song = await songService.getSongById(req.params.id);
    res.status(200).json({ success: true, data: song });
  } catch (err) {
    next(err);
  }
}

async function updateSong(req, res, next) {
  try {
    const song = await songService.updateSong(req.params.id, req.body);
    res.status(200).json({ success: true, data: song });
  } catch (err) {
    next(err);
  }
}

async function deleteSong(req, res, next) {
  try {
    await songService.deleteSong(req.params.id);
    res.status(200).json({ success: true, message: 'Song deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createSong, getAllSongs, getSongById, updateSong, deleteSong };