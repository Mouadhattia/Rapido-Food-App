import axios from 'axios';
import {API_URL} from '../../utils/Utils';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const LOADING_PRODUCT = 'LOADING_PRODUCT';

export const fetchProductSuccess = data => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: {data},
});
export const Loading = data => ({
  type: LOADING_PRODUCT,
  payload: data,
});

export function fetchProduct({menuname}) {
  return dispatch => {
    dispatch(Loading(true));
    axios
      .post(API_URL + '/product/getAll', {menuname: menuname})
      .then(response => {
        dispatch(fetchProductSuccess(response.data.data));
        dispatch(Loading(false));
      })
      .catch(error => {
        dispatch(Loading(false));

        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
}
