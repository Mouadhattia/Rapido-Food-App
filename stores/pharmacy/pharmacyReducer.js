import {ADD_PHARMACY,DELETE_PHARMACY,CLEAR_PHARMACY} from './pharmacyActions';

const initialState = {
  pharmacy: [],
};

const pharmacyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHARMACY:
      return {
        ...state,
        pharmacy: [...state.pharmacy,action.payload],
      };
      case DELETE_PHARMACY:
      return {
        ...state,
        pharmacy: state.pharmacy.filter((e)=>e.id !== action.payload),
      };
      case CLEAR_PHARMACY:
        return {
          ...state,
          pharmacy: [],
        };
    default:
      return state;
  }
};

export default pharmacyReducer;
