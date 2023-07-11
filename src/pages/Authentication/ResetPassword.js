import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const enteredEmailRef = useRef();
  const navigate = useNavigate();
  const resetHandler = async (e) => {
    e.preventDefault(e);
    const res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCga42fkHMcRKhgmjFJXpjEMCd2G7sIOA8 ",
      {
        requestType: "PASSWORD_RESET",
        email: enteredEmailRef.current.value,
      }
    );
    console.log(res);
    if (res.status === 200) {
      alert("reset link sent");
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        width: "600px",
        margin: " 70px auto",
        border: "1px solid grey",
        backgroundColor: "grey",
        textAlign: "center",
        height: "200px",
      }}
    >
      <h2>ResetPassword</h2>
      <form onSubmit={resetHandler}>
        <label>Enter email</label>
        <input
          type="email"
          ref={enteredEmailRef}
          style={{ display: "block", width: "500px", margin: "auto" }}
        />
        <button type="submit">SEND CODE</button>
      </form>
    </div>
  );
};

export default ResetPassword;
