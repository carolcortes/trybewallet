import USER_EMAIL from '../actions/actionTypes';

const INITIAL_STATE = { email: '' };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
