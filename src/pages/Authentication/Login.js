import React, { useRef, useState } from "react";
import classes from "./AuthPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../../store_redux/store";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const switchAuthModeHandler = () => {};
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCga42fkHMcRKhgmjFJXpjEMCd2G7sIOA8",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    localStorage.setItem("tokenId", res.data.idToken);
    localStorage.setItem("userId", res.data.localId);

    const obj = {
      token: res.data.idToken,
      userId: res.data.localId,
    };
    dispatch(authActions.login(obj));

    emailInputRef.current.value = null;
    passwordInputRef.current.value = null;
    navigate("/home");
  };

  return (
    <>
      <section className={classes.auth} style={{ marginTop: "100px" }}>
        <h1>Login </h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <button
            type="submit"
            style={{
              cursor: "pointer",
              width: "100px",
              height: "30px",
              color: "blue",
              fontWeight: "600",
            }}
          >
            LOGIN
          </button>
          <Link
            style={{
              color: "orange",
              cursor: "pointer",
              display: "block",
              width: "150px",
              margin: "auto",
            }}
            to="/resetPassword"
          >
            Forget Password
          </Link>
          <div className={classes.actions}>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              <Link to={"/"}>Create new account</Link>
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
