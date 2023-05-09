import axios from 'axios';
import { API_URL } from '../../utils/Utils';

export const FETCH_CAT_SUCCESS = 'FETCH_CAT_SUCCESS';

export const fetchResSuccess = data => ({
  type: FETCH_CAT_SUCCESS,
  payload: {data},
});

export function fetchCat() {
  return dispatch => {
    axios
      .post(API_URL+'/category/getAll')
      .then(response => {
        dispatch(fetchResSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
}
