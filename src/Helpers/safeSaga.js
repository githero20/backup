import { put } from 'redux-saga/effects';

export const SET_SAGA_ERROR = 'SET_SAGA_ERROR';

export default function safeSaga(func, action) {
  return function* (args) {
    try {
      yield* func(args);
    } catch (err) {
      const errors = yield err.response.data.message;
      if (action) {
        yield put({
          type: action,
          payload: { errors }
        })
      } else {
        yield put({
          type: SET_SAGA_ERROR,
          payload: { errors }
        })
      }
    }
  };
}