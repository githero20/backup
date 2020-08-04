import {
  CREATE_SNAP_REQUEST,
  GET_SNAP_REQUEST,
  VERIFY_SNAP_REQUEST,
  CREATE_SNAP_SUCCESS,
  GET_SNAP_SUCCESS,
  INIT_SNAP_SUCCESS,
  VERIFY_SNAP_SUCCESS,
  RESET_STATE
} from './types';
import { defaultSingleObjectState } from '../../utils/constants'
import { extractStatus, handleFetch, SET_SAGA_ERROR } from '../../Helpers'

const defaultPayload = {
  data: [],
  errors: [],
};

const snapReducer = (
  state = defaultSingleObjectState,
  { type, payload = defaultPayload }
) => {
  const status = extractStatus(type);
  switch (type) {
    case GET_SNAP_REQUEST:
    case CREATE_SNAP_REQUEST:
    case VERIFY_SNAP_REQUEST:
    case CREATE_SNAP_SUCCESS:
    case GET_SNAP_SUCCESS:
    case INIT_SNAP_SUCCESS:
    case VERIFY_SNAP_SUCCESS:
    case SET_SAGA_ERROR:
      return handleFetch(state, status, payload);
    case RESET_STATE:
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