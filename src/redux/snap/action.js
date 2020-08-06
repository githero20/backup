import {
  CREATE_SNAP_REQUEST,
  GET_SNAP_REQUEST,
  INIT_SNAP_REQUEST,
  VERIFY_SNAP_REQUEST,
  RESET_STATE,
  GET_HISTORY_REQUEST
} from './types';

export const createSnapRequest = (payload) => ({
  type: CREATE_SNAP_REQUEST,
  payload
});

export const getSnapRequest = () => ({
  type: GET_SNAP_REQUEST,
});

export const initSnapRequest = (payload) => ({
  type: INIT_SNAP_REQUEST,
  payload
});

export const verifySnapRequest = (payload) => ({
  type: VERIFY_SNAP_REQUEST,
  payload
});
export const getHistoryRequest = () => ({
  type: GET_HISTORY_REQUEST,
});

export const resetState = () => ({
  type: RESET_STATE,
});
