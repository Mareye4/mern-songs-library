import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../types';
import { CreateSongInput, FetchSongsParams, SongsState, UpdateSongPayload } from './types';

const initialState: SongsState = {
  songs: [],
  selectedSong: null,
  loading: false,
  error: null,
  filters: {
    genre: '',
    search: '',
  },
};

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // ── Fetch All Songs ──────────────────────────────────────────
    fetchSongsRequest: (state, _action: PayloadAction<FetchSongsParams | undefined>) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Fetch Song by ID ─────────────────────────────────────────
    fetchSongByIdRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongByIdSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      state.selectedSong = action.payload;
    },
    fetchSongByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Create Song ──────────────────────────────────────────────
    createSongRequest: (state, _action: PayloadAction<CreateSongInput>) => {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      state.songs.unshift(action.payload);
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Update Song ──────────────────────────────────────────────
    updateSongRequest: (state, _action: PayloadAction<UpdateSongPayload>) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      const index = state.songs.findIndex((s) => s._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      if (state.selectedSong?._id === action.payload._id) {
        state.selectedSong = action.payload;
      }
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Delete Song ──────────────────────────────────────────────
    deleteSongRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.songs = state.songs.filter((s) => s._id !== action.payload);
      if (state.selectedSong?._id === action.payload) {
        state.selectedSong = null;
      }
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ── Filter Actions ───────────────────────────────────────────
    setFilterGenre: (state, action: PayloadAction<string>) => {
      state.filters.genre = action.payload;
    },
    setFilterSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    clearFilters: (state) => {
      state.filters.genre = '';
      state.filters.search = '';
    },

    // ── UI-only Actions ──────────────────────────────────────────
    selectSong: (state, action: PayloadAction<Song | null>) => {
      state.selectedSong = action.payload;
    },
    clearSelectedSong: (state) => {
      state.selectedSong = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchSongByIdRequest,
  fetchSongByIdSuccess,
  fetchSongByIdFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  setFilterGenre,
  setFilterSearch,
  clearFilters,
  selectSong,
  clearSelectedSong,
  clearError,
} = songSlice.actions;

export default songSlice.reducer;