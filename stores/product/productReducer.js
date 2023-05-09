import {FETCH_PRODUCT_SUCCESS,LOADING_PRODUCT} from './productActions';

const initialState = {
  product: [],
  loading:false
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload.data,
      };
      case LOADING_PRODUCT:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export default productReducer;
