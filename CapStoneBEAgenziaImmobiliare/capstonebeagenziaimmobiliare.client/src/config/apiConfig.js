// Configurazione centralizzata degli endpoint API
const API_BASE_URL = "http://localhost:5119";

export const API_ENDPOINTS = {
  // Auth
  AUTH_TOKEN: `${API_BASE_URL}/Auth/token`,
  
  // Home
  HOME_STAFF: `${API_BASE_URL}/home/staff`,
  HOME_IMMOBILI: `${API_BASE_URL}/home/immobili`,
  
  // Gestione Immobili
  GESTIONE_IMMOBILI: `${API_BASE_URL}/GestioneImmobili`,
  GESTIONE_IMMOBILI_BY_ID: (id) => `${API_BASE_URL}/GestioneImmobili/${id}`,
  GESTIONE_IMMOBILI_STAFF: `${API_BASE_URL}/GestioneImmobili/staff`,
  GESTIONE_IMMOBILI_UPLOAD: (id) => `${API_BASE_URL}/GestioneImmobili/${id}/upload`,
  GESTIONE_IMMOBILI_SET_COPERTINA: (id) => `${API_BASE_URL}/GestioneImmobili/setCopertina/${id}`,
  GESTIONE_IMMOBILI_DELETE_IMAGE: (idImmobile, idImmagine) => 
    `${API_BASE_URL}/GestioneImmobili/${idImmobile}/images/${idImmagine}`,
  
  // Gestione Utenti
  GESTIONE_UTENTI: `${API_BASE_URL}/GestioneUtenti`,
  GESTIONE_UTENTI_BY_ID: (id) => `${API_BASE_URL}/GestioneUtenti/${id}`,
  GESTIONE_UTENTI_DELETE: (id) => `${API_BASE_URL}/GestioneUtenti/${id}/delete`,
  GESTIONE_UTENTI_RUOLI: `${API_BASE_URL}/GestioneUtenti/Ruoli`,
  
  // Gestione Valutazioni
  GESTIONE_VALUTAZIONI: `${API_BASE_URL}/GestioneValutazioni`,
  GESTIONE_VALUTAZIONI_BY_ID: (id) => `${API_BASE_URL}/GestioneValutazioni/${id}`,
  GESTIONE_VALUTAZIONI_TOGGLE: (id) => `${API_BASE_URL}/GestioneValutazioni/${id}/attivo`,
  
  // Cerca Casa
  CERCA_CASA: `${API_BASE_URL}/CercaCasa`,
  
  // Dettaglio Immobile
  DETTAGLIO_IMMOBILE: (id) => `${API_BASE_URL}/DettaglioImmobile/${id}`,
  
  // Vendi Casa
  VENDI_CASA: `${API_BASE_URL}/VendiCasa`,
};

export default API_BASE_URL;
