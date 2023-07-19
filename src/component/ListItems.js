import React, { useState } from "react";
import axios from "axios";
import { authActions, listActions } from "../store_redux/store";
import { useDispatch, useSelector } from "react-redux";
import classes from "../pages/Home.module.css";
const ListItems = (props) => {
  const ExpItems = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const deleteHandler = async () => {
    const res = await axios.delete(
      `https://expensetracker-e45bb-default-rtdb.firebaseio.com/expenses/${props.item.userId}/${props.item.itemId}.json`
    );
    const arr = [...ExpItems.items];
    console.log(arr);
    ExpItems.items.map((v, i) => {
      if (v.itemId === props.item.itemId) {
        arr.splice(i, 1);
      }
      return false;
    });
    dispatch(listActions.removeItem(arr));
    console.log(arr);
  };

  return (
    <>
      <div
        className={classes.list}
        style={{
          boxShadow: "5px 5px 10px grey",
          // width: "92%",
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
            style={{
              margin: "3px",
              border: "none",
              padding: "5px 20px",
              boxShadow: "2px 2px 5px grey",
              backgroundColor: "yellow",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            style={{
              margin: "3px",
              border: "none",
              padding: "5px 15px",
              boxShadow: "2px 2px 5px grey",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ListItems;
