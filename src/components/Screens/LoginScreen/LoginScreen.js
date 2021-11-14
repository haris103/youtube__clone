import React, { useEffect } from "react";
import "./_loginscreen.scss";
import { Login } from "./../../../Redux/actions/auth.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const LoginScreen = () => {
  const dispatchh = useDispatch();
  const handleClick = () => {
    dispatchh(Login());
  };
  const accessToken = useSelector((state) => state.authh.accessToken);
  const history = useHistory();
  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);
  return (
    <div className="login">
      <div className="login__container">
        <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" />
        <button onClick={handleClick}>Login with Google</button>
        <p>Login with Firebase :)</p>
      </div>
    </div>
  );
};

export default LoginScreen;
