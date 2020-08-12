import { takeLatest, call, put } from 'redux-saga/effects';
import api, { snapRequest } from '../../services/api';
import {
  CREATE_SNAP_REQUEST,
  CREATE_SNAP_SUCCESS,
  GET_SNAP_REQUEST,
  GET_SNAP_SUCCESS,
  INIT_SNAP_REQUEST,
  INIT_SNAP_SUCCESS,
  VERIFY_SNAP_REQUEST,
  VERIFY_SNAP_SUCCESS,
  GET_HISTORY_REQUEST,
  GET_HISTORY_SUCCESS,
  TRANSFER_INTEREST_SUCCESS,
  TRANSFER_INTEREST_REQUEST
} from './types';
import { safeSaga } from '../../Helpers';

function* createSnap({ payload }) {
  const { data } = yield call([api, 'post'], snapRequest.SNAP, payload);
  yield put({
    type: CREATE_SNAP_SUCCESS,
    payload: data,
  });
}

function* getSnap() {
  const { data } = yield call([api, 'get'], snapRequest.SNAP);
  yield put({
    type: GET_SNAP_SUCCESS,
    payload: data,
  });
}

function* initializeSnap({ payload }) {
  const { data } = yield call([api, 'post'], snapRequest.INIT, payload);
  yield put({
    type: INIT_SNAP_SUCCESS,
    payload: data,
  });
}


function* verifySnap({ payload }) {
  const { data } = yield call([api, 'post'], snapRequest.VERIFY, payload);
  yield put({
    type: VERIFY_SNAP_SUCCESS,
    payload: data,
  });
};

function* snapHistory() {
  const { data } = yield call([api, 'get'], snapRequest.HISTORY);
  yield put({
    type: GET_HISTORY_SUCCESS,
    payload: data,
  });
};
function* interestTransfer() {
  const { data } = yield call([api, 'get'], snapRequest.TRANSFER);
  yield put({
    type: TRANSFER_INTEREST_SUCCESS,
    payload: data,
  });
};

export default function* snapSaga() {
  yield takeLatest(CREATE_SNAP_REQUEST, safeSaga(createSnap));
  yield takeLatest(GET_SNAP_REQUEST, safeSaga(getSnap));
  yield takeLatest(INIT_SNAP_REQUEST, safeSaga(initializeSnap));
  yield takeLatest(VERIFY_SNAP_REQUEST, safeSaga(verifySnap));
  yield takeLatest(GET_HISTORY_REQUEST, safeSaga(snapHistory));
  yield takeLatest(TRANSFER_INTEREST_REQUEST, safeSaga(interestTransfer));
}
