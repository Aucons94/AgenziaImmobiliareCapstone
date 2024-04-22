import { fetchWithAuth } from "../utils/authToken";

export const FETCH_VALUTAZIONI_REQUEST = "FETCH_VALUTAZIONI_REQUEST";
export const FETCH_VALUTAZIONI_SUCCESS = "FETCH_VALUTAZIONI_SUCCESS";
export const FETCH_VALUTAZIONI_FAILURE = "FETCH_VALUTAZIONI_FAILURE";
export const DELETE_VALUTAZIONE_REQUEST = "DELETE_VALUTAZIONE_REQUEST";
export const DELETE_VALUTAZIONE_SUCCESS = "DELETE_VALUTAZIONE_SUCCESS";
export const DELETE_VALUTAZIONE_FAILURE = "DELETE_VALUTAZIONE_FAILURE";
export const FETCH_VALUTAZIONE_DETTAGLI_REQUEST = "FETCH_VALUTAZIONE_DETTAGLI_REQUEST";
export const FETCH_VALUTAZIONE_DETTAGLI_SUCCESS = "FETCH_VALUTAZIONE_DETTAGLI_SUCCESS";
export const FETCH_VALUTAZIONE_DETTAGLI_FAILURE = "FETCH_VALUTAZIONE_DETTAGLI_FAILURE";
export const TOGGLE_ATTIVO_REQUEST = "TOGGLE_ATTIVO_REQUEST";
export const TOGGLE_ATTIVO_SUCCESS = "TOGGLE_ATTIVO_SUCCESS";
export const TOGGLE_ATTIVO_FAILURE = "TOGGLE_ATTIVO_FAILURE";

const fetchValutazioniRequest = () => ({
  type: FETCH_VALUTAZIONI_REQUEST,
});

const fetchValutazioniSuccess = (valutazioni) => ({
  type: FETCH_VALUTAZIONI_SUCCESS,
  payload: valutazioni,
});

const fetchValutazioniFailure = (error) => ({
  type: FETCH_VALUTAZIONI_FAILURE,
  payload: error,
});

export const fetchValutazioni = () => {
  return (dispatch) => {
    dispatch(fetchValutazioniRequest());
    fetchWithAuth("https://localhost:7124/GestioneValutazioni")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => dispatch(fetchValutazioniSuccess(data)))
      .catch((error) => dispatch(fetchValutazioniFailure(error.message)));
  };
};

export const deleteValutazione = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_VALUTAZIONE_REQUEST });
    fetchWithAuth(`https://localhost:7124/GestioneValutazioni/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        dispatch({ type: DELETE_VALUTAZIONE_SUCCESS, payload: id });
      })
      .catch((error) => dispatch({ type: DELETE_VALUTAZIONE_FAILURE, payload: error.message }));
  };
};

export const fetchValutazioneDettagli = (id) => async (dispatch) => {
  dispatch({ type: FETCH_VALUTAZIONE_DETTAGLI_REQUEST });
  try {
    const response = await fetchWithAuth(`https://localhost:7124/GestioneValutazioni/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch({ type: FETCH_VALUTAZIONE_DETTAGLI_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_VALUTAZIONE_DETTAGLI_FAILURE, payload: error.message });
  }
};

export const toggleAttivo = (id, currentState) => (dispatch) => {
  dispatch({ type: TOGGLE_ATTIVO_REQUEST, payload: id });
  dispatch({
    type: TOGGLE_ATTIVO_SUCCESS,
    payload: { id, attivo: !currentState },
  });

  fetchWithAuth(`https://localhost:7124/GestioneValutazioni/${id}/attivo`, {
    method: "PUT",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      dispatch({ type: TOGGLE_ATTIVO_FAILURE, payload: error.message });
      dispatch({
        type: TOGGLE_ATTIVO_SUCCESS,
        payload: { id, attivo: currentState },
      });
    });
};
