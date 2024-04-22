import { fetchWithAuth } from "../utils/authToken";

export const editImmobile = (id, immobile) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(`https://localhost:7124/gestioneimmobili/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(immobile),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: "MODIFICA_IMMOBILE_SUCCESS",
        payload: data,
      });
    } else {
      dispatch({
        type: "MODIFICA_IMMOBILE_FAIL",
        payload: data,
      });
    }
  } catch (error) {
    console.error("Errore nella modifica dell'immobile:", error);
    dispatch({
      type: "MODIFICA_IMMOBILE_FAIL",
      payload: error.message,
    });
  }
};

export const getImmobileDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "IMMOBILE_DETAILS_REQUEST" });

    const response = await fetchWithAuth(`https://localhost:7124/gestioneimmobili/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch immobile details");
    }

    const data = await response.json();

    dispatch({
      type: "IMMOBILE_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "IMMOBILE_DETAILS_FAIL",
      payload: error.message || "Something went wrong",
    });
  }
};

export const fetchStaffMembers = () => async (dispatch) => {
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

export const uploadImage = (idImmobile, file) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth(`https://localhost:7124/gestioneImmobili/${idImmobile}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: "UPLOAD_IMAGE_SUCCESS",
        payload: { ...data, immagine: URL.createObjectURL(file) },
      });
      return { success: true, data: { ...data, immagine: URL.createObjectURL(file) } };
    } else {
      dispatch({
        type: "UPLOAD_IMAGE_FAIL",
        payload: data.message || "Failed to upload image",
      });
      return { success: false, message: data.message || "Failed to upload image" };
    }
  } catch (error) {
    dispatch({
      type: "UPLOAD_IMAGE_FAIL",
      payload: error.message,
    });
    return { success: false, message: error.message || "Network error" };
  }
};

export const setImageAsCover = (idImmagine) => async (dispatch) => {
  try {
    await fetchWithAuth(`https://localhost:7124/gestioneImmobili/setCopertina/${idImmagine}`, { method: "POST" });
    dispatch({
      type: "SET_COVER_IMAGE_SUCCESS",
      payload: idImmagine,
    });
  } catch (error) {
    dispatch({
      type: "SET_COVER_IMAGE_FAIL",
      payload: error.message,
    });
  }
};

export const removeImage = (idImmobile, idImmagine) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(`https://localhost:7124/gestioneImmobili/${idImmobile}/images/${idImmagine}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch({
        type: "REMOVE_IMAGE_SUCCESS",
        payload: idImmagine,
      });
      return { success: true };
    } else {
      throw new Error("Failed to remove image");
    }
  } catch (error) {
    dispatch({
      type: "REMOVE_IMAGE_FAIL",
      payload: error.message,
    });
    return { success: false, message: error.message };
  }
};
