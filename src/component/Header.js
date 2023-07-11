import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div style={{ backgroundColor: "grey" }}>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          height: "30px",
        }}
        onClick={logoutHandler}
      >
        LOGOUT
      </button>
    </div>
  );
};
