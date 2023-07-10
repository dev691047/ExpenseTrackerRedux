import React, { useRef, useState } from "react";
import classes from "./AuthPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const switchAuthModeHandler = () => {};

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCga42fkHMcRKhgmjFJXpjEMCd2G7sIOA8",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    console.log(res);
    alert("signup successful");
    emailInputRef.current.value = null;
    passwordInputRef.current.value = null;
    navigate("/home");
  };

  return (
    <>
      <section className={classes.auth} style={{ marginTop: "100px" }}>
        <h1>Sign Up</h1>
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
          <button type="submit">Create new account</button>
          <div className={classes.actions}>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              <Link to="/login">Login with existing account</Link>
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signup;
