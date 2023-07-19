import React, { useEffect, useRef, useState } from "react";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import { Layout } from "../component/Layout";
import PieChart from "./PieChart";
import ListItems from "../component/ListItems";
import axios from "axios";
import { useSelector } from "react-redux";
import { authActions, listActions } from "../store_redux/store";
import { useDispatch } from "react-redux";

export const Home = () => {
  const dispatch = useDispatch();
  const expTypeRef = useRef();
  const expDescRef = useRef();
  const expMoneyRef = useRef();
  const ExpItems = useSelector((state) => state.items);
  const initalToken = localStorage.getItem("tokenId");
  const initalUserId = localStorage.getItem("userId");
  const [tokenn, setToken] = useState(initalToken);
  const [useridd, setId] = useState(initalUserId);
  const [FormBcknd, setFormBcknd] = useState({});
  const [showEdit, setShowEdit] = useState(false);

  const saveTokenFromLocalStorage = () => {
    if (tokenn) {
      const obj = {
        token: tokenn,
        userId: useridd,
      };
      dispatch(authActions.login(obj));
    }
  };

  useEffect(() => {
    saveTokenFromLocalStorage();
  }, []);

  const saveDataToBackend = async (itemId) => {
    console.log(itemId);
    const res = await axios.put(
      `https://expensetracker-e45bb-default-rtdb.firebaseio.com/expenses/${useridd}/${itemId}.json`,
      {
        description: expDescRef.current.value,
        money: parseInt(expMoneyRef.current.value),
        type: expTypeRef.current.value,
        userId: useridd,
        itemId: itemId,
      }
    );
    console.log(res);
  };
  const getDataFromBackend = async () => {
    console.log("called");
    const res = await axios.get(
      `https://expensetracker-e45bb-default-rtdb.firebaseio.com/expenses/${useridd}.json`,
      {}
    );
    console.log(res.data);

    const emptyArr = [];
    if (res.data) {
      let arr = Object.keys(res.data);
      var newvar = [];
      for (let i = 0; i < arr.length; i++) {
        newvar.push(res.data[arr[i]]);
      }
      console.log(newvar);
      const newarr = [];
      for (let i = 0; i < newvar.length; i++) {
        const obj = {
          type: newvar[i].type,
          description: newvar[i].description,
          money: newvar[i].money,
          userId: newvar[i].userId,
          itemId: newvar[i].itemId,
        };
        newarr.push(obj);
      }
      console.log(newarr);
      dispatch(listActions.initialiseItems(newarr));
    } else {
      dispatch(listActions.initialiseItems(emptyArr));
    }
  };
  useEffect(() => {
    getDataFromBackend();
  }, []);

  const formHandler = (e, edit) => {
    e.preventDefault();

    let itemId = `${useridd}${Date.now()}`;
    const description = expDescRef.current.value;
    const money = expMoneyRef.current.value;
    const type = expTypeRef.current.value;

    const obj = {
      type: type,
      description: description,
      money: parseInt(money),
      userId: useridd,
      itemId: itemId,
    };
    saveDataToBackend(itemId);

    dispatch(listActions.addItems(obj));
    console.log("added");
  };
  const [itemIdEdit, setItemIdEdit] = useState();
  function showHandler(itemId) {
    setShowEdit(true);
    setItemIdEdit(itemId);
  }
  function editFormHandler(e) {
    e.preventDefault(e);

    saveDataToBackend(itemIdEdit);
    setShowEdit(false);
    const description = expDescRef.current.value;
    const money = expMoneyRef.current.value;
    const type = expTypeRef.current.value;

    const obj = {
      type: type,
      description: description,
      money: parseInt(money),
      userId: useridd,
      itemId: itemIdEdit,
    };
    const arr = [...ExpItems.items];
    ExpItems.items.map((v, i) => {
      if (v.itemId === itemIdEdit) {
        arr.splice(i, 1, obj);
      }
      return false;
    });
    dispatch(listActions.editItem(arr));
    console.log(arr);
  }

  return (
    <>
      <div className={classes.Header}>
        <h2 className={classes.Icon}>EXPENSE TRACKER</h2>
        <h3 className={classes.h3} style={{ color: "black" }}>
          complete your profile
          <Link style={{ color: "red" }} to="/updateProfile">
            _now!
          </Link>
          <Layout />
        </h3>
      </div>
      <div className={classes.mainCont}>
        <div className={classes.PieChart}>
          <PieChart />
        </div>
        <div>
          <form className={classes.form} onSubmit={formHandler}>
            <span style={{ display: "block" }}>Select Type</span>
            <select
              style={{
                width: "200px",
                height: "30px",
                border: "none",
                boxShadow: "0 0 5px grey",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
              id="select1"
              ref={expTypeRef}
            >
              <option value="">select type</option>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="grocery">Grocery</option>
              <option value="rent">Rent</option>
              <option value="electricity">Electricity Bill</option>
            </select>
            <span style={{ display: "block" }}>Money Spent</span>
            <input
              style={{
                width: "250px",
                height: "30px",
                border: "none",
                boxShadow: "0 0 5px grey",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
              ref={expMoneyRef}
              type="number"
            ></input>
            <span style={{ display: "block" }}>Description</span>
            <input
              style={{
                width: "250px",
                height: "25px",
                border: "none",
                boxShadow: "0 0 5px grey",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
              ref={expDescRef}
              type="text"
            />
            <button className={classes.formBtn} type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
      <div>
        {ExpItems.items.map((v, i) => {
          return (
            <ListItems
              key={v.itemId}
              item={v}
              // refresh={reload}
              showHandler={showHandler}
            />
          );
        })}
      </div>
      {showEdit && (
        <div className={classes.editBack}>
          <div className={classes.editDiv}>
            <form style={{ textAlign: "center" }} onSubmit={editFormHandler}>
              <span style={{ display: "block" }}>Select Type</span>
              <select id="select1" ref={expTypeRef}>
                <option value="">select type</option>
                <option value="food">Food</option>
                <option value="petrol">Petrol</option>
                <option value="grocery">Grocery</option>
                <option value="rent">Rent</option>
                <option value="electricity">Electricity Bill</option>
              </select>
              <span style={{ display: "block" }}>Money Spent</span>
              <input ref={expMoneyRef} type="number"></input>
              <span style={{ display: "block" }}>Description</span>
              <input ref={expDescRef} type="text" />
              <button className={classes.formBtn} type="submit">
                Save
              </button>
            </form>
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => setShowEdit(false)}
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
