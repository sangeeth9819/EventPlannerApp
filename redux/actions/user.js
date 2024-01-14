import { ADD_USER } from '../index';
export const addUser = (item) => dispatch => {
    dispatch({
        type: ADD_USER,
        payload: item

    })
}