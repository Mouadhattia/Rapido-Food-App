import axios from 'axios';
import {API_URL} from '../../utils/Utils';

export const CREATE_FAV_SUCCESS = 'CREATE_FAV_SUCCESS ';
export const FETCH_FAV_SUCCESS = 'FETCH_FAV_SUCCESS';
export const DELETE_FAV_SUCCESS = 'DELETE_FAV_SUCCESS';
export const createFavSuccess = data => ({
  type: CREATE_FAV_SUCCESS,
  payload: data,
});
export const deleteFavSuccess = id => ({
  type: DELETE_FAV_SUCCESS,
  payload: id,
});
export const fetchFavSuccess = data => ({
  type: FETCH_FAV_SUCCESS,
  payload: data,
});

export function createFav({data}) {
 
  return async dispatch => {
    await axios
      .post(API_URL + '/favorite/create', data)
      .then(response => {
        dispatch(createFavSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails

        throw new Error('Error create fav');
      });
  };
}
export function fetchFav({data}) {
  return async dispatch => {
    await axios
      .post(API_URL + '/favorite/getAll', data)
      .then(response => {
        dispatch(fetchFavSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails

        throw new Error('Error fetch fav');
      });
  };
}
export function deleteFav({id}) {
  return async dispatch => {
    await axios
      .post(API_URL + '/favorite/delete', {id})
      .then(() => {
        dispatch(deleteFavSuccess(id));
      })
      .catch(error => {
        // Dispatch an error action if the request fails

        throw new Error('Error delete fav');
      });
  };
}
