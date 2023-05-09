import axios from 'axios';
import {API_URL} from '../../utils/Utils';

export const ADD_SERVICES = 'ADD_SERVICES';
export const DELETE_SERVICES = 'DELETE_SERVICES';
export const CLEAR_SERVICES = 'CLEAR_SERVICES';
export const CREATE_SERVICES_SUCCESS = 'CREATE_SERVICES_SUCCESS';

export const addServicesSuccess = item => ({
  type: ADD_SERVICES,
  payload: item,
});
export const deleteServicesSuccess = id => ({
  type: DELETE_SERVICES,
  payload: id,
});
export const clearServicesSuccess = () => ({
  type: CLEAR_SERVICES,
});
export const createServicesSuccess = data => ({
  type: CREATE_SERVICES_SUCCESS,
  payload: {data},
});

export function addServices(item) {
  return dispatch => {
    dispatch(addServicesSuccess(item));
  };
}
export function deleteServices(id) {
  return dispatch => {
    dispatch(deleteServicesSuccess(id));
  };
}
export function clearServices() {
  return dispatch => {
    dispatch(clearServicesSuccess());
  };
}
export function createServices({services}) {
  console.log(services);
  return async dispatch => {
    await axios
      .post(API_URL + '/pharmacy/create', services)
      .then(response => {
        dispatch(createServicesSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails

        throw new Error('Error create service');
      });
  };
}
