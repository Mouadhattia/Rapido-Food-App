import axios from 'axios';
import {API_URL} from '../../utils/Utils';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const FETCH_CURRENT_SUCCESS = 'FETCH_CURRENT_SUCCESS';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const SET_AUTH_SUCCESS = 'SET_AUTH_SUCCESS';
export const LOADING_AUTH = 'LOADING_AUTH';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';



export const Loading = data => ({
  type: LOADING_AUTH,
  payload: data,
});
export const logInSuccess = data => ({
  type: LOG_IN_SUCCESS,
  payload: data,
});
export const setAuthSuccess = token => ({
  type: SET_AUTH_SUCCESS,
  payload: token,
});
export const logOutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
});
export const signUpSuccess = data => ({
  type: SIGN_UP_SUCCESS,
  payload: data,
});
export const getCurrentSuccess = data => ({
  type: FETCH_CURRENT_SUCCESS,
  payload: data,
});
export const EditProfileSuccess = data => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export function updateProfile({data}) {
  console.log(data);
  return async dispatch => {
    dispatch(Loading(true))
    await axios
      .post(API_URL + '/user/update', data)
      .then(response => {
        
        dispatch(EditProfileSuccess(response.data.data));
        dispatch(Loading(false))
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        dispatch(Loading(false))
        throw new Error('Error login');
      });
  };
}



export function logIn({data}) {
  return async dispatch => {
    dispatch(Loading(true))
    await axios
      .post(API_URL + '/auth/login', data)
      .then(response => {
        
        dispatch(logInSuccess(response.data.data));
        dispatch(Loading(false))
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        dispatch(Loading(false))
        throw new Error('Error login');
      });
  };
}
export function signUp({data}) {
 
  return async dispatch => {
    dispatch(Loading(true))
    await axios
      .post(API_URL + '/auth/register', data)
      .then(response => {
       
        dispatch(Loading(false))
        dispatch(signUpSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        dispatch(Loading(false))
        console.log(error);
        throw new Error('Error signing up');
      });
  };
}
export function logOut() {
  return async dispatch => {
    dispatch(logOutSuccess());
  };
}
export function getCurrent() {
  return async dispatch => {
    await axios
      .get(API_URL + '/auth/current')
      .then(response => {
        dispatch(getCurrentSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
      });
  };
}
export const setAuthToken = ({token}) => {
  return dispatch => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(setAuthSuccess(token));
    } else delete axios.defaults.headers.common['Authorization'];
  };
};
