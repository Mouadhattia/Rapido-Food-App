import { FETCH_RES_SUCCESS ,FETCH_ALL_RES_SUCCESS,FETCH_MARKET_SUCCESS} from './resActions';

const initialState = {
  restaurant: [],
  loading:false,
  market:{},
  allRestaurant:[]
};

function resReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RES_SUCCESS:
      return {
        ...state,
        restaurant: action.payload.data
      };
      case FETCH_ALL_RES_SUCCESS:
        return {
          ...state,
          allRestaurant: action.payload.data
        };
        case FETCH_MARKET_SUCCESS:
        return {
          ...state,
          market: action.payload
        };
    
    default:
      return state;
  }
}

export default resReducer;