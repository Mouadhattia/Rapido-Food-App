import {ADD_SERVICES,DELETE_SERVICES,CLEAR_SERVICES} from './servicesActions';

const initialState = {
  services: [],
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SERVICES:
      return {
        ...state,
        services: [...state.services,action.payload],
      };
      case DELETE_SERVICES:
      return {
        ...state,
        services: state.services.filter((e)=>e.id !== action.payload),
      };
      case CLEAR_SERVICES:
        return {
          ...state,
          services: [],
        };
    default:
      return state;
  }
};

export default servicesReducer;
