import { fetchWithAuth } from "../utils/authToken";

export const GET_IMMOBILI_REQUEST = "GET_IMMOBILI_REQUEST";
export const GET_IMMOBILI_SUCCESS = "GET_IMMOBILI_SUCCESS";
export const GET_IMMOBILI_FAILURE = "GET_IMMOBILI_FAILURE";

export const DELETE_IMMOBILE_REQUEST = "DELETE_IMMOBILE_REQUEST";
export const DELETE_IMMOBILE_SUCCESS = "DELETE_IMMOBILE_SUCCESS";
export const DELETE_IMMOBILE_FAILURE = "DELETE_IMMOBILE_FAILURE";

export const getImmobili = () => async (dispatch) => {
  dispatch({ type: GET_IMMOBILI_REQUEST });
  const url = "https://localhost:7124/GestioneImmobili";

  try {
    const response = await fetchWithAuth(url);
    if (!response.ok) {
      throw new Error("Non autorizzato o errore di rete");
    }
    const data = await response.json();
    dispatch({ type: GET_IMMOBILI_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_IMMOBILI_FAILURE, payload: error.toString() });
  }
};

export const deleteImmobile = (idImmobile) => async (dispatch) => {
  dispatch({ type: DELETE_IMMOBILE_REQUEST });
  const url = `https://localhost:7124/GestioneImmobili/${idImmobile}`;

  try {
    const response = await fetchWithAuth(url, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Errore nella richiesta di eliminazione");
    }
    dispatch({ type: DELETE_IMMOBILE_SUCCESS, payload: idImmobile });
  } catch (error) {
    dispatch({ type: DELETE_IMMOBILE_FAILURE, payload: error.toString() });
  }
};
