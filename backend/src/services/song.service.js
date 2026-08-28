const Song = require('../models/Song');
const { AppError } = require('../middleware/errorHandler');

async function createSong(data) {
  const song = await Song.create(data);
  return song;
}

async function getAllSongs(query = {}) {
  const filter = {};
  if (query.genre && query.genre.trim()) {
    filter.genre = new RegExp('^' + query.genre.trim() + '$', 'i');
  }
  if (query.artist && query.artist.trim()) {
    filter.artist = new RegExp('^' + query.artist.trim() + '$', 'i');
  }
  if (query.album && query.album.trim()) {
    filter.album = new RegExp('^' + query.album.trim() + '$', 'i');
  }
  if (query.search && query.search.trim()) {
    const searchRegex = new RegExp(query.search.trim(), 'i');
    filter.$or = [
      { title: searchRegex },
      { artist: searchRegex },
      { album: searchRegex },
      { genre: searchRegex },
    ];
  }
  return Song.find(filter).sort({ createdAt: -1 });
}

async function getSongById(id) {
  const song = await Song.findById(id);
  if (!song) throw new AppError('Song not found', 404);
  return song;
}

async function updateSong(id, data) {
  const song = await Song.findByIdAndUpdate(id, data, {
    new: true,           // return the updated document
    runValidators: true, // enforce schema validation on update
  });
  if (!song) throw new AppError('Song not found', 404);
  return song;
}

async function deleteSong(id) {
  const song = await Song.findByIdAndDelete(id);
  if (!song) throw new AppError('Song not found', 404);
  return song;
}

module.exports = { createSong, getAllSongs, getSongById, updateSong, deleteSong };