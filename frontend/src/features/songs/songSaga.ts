import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../types';
import {
  createSongApi,
  deleteSongApi,
  fetchSongByIdApi,
  fetchSongsApi,
  updateSongApi,
} from './songApi';
import {
  createSongFailure,
  createSongRequest,
  createSongSuccess,
  deleteSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  fetchSongByIdFailure,
  fetchSongByIdRequest,
  fetchSongByIdSuccess,
  fetchSongsFailure,
  fetchSongsRequest,
  fetchSongsSuccess,
  updateSongFailure,
  updateSongRequest,
  updateSongSuccess,
} from './songSlice';
import { CreateSongInput, FetchSongsParams, UpdateSongPayload } from './types';

// ── Workers ───────────────────────────────────────────────────────────────

function* fetchSongsWorker(action: PayloadAction<FetchSongsParams | undefined>) {
  try {
    const songs: Song[] = yield call(fetchSongsApi, action.payload);
    yield put(fetchSongsSuccess(songs));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch songs';
    yield put(fetchSongsFailure(message));
  }
}

function* fetchSongByIdWorker(action: PayloadAction<string>) {
  try {
    const song: Song = yield call(fetchSongByIdApi, action.payload);
    yield put(fetchSongByIdSuccess(song));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch song';
    yield put(fetchSongByIdFailure(message));
  }
}

function* createSongWorker(action: PayloadAction<CreateSongInput>) {
  try {
    const song: Song = yield call(createSongApi, action.payload);
    yield put(createSongSuccess(song));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create song';
    yield put(createSongFailure(message));
  }
}

function* updateSongWorker(action: PayloadAction<UpdateSongPayload>) {
  try {
    const song: Song = yield call(updateSongApi, action.payload.id, action.payload.data);
    yield put(updateSongSuccess(song));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update song';
    yield put(updateSongFailure(message));
  }
}

function* deleteSongWorker(action: PayloadAction<string>) {
  try {
    yield call(deleteSongApi, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete song';
    yield put(deleteSongFailure(message));
  }
}

// ── Watcher ───────────────────────────────────────────────────────────────

export function* songSaga() {
  yield all([
    takeLatest(fetchSongsRequest.type, fetchSongsWorker),
    takeLatest(fetchSongByIdRequest.type, fetchSongByIdWorker),
    takeLatest(createSongRequest.type, createSongWorker),
    takeLatest(updateSongRequest.type, updateSongWorker),
    takeLatest(deleteSongRequest.type, deleteSongWorker),
  ]);
}