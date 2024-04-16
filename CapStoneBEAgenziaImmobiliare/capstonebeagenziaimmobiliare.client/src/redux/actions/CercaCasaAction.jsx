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
      locazione: affitto,
    });

    if (ricerca.trim() !== "") {
      queryParams.append("ricerca", ricerca);
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

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
