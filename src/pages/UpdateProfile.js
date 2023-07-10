import React, { useEffect, useRef } from "react";
import axios from "axios";
const UpdateProfile = () => {
  const changeName = useRef();
  const changeUrl = useRef();
  const token = localStorage.getItem("tokenId");

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = changeName.current.value;
    const url = changeUrl.current.value;

    const res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCga42fkHMcRKhgmjFJXpjEMCd2G7sIOA8",
      {
        idToken: token,
        displayName: name,
        photoUrl: url,
        returnSecureToken: true,
      }
    );
  };

  const infoHandler = async () => {
    const res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCga42fkHMcRKhgmjFJXpjEMCd2G7sIOA8",
      {
        idToken: token,
      }
    );
    console.log(res);

    changeName.current.value = res.data.users[0].displayName;
    changeUrl.current.value = res.data.users[0].photoUrl;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "grey",
        }}
      >
        <p>Winners never quit ,Quitters never win</p>
        <p>A higher profile has higher chance of selection</p>
      </div>

      <form style={{ width: "800px", margin: "auto" }} onSubmit={submitHandler}>
        <h2>Contact details</h2>
        <label
          style={{ fontWeight: "600", marginRight: "20px", color: "grey" }}
        >
          Profile photo Url
        </label>
        <input
          style={{ marginRight: "20px" }}
          type="text"
          ref={changeUrl}
        ></input>
        <label
          style={{ fontWeight: "600", marginRight: "20px", color: "grey" }}
        >
          Full Name
        </label>
        <input type="text" ref={changeName}></input>
        <button
          type="submit"
          style={{
            display: "block",
            marginTop: "20px",
            border: "none",
            width: "100px",
            backgroundColor: "blue",
            color: "white",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </form>
      <button
        style={{
          display: "block",

          margin: "20px  868px",
          border: "none",
          width: "100px",
          backgroundColor: "red",
          color: "white",
          cursor: "pointer",
        }}
        onClick={infoHandler}
      >
        get user info
      </button>
    </>
  );
};

export default UpdateProfile;
