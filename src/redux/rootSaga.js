import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import snapSaga from './snap/saga';

export default function* rootSaga() {
  yield all([authSaga(), snapSaga()]);
}
