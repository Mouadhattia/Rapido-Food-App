import {
  FETCH_CURRENT_SUCCESS,
  SIGN_UP_SUCCESS,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  LOADING_AUTH,
  UPDATE_PROFILE_SUCCESS
} from './authActions';

const initialState = {
  current: {},
  token: '',
  loading:false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };
    case SIGN_UP_SUCCESS:
     
      return {
           
        ...state,
        current: action.payload.user,
        token: action.payload.accessToken,
      };
    case LOG_IN_SUCCESS:
   
      return {
        ...state,
        current: action.payload,
        token: action.payload.accessToken,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        current: {},
        token: '',
      };
      case LOADING_AUTH:
        return {
          ...state,
         loading:action.payload
        };
        case UPDATE_PROFILE_SUCCESS :
        return {
          ...state,
         current:action.payload
        };
    default:
      return state;
  }
}

export default authReducer;
