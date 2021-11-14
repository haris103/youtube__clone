import firebase from "firebase/compat/app";
import auth from "../../firebase";
// import "firebase/compat/auth";
import {
  LOGIN_REQUEST,
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "./../actionType";

export const Login = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const providerr = new firebase.auth.GoogleAuthProvider();
    const response = await auth.signInWithPopup(providerr);
    console.log("Response from Firebase", response);
    providerr.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

    const accessToken = response.credential.accessToken;
    const profile = {
      name: response.additionalUserInfo.profile.name,
      photoURL: response.additionalUserInfo.profile.picture,
    };

    sessionStorage.setItem("yt-access-token", accessToken);
    sessionStorage.setItem("yt-user", JSON.stringify(profile));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: accessToken,
    });
    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    // console.log("ERROR:", error.message);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};
export const log_out = () => async (dispatch) => {
  await auth.signOut();
  dispatch({
    type: LOG_OUT,
  });

  sessionStorage.removeItem("yt-access-token");
  sessionStorage.removeItem("yt-user");
};
