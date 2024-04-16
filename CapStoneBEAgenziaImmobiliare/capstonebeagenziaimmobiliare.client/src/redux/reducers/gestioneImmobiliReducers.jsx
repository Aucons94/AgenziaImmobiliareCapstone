import { GET_IMMOBILI_REQUEST, GET_IMMOBILI_SUCCESS, GET_IMMOBILI_FAILURE } from "../actions/gestioneImmobiliAction";

const initialState = {
  loading: false,
  immobili: [],
  error: "",
};

export const gestioneimmobiliReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMMOBILI_REQUEST:
      return { ...state, loading: true };
    case GET_IMMOBILI_SUCCESS:
      return { ...state, loading: false, immobili: action.payload };
    case GET_IMMOBILI_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
