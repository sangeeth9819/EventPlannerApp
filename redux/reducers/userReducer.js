import { ADD_USER } from '../index';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
    user: {
      userId:"",
      firstName:"",
      lastName:"",
      email:"",
      maillingAddress:"",
      phoneNumber:"",
      photo:""
    },
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };

        default:
            return state;
    }
};

export default combineReducers({
    user: userReducer,
});
