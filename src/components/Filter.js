import React, { useState, useContext } from "react";
import "../styles/filter.css";
import ApplicationContext from "./ApplicationContext";

function Filter() {
  const [display, setDisplay] = useState("");
  const context = useContext(ApplicationContext);
  const { pageNum, setProducts } = context;

  const handleSort = async (event) => {
    event.preventDefault();
    setDisplay("sort");
  };

  const handleLimit = async (event) => {
    event.preventDefault();
    setDisplay("limit");
  };

  const handleSortSelect = async (event) => {
    event.preventDefault();
    const request = await fetch(
      `http://localhost:3000/order_items?pages=${pageNum}&sorting=${event.target.value}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token"))
          }`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.json();
    await setProducts(response);
  };

  const handleLimitSelect = async (event) => {
    event.preventDefault();
    const request = await fetch(
      `http://localhost:3000/order_items?pages=${pageNum}&limit=${event.target.value}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token"))
          }`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.json();
    setProducts(response);
  };
  return (
    <div className="filter-container">
      <div className="filter">
        Filter:{" "}
        <button onClick={handleSort} className="filter-btn">
          Sort
        </button>{" "}
        |{" "}
        <button onClick={handleLimit} className="filter-btn">
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
