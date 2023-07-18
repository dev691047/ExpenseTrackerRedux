import React, { useState } from "react";
import axios from "axios";
const ListItems = (props) => {
  const deleteHandler = async () => {
    const res = await axios.delete(
      `https://expensetracker-e45bb-default-rtdb.firebaseio.com/expenses/${props.item.itemId}.json`
    );
    console.log(props.item.itemId);
  };

  return (
    <>
      <div
        style={{
          boxShadow: "5px 5px 10px grey",
          width: "900px",
          margin: " 20px auto",
          display: "flex",
          justifyContent: "space-between",
          padding: "8px",
          borderRadius: "5px",
        }}
      >
        <span style={{ fontWeight: 600 }}>{props.item.type}</span>
        <span>{props.item.description}</span>
        <span>{props.item.money}</span>
        <div style={{ margin: "3px" }}>
          <button
            onClick={() => props.showHandler(props.item.itemId)}
            style={{ margin: "3px" }}
          >
            Edit
          </button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default ListItems;
