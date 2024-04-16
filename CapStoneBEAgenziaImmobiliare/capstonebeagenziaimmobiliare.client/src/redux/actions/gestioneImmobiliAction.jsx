import { fetchWithAuth } from "../utils/authToken";

export const GET_IMMOBILI_REQUEST = "GET_IMMOBILI_REQUEST";
export const GET_IMMOBILI_SUCCESS = "GET_IMMOBILI_SUCCESS";
export const GET_IMMOBILI_FAILURE = "GET_IMMOBILI_FAILURE";

export const getImmobili = () => async (dispatch) => {
  dispatch({ type: GET_IMMOBILI_REQUEST });
  const url = "https://localhost:7124" + "/GestioneImmobili";

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
