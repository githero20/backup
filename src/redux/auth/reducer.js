import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS
} from './types'
import { defaultSingleObjectState } from '../../utils/constants'
import { extractStatus, handleFetch, defaultPayload, SET_SAGA_ERROR } from '../../Helpers'


const authReducer = (
  state = defaultSingleObjectState,
  { type, payload = defaultPayload }
) => {
  const status = extractStatus(type);
  switch (type) {
    case GET_USER_REQUEST:
    case GET_USER_SUCCESS:
    case SET_SAGA_ERROR:
      return handleFetch(state, status, payload);
    default:
      return state;
  }
};

export default authReducer;