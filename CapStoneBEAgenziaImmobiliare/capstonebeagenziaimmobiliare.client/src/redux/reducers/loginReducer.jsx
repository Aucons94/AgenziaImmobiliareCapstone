import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_LOGGED_PROFILE, LOGOUT } from "../actions/loginAction";

const initialState = {
  isLoading: false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: {},
        error: action.payload,
      };
    case SET_LOGGED_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return { ...initialState, user: {} };
    default:
      return state;
  }
};

export default loginReducer;
