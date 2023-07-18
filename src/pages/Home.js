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
    const res = await axios.get(
      `https://expensetracker-e45bb-default-rtdb.firebaseio.com/expenses/${useridd}.json`,
      {}
    );
    console.log(res.data);

    if (res.data) {
      let arr = Object.keys(res.data);
      var newvar = [];
      for (let i = 0; i < arr.length; i++) {
        newvar.push([res.data[arr[i]]]);
      }
      console.log(newvar);
    }
  };
  useEffect(() => {
    getDataFromBackend();
  }, []);

  const formHandler = (e) => {
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
  };
  const [itemIdEdit, setItemIdEdit] = useState();
  function showHandler(itemId) {
    setShowEdit(true);
    setItemIdEdit(itemId);
  }
  async function editFormHandler(e) {
    e.preventDefault(e);
    console.log("saveeditformcalled");
    const res = await axios.put(
      `https://expensetracker-e45bb-default-rtdb.firebaseio.com/expenses/${useridd}/${itemIdEdit}.json`,
      {
        description: expDescRef.current.value,
        money: parseInt(expMoneyRef.current.value),
        type: expTypeRef.current.value,
        userId: useridd,
        itemId: itemIdEdit,
      }
    );
    setShowEdit(false);
  }

  return (
    <>
      <div className={classes.Header}>
        <h2 className={classes.Icon}>EXPENSE TRACKER</h2>
        <h3 style={{ color: "black" }}>
          complete your profile
          <Link style={{ color: "red" }} to="/updateProfile">
            _now!
          </Link>
          <Layout />
        </h3>
      </div>
      <div className={classes.mainCont}>
        <div style={{ width: "400px" }}>
          <PieChart />
        </div>
        <div>
          <form className={classes.form} onSubmit={formHandler}>
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
        </div>
      </div>
      <div>
        {ExpItems.items.map((v, i) => {
          return (
            <ListItems key={v.itemId} item={v} showHandler={showHandler} />
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
