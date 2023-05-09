export const ADD_PHARMACY = 'ADD_PHARMACY'
export const DELETE_PHARMACY = 'DELETE_PHARMACY'
export const CLEAR_PHARMACY = 'CLEAR_PHARMACY'

export const addPharmacySuccess = (item) => ({
    type: ADD_PHARMACY,
    payload: item
})
export const deletePharmacySuccess = (id) => ({
    type: DELETE_PHARMACY,
    payload: id
})
export const clearPharmacySuccess = () => ({
    type: CLEAR_PHARMACY,  
})

export function addPharmacy(item) {
    return dispatch => {
        dispatch(addPharmacySuccess(item))
    }
}
export function deletePharmacy(id) {
  
    return dispatch => {
        dispatch(deletePharmacySuccess(id))
    }
}
export function clearPharmacy() {
    return dispatch => {
        dispatch(clearPharmacySuccess())
    }
}