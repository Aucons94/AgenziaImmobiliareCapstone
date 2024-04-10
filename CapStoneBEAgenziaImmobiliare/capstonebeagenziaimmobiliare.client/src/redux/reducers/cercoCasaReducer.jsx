import {
  FETCH_RICERCA_IMMOBILI_BEGIN,
  FETCH_RICERCA_IMMOBILI_SUCCESS,
  FETCH_RICERCA_IMMOBILI_FAILURE,
} from "../actions/CercaCasaAction";

const initialSearchResultsState = {
  risultatiRicerca: [],
  loading: false,
  error: null,
};

export function searchResultsReducer(state = initialSearchResultsState, action) {
  switch (action.type) {
    case FETCH_RICERCA_IMMOBILI_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_RICERCA_IMMOBILI_SUCCESS:
      return {
        ...state,
        loading: false,
        risultatiRicerca: action.payload.risultatiRicerca,
      };
    case FETCH_RICERCA_IMMOBILI_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        risultatiRicerca: [],
      };
    default:
      return state;
  }
}
