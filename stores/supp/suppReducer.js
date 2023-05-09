import {FETCH_SUPP_SUCCESS} from './suppActions';

const initialState = {
  supplment: [],
};

function suppReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUPP_SUCCESS:
      return {
        ...state,
        supplment: action.payload.data,
      };
    default:
      return state;
  }
}

export default suppReducer;
