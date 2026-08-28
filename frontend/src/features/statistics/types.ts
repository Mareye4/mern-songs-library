export interface SongsByGenre {
  genre: string;
  count: number;
}

export interface SongsByArtist {
  artist: string;
  count: number;
}

export interface AlbumsByArtist {
  artist: string;
  albumCount: number;
}

export interface SongsByAlbum {
  album: string;
  count: number;
}

export interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: SongsByGenre[];
  songsByArtist: SongsByArtist[];
  albumsByArtist: AlbumsByArtist[];
  songsByAlbum: SongsByAlbum[];
}

export interface StatisticsState {
  data: Statistics | null;
  loading: boolean;
  error: string | null;
}