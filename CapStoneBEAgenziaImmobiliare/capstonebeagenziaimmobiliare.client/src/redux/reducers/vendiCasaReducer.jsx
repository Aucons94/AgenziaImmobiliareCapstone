import {
  CREATE_VALUTAZIONE_REQUEST,
  CREATE_VALUTAZIONE_SUCCESS,
  CREATE_VALUTAZIONE_FAILURE,
} from "../actions/VendiCasaAction";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const valutazioneReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_VALUTAZIONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_VALUTAZIONE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case CREATE_VALUTAZIONE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
