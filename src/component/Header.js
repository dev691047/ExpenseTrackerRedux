import React from "react";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store_redux/store";
import { useDispatch, useSelector } from "react-redux";
import { listActions } from "../store_redux/store";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigate("/login");
    const emptyArr = [];
    dispatch(listActions.setNull(emptyArr));
  };
  return (
    <div>
      <button
        style={{
          backgroundColor: "orange",
          color: "white",
          border: "none",
          height: "30px",
          boxShadow: "2px 2px 5px orange",
          letterSpacing: "2px",
        }}
        onClick={logoutHandler}
      >
        LOGOUT
      </button>
    </div>
  );
};
