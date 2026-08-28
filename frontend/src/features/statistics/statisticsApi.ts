import { ApiResponse } from '../../types';
import { Statistics } from './types';

const BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function fetchStatisticsApi(): Promise<Statistics> {
  const res = await fetch(`${BASE_URL}/statistics`);

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
  }

  if (!res.ok) {
    const errorJson = json as { message?: string };
    throw new Error(errorJson.message || `Failed to fetch statistics (status ${res.status})`);
  }

  const result = json as ApiResponse<Statistics>;
  return result.data;
}