import {
  ADD_CART_SUCCESS,
  DELETE_FROM_CART_SUCCESS,
  UPDATE_CART_SUCCESS,
  DELETE_CART_SUCCESS,
  SELECT_RES_SUCCESS,
  REORDER_SUCCESS,
} from './cartActions';

const initialState = {
  cart: [],
  selectedRes: {},
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART_SUCCESS:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case DELETE_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {...item, qty: action.payload.qty}
            : item,
        ),
      };
    case DELETE_CART_SUCCESS:
      return {
        ...state,
        cart: [],
      };
    case SELECT_RES_SUCCESS:
      return {
        ...state,
        selectedRes: action.payload,
      };

    case REORDER_SUCCESS:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}

export default cartReducer;
