import React, { useState, useRef, useEffect } from "react";
import useAuth from "../hook/useAuth";
import { useApi } from "../hook/useApi";

const LOGIN_URL = "/logins/auth";

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
};

export default function FunLogin(props) {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState();

  // Custom hook useApi
  const auth_params = `?identifier=${name}&password=password`;
  // eslint-disable-next-line
  const [user, setUser, apiAuth] = useApi(LOGIN_URL + auth_params); // Custom Hook from context Api

  // const nameRef = useRef();
  const errRef = useRef();

  // Custom hook useAuth
  const { setAuth } = useAuth();

  useEffect(() => {
    setErrMsg("");
  }, [name, password]);

  useEffect(() => {
    // login auth ok => login
    if (user.role) {
      loginSuccess(user);
      props.setIsConnected(true);
      props.setUserConnected(user);
    }
    // eslint-disable-next-line
  }, [user]);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    try {
      apiAuth();
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log(err);
        setErrMsg("Unauthorized");
      } else {
        console.log(err);
        setErrMsg("Login Failed");
      }

      errRef.current.focus();
    }
  };

  const loginSuccess = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setAuth(name, password);
    setName("");
    setPassword("");
  };

  useEffect(() => {
    setErrMsg("");
  }, [name, password]);

  return (
    <form className="form-signin" onSubmit={handleSubmitLogin}>
      <img
        className="mb-4"
        src="https://www.kindpng.com/picc/m/230-2305239_meme-vector-png-surprised-meme-face-transparent-png.png"
        alt=""
        width="72"
        height="72"
      />
      <h1 className="h3 mb-3 font-weight-normal">
        Connecte toi pour plus de fun
      </h1>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <label htmlFor="inputEmail" className="sr-only">
        Identifiant
      </label>
      <input
        type="text"
        id="login"
        className="form-control"
        placeholder="Email address"
        required=""
        autoFocus=""
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="form-control"
        placeholder="Password"
        required=""
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Envoyer
      </button>
    </form>
  );
}
