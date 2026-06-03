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
} from "../constants/actionTypes";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/apiConfig";

export function fetchGestioneUtenti() {
  return async (dispatch) => {
    dispatch({ type: FETCH_UTENTI_REQUEST });
    try {
      const response = await apiClient.get(API_ENDPOINTS.GESTIONE_UTENTI);
      const data = await response.json();
      dispatch({ type: FETCH_UTENTI_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_UTENTI_FAILURE, payload: error.message });
    }
  };
}

export function deleteUtente(id) {
  return async (dispatch) => {
    dispatch({ type: DELETE_UTENTE_REQUEST });
    try {
      await apiClient.put(API_ENDPOINTS.GESTIONE_UTENTI_DELETE(id), {});
      dispatch({ type: DELETE_UTENTE_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_UTENTE_FAILURE, payload: error.message });
    }
  };
}

export const fetchDettagliUtente = (id) => async (dispatch) => {
  dispatch({ type: FETCH_DETTAGLI_UTENTE_REQUEST });
  try {
    const response = await apiClient.get(API_ENDPOINTS.GESTIONE_UTENTI_BY_ID(id));
    const data = await response.json();
    dispatch({ type: FETCH_DETTAGLI_UTENTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_DETTAGLI_UTENTE_FAILURE, payload: error.message });
  }
};

export const fetchModificaUtente = (id, formData) => async (dispatch) => {
  dispatch({ type: MODIFICA_UTENTE_REQUEST });
  try {
    const response = await apiClient.put(API_ENDPOINTS.GESTIONE_UTENTI_BY_ID(id), formData);
    const message = await response.json();
    dispatch({ type: MODIFICA_UTENTE_SUCCESS, payload: message });
    return message;
  } catch (error) {
    dispatch({ type: MODIFICA_UTENTE_FAILURE, payload: error.message });
    throw error;
  }
};

export const fetchRuoli = () => async (dispatch) => {
  dispatch({ type: CARICA_RUOLI_REQUEST });
  try {
    const response = await apiClient.get(API_ENDPOINTS.GESTIONE_UTENTI_RUOLI);
    const ruoli = await response.json();
    dispatch({ type: CARICA_RUOLI_SUCCESS, payload: ruoli });
  } catch (error) {
    dispatch({ type: CARICA_RUOLI_FAILURE, payload: error.message });
  }
};

export const creaUtente = (userData, setError) => async (dispatch) => {
  dispatch({ type: CREA_UTENTE_REQUEST });
  try {
    const response = await apiClient.post(API_ENDPOINTS.GESTIONE_UTENTI, userData);
    const data = await response.json();
    dispatch({ type: CREA_UTENTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREA_UTENTE_FAILURE, payload: error.message });
    setError(error.message);
  }
};
