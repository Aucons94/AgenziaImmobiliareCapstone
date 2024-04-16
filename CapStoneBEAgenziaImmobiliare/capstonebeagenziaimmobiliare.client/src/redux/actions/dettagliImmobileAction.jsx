export const GET_IMMOBILE_DETAILS_REQUEST = "GET_IMMOBILE_DETAILS_REQUEST";
export const GET_IMMOBILE_DETAILS_SUCCESS = "GET_IMMOBILE_DETAILS_SUCCESS";
export const GET_IMMOBILE_DETAILS_FAIL = "GET_IMMOBILE_DETAILS_FAIL";

export const getDettaglioImmobile = (idImmobile) => async (dispatch) => {
  dispatch({ type: GET_IMMOBILE_DETAILS_REQUEST });
  try {
    const response = await fetch(`https://localhost:7124/Dettagli/${idImmobile}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch({ type: GET_IMMOBILE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_IMMOBILE_DETAILS_FAIL, payload: error.message });
  }
};
