export const FETCH_STAFF_BEGIN = "FETCH_STAFF_BEGIN";
export const FETCH_STAFF_SUCCESS = "FETCH_STAFF_SUCCESS";
export const FETCH_STAFF_FAILURE = "FETCH_STAFF_FAILURE";
export const FETCH_IMMOBILI_BEGIN = "FETCH_IMMOBILI_BEGIN";
export const FETCH_IMMOBILI_SUCCESS = "FETCH_IMMOBILI_SUCCESS";
export const FETCH_IMMOBILI_FAILURE = "FETCH_IMMOBILI_FAILURE";
export const SET_TERMINI_DI_RICERCA = "SET_TERMINI_DI_RICERCA";

export const fetchStaffBegin = () => ({
  type: FETCH_STAFF_BEGIN,
});

export const fetchStaffSuccess = (staff) => ({
  type: FETCH_STAFF_SUCCESS,
  payload: { staff },
});

export const fetchStaffFailure = (error) => ({
  type: FETCH_STAFF_FAILURE,
  payload: { error },
});

export const fetchImmobiliBegin = () => ({
  type: FETCH_IMMOBILI_BEGIN,
});

export const fetchImmobiliSuccess = (immobili) => ({
  type: FETCH_IMMOBILI_SUCCESS,
  payload: { immobili },
});

export const fetchImmobiliFailure = (error) => ({
  type: FETCH_IMMOBILI_FAILURE,
  payload: { error },
});

export function fetchStaff() {
  return (dispatch) => {
    dispatch(fetchStaffBegin());
    return fetch("https://localhost:7124/home/staff")
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchStaffSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchStaffFailure(error)));
  };
}

export function fetchImmobili() {
  return (dispatch) => {
    dispatch(fetchImmobiliBegin());
    return fetch("https://localhost:7124/home/immobili")
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchImmobiliSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchImmobiliFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
