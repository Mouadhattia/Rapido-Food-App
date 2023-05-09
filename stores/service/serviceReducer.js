import {FETCH_SERVICE_SUCCESS} from './serviceActions';

const initialState = {
  service: [],
};

function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICE_SUCCESS:
      return {
        ...state,
        service: action.payload.data,
      };
    default:
      return state;
  }
}

export default serviceReducer;
