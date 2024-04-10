import {
  FETCH_STAFF_BEGIN,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
  FETCH_IMMOBILI_BEGIN,
  FETCH_IMMOBILI_SUCCESS,
  FETCH_IMMOBILI_FAILURE,
  SET_TERMINI_DI_RICERCA,
} from "../actions/homeAction";

const initialStaffState = {
  items: [],
  loading: false,
  error: null,
};

const initialImmobiliState = {
  items: [],
  loading: false,
  error: null,
};
const initialRicercaState = {
  terminiDiRicerca: {},
};

export function staffReducer(state = initialStaffState, action) {
  switch (action.type) {
    case FETCH_STAFF_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.staff,
      };
    case FETCH_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    default:
      return state;
  }
}

export function immobiliReducer(state = initialImmobiliState, action) {
  switch (action.type) {
    case FETCH_IMMOBILI_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_IMMOBILI_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.immobili,
      };
    case FETCH_IMMOBILI_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    default:
      return state;
  }
}

export default function searchReducer(state = initialRicercaState, action) {
  switch (action.type) {
    case SET_TERMINI_DI_RICERCA:
      return {
        ...state,
        terminiDiRicerca: action.payload,
      };
    default:
      return state;
  }
}
