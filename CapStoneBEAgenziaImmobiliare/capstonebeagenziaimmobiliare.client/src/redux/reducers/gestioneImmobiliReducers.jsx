import {
  GET_IMMOBILI_REQUEST,
  GET_IMMOBILI_SUCCESS,
  GET_IMMOBILI_FAILURE,
  DELETE_IMMOBILE_REQUEST,
  DELETE_IMMOBILE_SUCCESS,
  DELETE_IMMOBILE_FAILURE,
} from "../actions/gestioneImmobiliAction";

const initialState = {
  loading: false,
  immobili: [],
  error: "",
};

export const gestioneimmobiliReducer = (state = initialState, action) => {
  let updatedImmobili;

  switch (action.type) {
    case GET_IMMOBILI_REQUEST:
      return { ...state, loading: true };
    case GET_IMMOBILI_SUCCESS:
      return { ...state, loading: false, immobili: action.payload };
    case GET_IMMOBILI_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_IMMOBILE_REQUEST:
      return { ...state, loading: true };
    case DELETE_IMMOBILE_SUCCESS:
      updatedImmobili = state.immobili.filter((immobile) => immobile.idImmobile !== action.payload);
      return { ...state, loading: false, immobili: updatedImmobili };
    case DELETE_IMMOBILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
