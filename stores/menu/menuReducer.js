import {FETCH_MENU_SUCCESS, SELECT_MENU_SUCCESS} from './menuActions';

const initialState = {
  menu: [],
  selectedMenuName: '',
};

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload.data,
        selectedMenuName: action.payload.data[0]?.id,
      };
    case SELECT_MENU_SUCCESS:
      return {
        ...state,
        selectedMenuName: action.payload,
      };
    default:
      return state;
  }
}

export default menuReducer;
