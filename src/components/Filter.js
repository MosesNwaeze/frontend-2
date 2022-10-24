import React, { useState, useContext } from "react";
import "../styles/filter.css";
import ApplicationContext from "./ApplicationContext";

function Filter() {
  const [display, setDisplay] = useState("");
  const [state, dispatch] = useContext(ApplicationContext);

  const handleSort = async (event) => {
    event.preventDefault();
    setDisplay("sort");
    event.target.classList.add("focused");
    document.querySelector(`.limit`).classList.remove("focused");
  };

  const handleLimit = async (event) => {
    event.preventDefault();
    setDisplay("limit");
    event.target.classList.add("focused");
    document.querySelector(`.sort`).classList.remove("focused");
  };

  const handleSortSelect = async (event) => {
    event.preventDefault();
    await dispatch({ type: "LOADING", payload: true });
    await dispatch({ type: "SORTING", payload: event.target.value });
    const request = await fetch(
      `http://localhost:5000/order_items?pages=${state.pageNum}&sorting=${event.target.value}&limit=${state.limit}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.json();
    await dispatch({ type: "PRODUCTS", payload: response });
    await dispatch({ type: "LOADING", payload: false });
    event.target.value = "--No sort option--";
  };

  const handleLimitSelect = async (event) => {
    event.preventDefault();
    await dispatch({ type: "LOADING", payload: true });
    await dispatch({ type: "LIMIT", payload: event.target.value });
    const request = await fetch(
      `http://localhost:5000/order_items?pages=${state.pageNum}&limit=${event.target.value}&sorting=${state.sorting}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.json();
    await dispatch({ type: "PRODUCTS", payload: response });
    await dispatch({ type: "LOADING", payload: false });
    event.target.value = "--No limit option--";
  };
  return (
    <div className="filter-container">
      <div className="filter">
        Filter:{" "}
        <button onClick={handleSort} className="filter-btn sort">
          Sort
        </button>{" "}
        |{" "}
        <button onClick={handleLimit} className="filter-btn limit">
          Limit
        </button>
        {display === "sort" ? (
          <select onChange={handleSortSelect} className="select">
            <option>--No sort option--</option>
            <option value="price">Price</option>
            <option value="shipping_limit_date">Shipping Date</option>
          </select>
        ) : display === "limit" ? (
          <select onChange={handleLimitSelect} className="select">
            <option>--No limit option--</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="80">80</option>
            <option value="100">100</option>
          </select>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Filter;
