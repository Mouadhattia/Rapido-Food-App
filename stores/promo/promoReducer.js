import {FETCH_PROMO_SUCCESS} from './promoActions';

const initialState = {
  promo: [],
};

function resReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROMO_SUCCESS:
      return {
        ...state,
        promo: action.payload.data,
      };
    default:
      return state;
  }
}

export default resReducer;
