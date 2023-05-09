import axios from 'axios';
import { API_URL } from '../../utils/Utils';
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const SELECT_MENU_SUCCESS = 'SELECT_MENU_SUCCESS';
export const fetchMenuSuccess = data => ({
  type: FETCH_MENU_SUCCESS,
  payload: {data},
});
export const selectMenuSuccess = menuName => ({
  type: SELECT_MENU_SUCCESS,
  payload: menuName,
});

export function selectMenu({menuName}) {
  return dispatch => {
    dispatch(selectMenuSuccess(menuName));
  };
}

export function fetchMenu({resname}) {
  return dispatch => {
    axios
      .post(API_URL+'/menu/getAll', {resname: resname})
      .then(response => {
        dispatch(fetchMenuSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
}
