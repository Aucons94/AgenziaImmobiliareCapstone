export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SET_LOGGED_PROFILE = "SET_LOGGED_PROFILE";
export const LOGOUT = "LOGOUT";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return {
    type: LOGIN_SUCCESS,
    payload: data.user,
  };
};

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const setLoggedProfile = (loggedProfileData) => {
  localStorage.setItem("user", JSON.stringify(loggedProfileData));
  return {
    type: SET_LOGGED_PROFILE,
    payload: loggedProfileData,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: LOGOUT,
  };
};

export const fetchLogin = (loginObj) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetch("https://localhost:7124/Auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Errore nel fetch:", err);
      dispatch(loginFailure(err));
    } else {
      const loggedProfileData = await response.json();
      dispatch(loginSuccess(loggedProfileData));
    }
  } catch (error) {
    console.error("Errore nel fetch:", error);
    dispatch(loginFailure("Errore di connessione"));
  }
};
