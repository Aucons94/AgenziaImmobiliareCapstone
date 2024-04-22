import {
  FETCH_VALUTAZIONI_REQUEST,
  FETCH_VALUTAZIONI_SUCCESS,
  FETCH_VALUTAZIONI_FAILURE,
  DELETE_VALUTAZIONE_REQUEST,
  DELETE_VALUTAZIONE_SUCCESS,
  DELETE_VALUTAZIONE_FAILURE,
  FETCH_VALUTAZIONE_DETTAGLI_REQUEST,
  FETCH_VALUTAZIONE_DETTAGLI_SUCCESS,
  FETCH_VALUTAZIONE_DETTAGLI_FAILURE,
  TOGGLE_ATTIVO_REQUEST,
  TOGGLE_ATTIVO_SUCCESS,
  TOGGLE_ATTIVO_FAILURE,
} from "../actions/gestioneValutazione";

const initialState = {
  loading: false,
  valutazioni: [],
  error: "",
  dettagliLoading: false,
  valutazioneDettagli: null,
  dettagliError: null,
};

const gestioneValutazioniReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VALUTAZIONI_REQUEST:
    case DELETE_VALUTAZIONE_REQUEST:
    case TOGGLE_ATTIVO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_VALUTAZIONE_DETTAGLI_REQUEST:
      return {
        ...state,
        dettagliLoading: true,
        dettagliError: null,
      };
    case FETCH_VALUTAZIONI_SUCCESS:
      return {
        ...state,
        loading: false,
        valutazioni: action.payload,
        error: "",
      };
    case FETCH_VALUTAZIONE_DETTAGLI_SUCCESS:
      return {
        ...state,
        dettagliLoading: false,
        valutazioneDettagli: action.payload,
        dettagliError: "",
      };
    case TOGGLE_ATTIVO_SUCCESS: {
      const updatedValutazioni = state.valutazioni.map((val) =>
        val.id === action.payload.id ? { ...val, attivo: action.payload.attivo } : val
      );
      return {
        ...state,
        loading: false,
        valutazioni: updatedValutazioni,
        valutazioneDettagli:
          state.valutazioneDettagli && state.valutazioneDettagli.id === action.payload.id
            ? { ...state.valutazioneDettagli, attivo: action.payload.attivo }
            : state.valutazioneDettagli,
      };
    }
    case FETCH_VALUTAZIONI_FAILURE:
    case DELETE_VALUTAZIONE_FAILURE:
    case TOGGLE_ATTIVO_FAILURE:
    case FETCH_VALUTAZIONE_DETTAGLI_FAILURE:
      return {
        ...state,
        loading: false,
        dettagliLoading: false,
        error: action.payload,
      };
    case DELETE_VALUTAZIONE_SUCCESS:
      return {
        ...state,
        loading: false,
        valutazioni: state.valutazioni.filter((val) => val.id !== action.payload),
      };
    default:
      return state;
  }
};

export default gestioneValutazioniReducer;
