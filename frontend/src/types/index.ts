// Core domain types shared across the frontend.
// These mirror the shape returned by the backend API.

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}