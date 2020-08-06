import { takeLatest, call, put } from 'redux-saga/effects';
import api, { authRequest } from '../../services/api';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from './types';
import { safeSaga } from '../../Helpers';

function* getUser() {
  const { data } = yield call([api, 'get'], authRequest.USER);
  yield put({
    type: GET_USER_SUCCESS,
    payload: data,
  });
}

export default function* authSaga() {
  yield takeLatest(GET_USER_REQUEST, safeSaga(getUser));

}
