import axios from 'axios';
import {API_URL} from '../../utils/Utils';

export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

export const addCommentSuccess = data => ({
  type: ADD_COMMENT_SUCCESS,
  payload: data,
});

export function addComment({data}) {

  return async dispatch => {
    await axios
      .post(API_URL + '/comment/create', data)
      .then(response => {
        dispatch(addCommentSuccess(response.data.data));
      })
      .catch(error => {
        // Dispatch an error action if the request fails
        console.error(error);
        throw new Error('cant add comment');
      });
  };
}
