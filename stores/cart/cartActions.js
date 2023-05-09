export const ADD_CART_SUCCESS = 'ADD_CART_SUCCESS';
export const DELETE_FROM_CART_SUCCESS = 'DELETE_FROM_CART_SUCCESS';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const DELETE_CART_SUCCESS = 'DELETE_CART_SUCCESS';
export const SELECT_RES_SUCCESS = 'SELECT_RES_SUCCESS';
export const REORDER_SUCCESS = 'REORDER_SUCCESS';
export const addCartSuccess = ({item}) => ({
  type: ADD_CART_SUCCESS,
  payload: item,
});
export const deleteFromCartSuccess = id => ({
  type: DELETE_FROM_CART_SUCCESS,
  payload: id,
});
export const updateCartSuccess = (id, qty) => ({
  type: UPDATE_CART_SUCCESS,
  payload: {id, qty},
});
export const delteCartSuccess = () => ({
  type: DELETE_CART_SUCCESS,
});
export const selectResSuccess = restaurant => ({
  type: SELECT_RES_SUCCESS,
  payload: restaurant,
});
export const reorderSuccess = items => ({
  type: REORDER_SUCCESS,
  payload: items,
});
export function addCart({item}) {
  return dispatch => {
    dispatch(addCartSuccess({item}));
  };
}
export function deleteFromCart({id}) {
  return dispatch => {
    dispatch(deleteFromCartSuccess(id));
  };
}
export function updateCart({id, qty}) {
  return dispatch => {
    dispatch(updateCartSuccess(id, qty));
  };
}
export function deleteCart() {
  return dispatch => {
    dispatch(delteCartSuccess());
  };
}
export function selectRes({restaurant}) {
  return dispatch => {
    dispatch(selectResSuccess(restaurant));
  };
}
export function reorder({items}) {
  return async dispatch => {
    await dispatch(reorderSuccess(items));
  };
}
