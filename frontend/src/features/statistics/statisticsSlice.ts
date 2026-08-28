import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Statistics, StatisticsState } from './types';

const initialState: StatisticsState = {
  data: null,
  loading: false,
  error: null,
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    fetchStatisticsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess: (state, action: PayloadAction<Statistics>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearStatisticsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
  clearStatisticsError,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;