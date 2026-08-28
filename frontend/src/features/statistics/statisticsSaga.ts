import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchStatisticsApi } from './statisticsApi';
import {
  fetchStatisticsFailure,
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
} from './statisticsSlice';
import { Statistics } from './types';

function* fetchStatisticsWorker() {
  try {
    const data: Statistics = yield call(fetchStatisticsApi);
    yield put(fetchStatisticsSuccess(data));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch statistics';
    yield put(fetchStatisticsFailure(message));
  }
}

export function* statisticsSaga() {
  yield all([
    takeLatest(fetchStatisticsRequest.type, fetchStatisticsWorker),
  ]);
}