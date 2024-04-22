import { fetchWithAuth } from "../utils/authToken";

export const createImmobile = (formData) => async (dispatch) => {
  try {
    const response = await fetchWithAuth("https://localhost:7124/creaimmobile", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: "CREATE_IMMOBILE_SUCCESS",
        payload: data,
      });
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create immobile");
    }
  } catch (error) {
    console.error("Error creating immobile:", error);
    dispatch({
      type: "CREATE_IMMOBILE_FAIL",
      payload: error.toString(),
    });
  }
};

export const fetchStaffMembersCreate = () => async (dispatch) => {
  dispatch({ type: "FETCH_STAFF_REQUEST" });
  try {
    const response = await fetchWithAuth("https://localhost:7124/gestioneimmobili/staff", {
      method: "GET",
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "FETCH_STAFF_SUCCESS", payload: data });
    } else {
      dispatch({ type: "FETCH_STAFF_FAIL", payload: "Unable to fetch staff data" });
    }
  } catch (error) {
    dispatch({ type: "FETCH_STAFF_FAIL", payload: error.message });
  }
};
