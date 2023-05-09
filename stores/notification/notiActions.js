import axios from 'axios';
import { API_URL } from '../../utils/Utils';
export const FETCH_NOTI_SUCCESS = 'FETCH_NOTI_SUCCESS';

export const fetchResSuccess = data => ({
  type: FETCH_NOTI_SUCCESS,
  payload: {data},
});

export function fetchNoti() {
  return dispatch => {
    axios
      .post(API_URL+'/notification/getAll')
      .then(response => {
        dispatch(fetchResSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
}
