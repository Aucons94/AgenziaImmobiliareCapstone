import {
  GET_IMMOBILE_DETAILS_FAIL,
  GET_IMMOBILE_DETAILS_REQUEST,
  GET_IMMOBILE_DETAILS_SUCCESS,
} from "../actions/dettagliImmobileAction";

const initialState = {
  immobile: null,
  loading: false,
  error: null,
};

export const dettaglioImmobileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMMOBILE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case GET_IMMOBILE_DETAILS_SUCCESS:
      return { loading: false, immobile: action.payload, error: null };
    case GET_IMMOBILE_DETAILS_FAIL:
      return { loading: false, error: action.payload, immobile: null };
    default:
      return state;
  }
};

export default dettaglioImmobileReducer;
