import axios from 'axios';
import {API_URL} from '../../utils/Utils';
export const FETCH_RES_SUCCESS = 'FETCH_RES_SUCCESS';
export const FETCH_ALL_RES_SUCCESS = 'FETCH_ALL_RES_SUCCESS';
export const FETCH_MARKET_SUCCESS = 'FETCH_MARKET_SUCCESS';





export const fetchResSuccess = data => ({
  type: FETCH_RES_SUCCESS,
  payload: {data},
});
export const fetchAllResSuccess = data => ({
  type: FETCH_ALL_RES_SUCCESS,
  payload: {data},
});
export const fetchMarketSuccess = data => ({
  type: FETCH_MARKET_SUCCESS,
  payload: data,
});

export function fetchMarket() {
  return dispatch => {
    axios
      .post(API_URL + '/restaurant/getbyName',{name:"Market"})
      .then(response => {
        dispatch(fetchMarketSuccess(response.data.data));
       
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
 
}
export function fetchRes({catId}) {
  return dispatch => {
    axios
      .post(API_URL + '/restaurant/getAll',{catId})
      .then(response => {
        dispatch(fetchResSuccess(response.data.data));
       
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
 
}
export function fetcAllhRes({search}) {
  console.log(search);
  return dispatch => {
    
    axios
      .post(API_URL + '/restaurant/getAllRes',{search:search})
      .then(response => {
        dispatch(fetchAllResSuccess(response.data.data));
       

      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
}
