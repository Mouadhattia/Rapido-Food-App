import {FETCH_FAV_SUCCESS, DELETE_FAV_SUCCESS} from './favActions';

const initialState = {
  favories: [],
};

function favReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FAV_SUCCESS:
      return {
        ...state,
        favories: action.payload,
      };
    case DELETE_FAV_SUCCESS:
      return {
        ...state,
        favories: state.favories.filter(e => e.favId !== action.payload),
      };
    default:
      return state;
  }
}

export default favReducer;
