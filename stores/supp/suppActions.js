import axios from 'axios';
import {API_URL} from '../../utils/Utils';
export const FETCH_SUPP_SUCCESS = 'FETCH_SUPP_SUCCESS';

export const fetchSuppSuccess = data => ({
  type: FETCH_SUPP_SUCCESS,
  payload: {data},
});

export function fetchSupp({data}) {

  return async dispatch => {
    await axios
      .post(API_URL + '/supplement/getAll', data)
      .then(response => {
        dispatch(fetchSuppSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
}
