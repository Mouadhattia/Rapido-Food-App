import {FETCH_CAT_SUCCESS} from './catActions';

const initialState = {
  category: [],
};

function catReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAT_SUCCESS:
      return {
        ...state,
        category: action.payload.data,
      };
    default:
      return state;
  }
}

export default catReducer;
