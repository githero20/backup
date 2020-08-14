import {
  CREATE_SNAP_REQUEST,
  GET_SNAP_REQUEST,
  VERIFY_SNAP_REQUEST,
  CREATE_SNAP_SUCCESS,
  GET_SNAP_SUCCESS,
  INIT_SNAP_SUCCESS,
  VERIFY_SNAP_SUCCESS,
  RESET_STATE_ERROR,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_REQUEST,
  TRANSFER_INTEREST_REQUEST,
  TRANSFER_INTEREST_SUCCESS,
  INIT_SNAP_REQUEST,
  INIT_SNAP_ERROR,
  VERIFY_SNAP_ERROR,
  CREATE_SNAP_ERROR,
  GET_SNAP_SETTINGS_REQUEST,
  GET_SNAP_SETTINGS_SUCCESS,
  GET_SNAP_SETTINGS_ERROR
} from './types';
import { defaultSingleObjectState } from '../../utils/constants'
import { extractStatus, handleFetch, SET_SAGA_ERROR } from '../../Helpers'

const defaultPayload = {
  data: [],
  errors: [],
};

const initalState = {
  all: defaultSingleObjectState,
  history: defaultSingleObjectState,
  transfer: defaultSingleObjectState,
  pay: defaultSingleObjectState,
  settings: defaultSingleObjectState,
}

const snapReducer = (
  state = initalState,
  { type, payload = defaultPayload }
) => {
  const status = extractStatus(type);
  switch (type) {
    case CREATE_SNAP_REQUEST:
    case VERIFY_SNAP_REQUEST:
    case INIT_SNAP_REQUEST:
    case CREATE_SNAP_SUCCESS:
    case VERIFY_SNAP_SUCCESS:
    case INIT_SNAP_SUCCESS:
    case INIT_SNAP_ERROR:
    case VERIFY_SNAP_ERROR:
    case CREATE_SNAP_ERROR:
    case RESET_STATE_ERROR:
      return handleFetch(state, status, payload, 'pay');
    case GET_SNAP_REQUEST:
    case GET_SNAP_SUCCESS:
    case SET_SAGA_ERROR:
      return handleFetch(state, status, payload, 'all');
    case GET_HISTORY_REQUEST:
    case GET_HISTORY_SUCCESS:
      return handleFetch(state, status, payload, 'history');
    case TRANSFER_INTEREST_REQUEST:
    case TRANSFER_INTEREST_SUCCESS:
      return handleFetch(state, status, payload, 'transfer');
    case GET_SNAP_SETTINGS_REQUEST:
    case GET_SNAP_SETTINGS_SUCCESS:
    case GET_SNAP_SETTINGS_ERROR:
      return handleFetch(state, status, payload, 'settings');
    case RESET_STATE_ERROR:
      return {
        ...state,
        errors: {},
        data: {}
      }
    default:
      return state;
  }
};

export default snapReducer;