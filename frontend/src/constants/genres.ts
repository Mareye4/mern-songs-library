export const GENRES = [
  'Rock',
  'Pop',
  'Jazz',
  'Hip-Hop',
  'R&B',
  'Classical',
  'Electronic',
  'Country',
  'Reggae',
  'Blues',
  'Metal',
  'Folk',
  'Soul',
  'Funk',
  'Indie',
  'Alternative',
] as const;

export type Genre = typeof GENRES[number];