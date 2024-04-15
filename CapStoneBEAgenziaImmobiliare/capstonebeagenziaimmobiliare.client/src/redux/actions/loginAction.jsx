export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SET_LOGGED_PROFILE = "SET_LOGGED_PROFILE";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const setLoggedProfile = (loggedProfileData) => ({
  type: SET_LOGGED_PROFILE,
  payload: loggedProfileData,
});

export const fetchLogin = (loginObj) => async (dispatch) => {
  console.log("fetchLogin", loginObj);
  try {
    const response = await fetch("https://localhost:7124/" + "Auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    });

    if (!response.ok) {
      response.json().then((err) => {
        console.error("Errore nel fetch:", err);
        dispatch(loginFailure(err));
      });
    } else {
      const loggedProfileData = await response.json();
      console.info("Accesso effettuato", loggedProfileData);
      dispatch(setLoggedProfile(loggedProfileData));
    }
  } catch (error) {
    // Puoi gestire gli errori qui, se necessario
    console.error("Errore nel fetch:", error);
  }
};
