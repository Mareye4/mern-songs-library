const Song = require('../models/Song');

/**
 * Runs five separate aggregation pipelines in parallel and assembles
 * the full statistics object. Each pipeline is small and readable.
 */
async function getStatistics() {
  const [totals, songsByGenre, songsByArtist, albumsByArtist, songsByAlbum] =
    await Promise.all([
      // Scalar totals
      Song.aggregate([
        {
          $group: {
            _id: null,
            totalSongs: { $sum: 1 },
            artists: { $addToSet: '$artist' },
            albums:  { $addToSet: '$album' },
            genres:  { $addToSet: '$genre' },
          },
        },
        {
          $project: {
            _id: 0,
            totalSongs: 1,
            totalArtists: { $size: '$artists' },
            totalAlbums:  { $size: '$albums' },
            totalGenres:  { $size: '$genres' },
          },
        },
      ]),

      // Songs per genre
      Song.aggregate([
        { $group: { _id: '$genre', count: { $sum: 1 } } },
        { $project: { _id: 0, genre: '$_id', count: 1 } },
        { $sort: { count: -1 } },
      ]),

      // Songs per artist
      Song.aggregate([
        { $group: { _id: '$artist', count: { $sum: 1 } } },
        { $project: { _id: 0, artist: '$_id', count: 1 } },
        { $sort: { count: -1 } },
      ]),

      // Albums per artist
      Song.aggregate([
        { $group: { _id: '$artist', albums: { $addToSet: '$album' } } },
        {
          $project: {
            _id: 0,
            artist: '$_id',
            albumCount: { $size: '$albums' },
          },
        },
        { $sort: { albumCount: -1 } },
      ]),

      // Songs per album
      Song.aggregate([
        { $group: { _id: '$album', count: { $sum: 1 } } },
        { $project: { _id: 0, album: '$_id', count: 1 } },
        { $sort: { count: -1 } },
      ]),
    ]);

  // totals[0] is undefined when the collection is empty
  const scalars = totals[0] || {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
  };

  return {
    ...scalars,
    songsByGenre,
    songsByArtist,
    albumsByArtist,
    songsByAlbum,
  };
}

module.exports = { getStatistics };