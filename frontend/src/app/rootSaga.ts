import { all, fork } from 'redux-saga/effects';
import { songSaga } from '../features/songs/songSaga';
import { statisticsSaga } from '../features/statistics/statisticsSaga';

export function* rootSaga() {
  yield all([
    fork(songSaga),
    fork(statisticsSaga),
  ]);
}