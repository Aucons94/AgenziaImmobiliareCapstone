import { fetchWithAuth } from "../utils/authToken";

export const FETCH_UTENTI_REQUEST = "FETCH_UTENTI_REQUEST";
export const FETCH_UTENTI_SUCCESS = "FETCH_UTENTI_SUCCESS";
export const FETCH_UTENTI_FAILURE = "FETCH_UTENTI_FAILURE";
export const DELETE_UTENTE_REQUEST = "DELETE_UTENTE_REQUEST";
export const DELETE_UTENTE_SUCCESS = "DELETE_UTENTE_SUCCESS";
export const DELETE_UTENTE_FAILURE = "DELETE_UTENTE_FAILURE";
export const FETCH_DETTAGLI_UTENTE_REQUEST = "FETCH_DETTAGLI_UTENTE_REQUEST";
export const FETCH_DETTAGLI_UTENTE_SUCCESS = "FETCH_DETTAGLI_UTENTE_SUCCESS";
export const FETCH_DETTAGLI_UTENTE_FAILURE = "FETCH_DETTAGLI_UTENTE_FAILURE";
export const MODIFICA_UTENTE_REQUEST = "MODIFICA_UTENTE_REQUEST";
export const MODIFICA_UTENTE_SUCCESS = "MODIFICA_UTENTE_SUCCESS";
export const MODIFICA_UTENTE_FAILURE = "MODIFICA_UTENTE_FAILURE";
export const CARICA_RUOLI_REQUEST = "CARICA_RUOLI_REQUEST";
export const CARICA_RUOLI_SUCCESS = "CARICA_RUOLI_SUCCESS";
export const CARICA_RUOLI_FAILURE = "CARICA_RUOLI_FAILURE";

export function fetchGestioneUtenti() {
  return async (dispatch) => {
    dispatch({ type: FETCH_UTENTI_REQUEST });
    try {
      const response = await fetchWithAuth("https://localhost:7124/GestioneUtenti");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
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
      const response = await fetchWithAuth(`https://localhost:7124/GestioneUtenti/${id}/delete`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      dispatch({ type: DELETE_UTENTE_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_UTENTE_FAILURE, payload: error.message });
    }
  };
}

export const fetchDettagliUtente = (id) => async (dispatch) => {
  dispatch({ type: FETCH_DETTAGLI_UTENTE_REQUEST });
  try {
    const response = await fetchWithAuth(`https://localhost:7124/GestioneUtenti/${id}`);
    if (!response.ok) {
      throw new Error("Dettagli utente non trovati");
    }
    const data = await response.json();
    dispatch({ type: FETCH_DETTAGLI_UTENTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_DETTAGLI_UTENTE_FAILURE, payload: error.message });
  }
};

export const fetchModificaUtente = (id, user, file) => async (dispatch) => {
  dispatch({ type: MODIFICA_UTENTE_REQUEST });

  const formData = new FormData();
  Object.keys(user).forEach((key) => {
    if (user[key] !== null && user[key] !== undefined) {
      formData.append(key, user[key]);
    }
  });

  if (file) {
    formData.append("foto", file);
  }
  try {
    const response = await fetchWithAuth(`https://localhost:7124/GestioneUtenti/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Errore nella modifica dell'utente");
    }
    const updatedUser = await response.json();
    dispatch({ type: MODIFICA_UTENTE_SUCCESS, payload: updatedUser });
  } catch (error) {
    dispatch({ type: MODIFICA_UTENTE_FAILURE, payload: error.message });
  }
};

export const fetchRuoli = () => async (dispatch) => {
  dispatch({ type: CARICA_RUOLI_REQUEST });
  try {
    const response = await fetchWithAuth("https://localhost:7124/GestioneUtenti/ruoli");
    if (!response.ok) {
      throw new Error("Errore nel caricamento dei ruoli");
    }
    const ruoli = await response.json();
    dispatch({ type: CARICA_RUOLI_SUCCESS, payload: ruoli });
  } catch (error) {
    dispatch({ type: CARICA_RUOLI_FAILURE, payload: error.message });
  }
};
