import {
  FETCH_UTENTI_REQUEST,
  FETCH_UTENTI_SUCCESS,
  FETCH_UTENTI_FAILURE,
  DELETE_UTENTE_REQUEST,
  DELETE_UTENTE_SUCCESS,
  DELETE_UTENTE_FAILURE,
  FETCH_DETTAGLI_UTENTE_REQUEST,
  FETCH_DETTAGLI_UTENTE_SUCCESS,
  FETCH_DETTAGLI_UTENTE_FAILURE,
  MODIFICA_UTENTE_REQUEST,
  MODIFICA_UTENTE_SUCCESS,
  MODIFICA_UTENTE_FAILURE,
  CARICA_RUOLI_REQUEST,
  CARICA_RUOLI_SUCCESS,
  CARICA_RUOLI_FAILURE,
  CREA_UTENTE_REQUEST,
  CREA_UTENTE_SUCCESS,
  CREA_UTENTE_FAILURE,
} from "../actions/gestioneUtentiAction";

const initialState = {
  users: [],
  userDetail: null,
  ruoli: [],
  loading: false,
  error: null,
  errorRuoli: null,
};

function gestioneUtentiReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_UTENTI_REQUEST:
    case DELETE_UTENTE_REQUEST:
    case FETCH_DETTAGLI_UTENTE_REQUEST:
    case MODIFICA_UTENTE_REQUEST:
    case CARICA_RUOLI_REQUEST:
    case CREA_UTENTE_REQUEST:
      return { ...state, loading: true, error: null };

    case CARICA_RUOLI_SUCCESS:
      return { ...state, loading: false, ruoli: action.payload, errorRuoli: null };

    case FETCH_UTENTI_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case FETCH_DETTAGLI_UTENTE_SUCCESS:
      return { ...state, loading: false, userDetail: action.payload };

    case MODIFICA_UTENTE_SUCCESS:
    case CREA_UTENTE_SUCCESS: {
      const newUsers =
        action.type === MODIFICA_UTENTE_SUCCESS
          ? state.users.map((user) => (user.idUser === action.payload.idUser ? { ...user, ...action.payload } : user))
          : [...state.users, action.payload];
      return {
        ...state,
        users: newUsers,
        loading: false,
      };
    }

    case DELETE_UTENTE_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.idUser !== action.payload),
        loading: false,
      };

    case CARICA_RUOLI_FAILURE:
    case FETCH_UTENTI_FAILURE:
    case DELETE_UTENTE_FAILURE:
    case FETCH_DETTAGLI_UTENTE_FAILURE:
    case MODIFICA_UTENTE_FAILURE:
    case CREA_UTENTE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default gestioneUtentiReducer;
