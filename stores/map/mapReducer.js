import {GET_LOCATION_SUCCESS} from './mapActions';
import {LOG_OUT_SUCCESS}    from '../auth/authActions'     
 
const initialState = {
  location: {},
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload,
      };
      case LOG_OUT_SUCCESS:
      return {
        ...state,
        location: {},
      };
    default:
      return state;
  }
};

export default mapReducer;
