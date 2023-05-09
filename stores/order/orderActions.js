import axios from 'axios';
import {API_URL} from '../../utils/Utils';
import io from 'socket.io-client';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS ';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const LOADING_ORDER = 'LOADING_ORDER';
const socket = io(API_URL);
export const Loading = data => ({
  type: LOADING_ORDER,
  payload: data,
});

export const createOrderSuccess = data => ({
  type: CREATE_ORDER_SUCCESS,
  payload: {data},
});
export const fetchOrderSuccess = data => ({
  type: FETCH_ORDER_SUCCESS,
  payload: data,
});

export function createOrder({order}) {
  return async dispatch => {
    dispatch(Loading(true));
    await axios
      .post(API_URL + '/order/create', order)
      .then(response => {
        socket.emit('order', order);
        dispatch(createOrderSuccess(response.data.data));
        dispatch(Loading(false));
      })
      .catch(error => {
        // Dispatch an error action if the request fails

        throw new Error('Error create order');
      });
  };
}
export function fetchOrder({name}) {
  return async dispatch => {
    await axios
      .post(API_URL + '/order/getAll',{name})
      .then(response => {
        dispatch(fetchOrderSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails

        throw new Error('Error fetch orders');
      });
  };
}
