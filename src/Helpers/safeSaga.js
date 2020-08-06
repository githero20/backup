import { put } from 'redux-saga/effects';

export const SET_SAGA_ERROR = 'SET_SAGA_ERROR';

export default function safeSaga(func) {
  return function* (args) {
    try {
      yield* func(args);
    } catch (err) {
      const errors = yield err.response.data.message;
      yield put({
        type: SET_SAGA_ERROR,
        payload: { errors }
      })
    }
  };
}