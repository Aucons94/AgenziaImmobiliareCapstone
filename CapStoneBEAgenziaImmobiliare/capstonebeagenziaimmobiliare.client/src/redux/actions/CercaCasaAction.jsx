import {
  FETCH_RICERCA_IMMOBILI_BEGIN,
  FETCH_RICERCA_IMMOBILI_SUCCESS,
  FETCH_RICERCA_IMMOBILI_FAILURE,
} from "../constants/actionTypes";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/apiConfig";

export const fetchRicercaImmobiliBegin = () => ({
  type: FETCH_RICERCA_IMMOBILI_BEGIN,
});

export const fetchRicercaImmobiliSuccess = (risultatiRicerca) => ({
  type: FETCH_RICERCA_IMMOBILI_SUCCESS,
  payload: { risultatiRicerca },
});

export const fetchRicercaImmobiliFailure = (error) => ({
  type: FETCH_RICERCA_IMMOBILI_FAILURE,
  payload: { error },
});

export function fetchRicercaImmobili(tipoProprieta, ricerca, affitto = false) {
  return async (dispatch) => {
    dispatch(fetchRicercaImmobiliBegin());
    
    const queryParams = new URLSearchParams({
      tipoProprieta: tipoProprieta,
      locazione: affitto,
    });

    if (ricerca.trim() !== "") {
      queryParams.append("ricerca", ricerca);
    }

    try {
      const response = await apiClient.get(`${API_ENDPOINTS.CERCA_CASA}/cercaImmobili?${queryParams}`);
      const json = await response.json();
      dispatch(fetchRicercaImmobiliSuccess(json));
      return json;
    } catch (error) {
      dispatch(fetchRicercaImmobiliFailure(error.message));
      throw error;
    }
  };
}
