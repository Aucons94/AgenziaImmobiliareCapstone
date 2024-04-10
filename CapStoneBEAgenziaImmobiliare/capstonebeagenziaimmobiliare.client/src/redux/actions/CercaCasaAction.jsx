export const FETCH_RICERCA_IMMOBILI_BEGIN = "FETCH_RICERCA_IMMOBILI_BEGIN";
export const FETCH_RICERCA_IMMOBILI_SUCCESS = "FETCH_RICERCA_IMMOBILI_SUCCESS";
export const FETCH_RICERCA_IMMOBILI_FAILURE = "FETCH_RICERCA_IMMOBILI_FAILURE";

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
  return (dispatch) => {
    dispatch(fetchRicercaImmobiliBegin());
    const queryParams = new URLSearchParams({
      tipoProprieta: tipoProprieta,
      locazione: affitto, // Aggiunto qui per inviare al backend
    });

    if (ricerca.trim() !== "") {
      queryParams.append("ricerca", ricerca); // Cambiato da comune e indirizzo a ricerca per allinearlo con il backend
    }

    return fetch(`https://localhost:7124/CercaCasa/cercaImmobili?${queryParams}`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchRicercaImmobiliSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchRicercaImmobiliFailure(error)));
  };
}

// Funzione ausiliaria per gestire le risposte con errore
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
