export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';

export const getLocationSuccess = location => ({
  type: GET_LOCATION_SUCCESS,
  payload: location,
});

export function getLocation(location) {
  return dispatch => {
    dispatch(getLocationSuccess(location));
  };
}
