import axios from 'axios';
import {API_URL} from '../../utils/Utils';
export const FETCH_SERVICE_SUCCESS = 'FETCH_SERVICE_SUCCESS';

export const fetchResSuccess = data => ({
  type: FETCH_SERVICE_SUCCESS,
  payload: {data},
});

export function fetchService() {
  return dispatch => {
    axios
      .post(API_URL + '/service/getAll')
      .then(response => {
        dispatch(fetchResSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
}
