import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../component/Layout";

export const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "grey",
      }}
    >
      <h2
        style={{
          color: "black",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        Welcome
      </h2>
      <h3>
        complete your profile
        <Link style={{ color: "red" }} to="/updateProfile">
          _now!
        </Link>
        <Layout />
      </h3>
    </div>
  );
};
