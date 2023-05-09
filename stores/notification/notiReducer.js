import {FETCH_NOTI_SUCCESS} from './notiActions';

const initialState = {
  notification: [],
};

function notiReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTI_SUCCESS:
      return {
        ...state,
        notification: [{title: "Aujourd'hui", data: action.payload.data}],
      };
    default:
      return state;
  }
}

export default notiReducer;
