import axios from 'axios';
import {API_URL} from '../../utils/Utils';
export const FETCH_PROMO_SUCCESS = 'FETCH_PROMO_SUCCESS';

export const fetchPromoSuccess = data => ({
  type: FETCH_PROMO_SUCCESS,
  payload: {data},
});

export function fetchPromo() {
  return dispatch => {
    axios
      .post(API_URL + '/promotion/getAll')
      .then(response => {
        dispatch(fetchPromoSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
}
