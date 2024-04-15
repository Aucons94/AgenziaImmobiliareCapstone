export const CREATE_VALUTAZIONE_REQUEST = "CREATE_VALUTAZIONE_REQUEST";
export const CREATE_VALUTAZIONE_SUCCESS = "CREATE_VALUTAZIONE_SUCCESS";
export const CREATE_VALUTAZIONE_FAILURE = "CREATE_VALUTAZIONE_FAILURE";

export const createValutazioneRequest = () => ({
  type: CREATE_VALUTAZIONE_REQUEST,
});

export const createValutazioneSuccess = (data) => ({
  type: CREATE_VALUTAZIONE_SUCCESS,
  payload: data,
});

export const createValutazioneFailure = (error) => ({
  type: CREATE_VALUTAZIONE_FAILURE,
  payload: error,
});

export const createValutazione = (valutazioneData) => async (dispatch) => {
  dispatch(createValutazioneRequest());
  try {
    const response = await fetch("https://localhost:7124/VendiCasa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valutazioneData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    dispatch(createValutazioneSuccess(data));
  } catch (error) {
    dispatch(createValutazioneFailure(error.toString()));
  }
};
