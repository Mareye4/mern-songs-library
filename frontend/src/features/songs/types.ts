import { Song } from '../../types';

export type CreateSongInput = Omit<Song, '_id' | 'createdAt' | 'updatedAt'>;

export type UpdateSongInput = Partial<CreateSongInput>;

export interface UpdateSongPayload {
  id: string;
  data: UpdateSongInput;
}

export interface FetchSongsParams {
  genre?: string;
  search?: string;
}

export interface SongsState {
  songs: Song[];
  selectedSong: Song | null;
  loading: boolean;
  error: string | null;
  filters: {
    genre: string;
    search: string;
  };
}