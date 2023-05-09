import {groupOrdersByDate} from '../../utils/Utils';
import {FETCH_ORDER_SUCCESS,LOADING_ORDER} from './orderActions';

const initialState = {
  orders: [],
  loading:false
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: groupOrdersByDate(action.payload),
      };
      case LOADING_ORDER:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}

export default orderReducer;
