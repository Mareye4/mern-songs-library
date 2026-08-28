import { Song, ApiResponse, ApiListResponse, ApiErrorResponse } from '../../types';
import { CreateSongInput, FetchSongsParams, UpdateSongInput } from './types';

const BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function handleResponse<T>(res: Response): Promise<T> {
  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
  }

  if (!res.ok) {
    const errorJson = json as Partial<ApiErrorResponse>;
    const message = errorJson.message || `Request failed with status ${res.status}`;
    const details = errorJson.errors?.length ? ` (${errorJson.errors.join(', ')})` : '';
    throw new Error(`${message}${details}`);
  }

  return json as T;
}

export async function fetchSongsApi(params?: FetchSongsParams): Promise<Song[]> {
  const url = new URL(`${BASE_URL}/songs`);
  if (params?.genre && params.genre.trim()) {
    url.searchParams.set('genre', params.genre.trim());
  }
  if (params?.search && params.search.trim()) {
    url.searchParams.set('search', params.search.trim());
  }

  const res = await fetch(url.toString());
  const result = await handleResponse<ApiListResponse<Song>>(res);
  return result.data;
}

export async function fetchSongByIdApi(id: string): Promise<Song> {
  const res = await fetch(`${BASE_URL}/songs/${id}`);
  const result = await handleResponse<ApiResponse<Song>>(res);
  return result.data;
}

export async function createSongApi(songData: CreateSongInput): Promise<Song> {
  const res = await fetch(`${BASE_URL}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(songData),
  });
  const result = await handleResponse<ApiResponse<Song>>(res);
  return result.data;
}

export async function updateSongApi(id: string, songData: UpdateSongInput): Promise<Song> {
  const res = await fetch(`${BASE_URL}/songs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(songData),
  });
  const result = await handleResponse<ApiResponse<Song>>(res);
  return result.data;
}

export async function deleteSongApi(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/songs/${id}`, {
    method: 'DELETE',
  });
  await handleResponse<{ success: boolean; message: string }>(res);
}