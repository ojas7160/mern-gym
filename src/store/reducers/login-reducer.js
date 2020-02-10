import * as actionTypes from '../actions/login-action';

const initialState = {
  authed: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        token: action.authed
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: action.authed
      }
    case actionTypes.CHECKLOGIN:
      return {
        ...state,
        token: action.authed
      }
    default:
      return state;
  }
}

export default reducer;