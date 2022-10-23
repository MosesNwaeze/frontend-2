import React, { useContext, useEffect, useState } from "react";
import ApplicationContext from "./ApplicationContext";
import "../styles/pagination.css";
import Loading from "./Loading";

function Pagination() {
  const [state, dispatch] = useContext(ApplicationContext);
  const { products, pageNum, loading } = state;

  const total = products.length > 0 ? products[0].total : 0;
  const offset = products.length > 0 ? products[0].offset : 0;

  const previous = async (event) => {
    event.preventDefault();
    if (pageNum > 1) {
      const _pageNum = Number(pageNum) - 1;
      await dispatch({ type: "PAGE_NUM", payload: _pageNum });
      await dispatch({ type: "LOADING", payload: true });
      const request = await fetch(
        `http://localhost:5000/order_items?pages=${Number(pageNum)}&prev=1`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            "Content-Type": "application/json",
          },
        }
      );
      const response = await request.json();
      await dispatch({ type: "PRODUCTS", payload: response });
      await dispatch({ type: "LOADING", payload: false });
    } else {
      return;
    }
  };

  const next = async (event) => {
    event.preventDefault();
    const id = Number(event.target.id) + 1
    if (Number(total) - Number(offset) > 0) {
      await dispatch({ type: "LOADING", payload: true });
      await dispatch({ type: "PAGE_NUM", payload: id });
      const request = await fetch(
        `http://localhost:5000/order_items?pages=${id}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            "Content-Type": "application/json",
          },
        }
      );
      const response = await request.json();
      await dispatch({ type: "PRODUCTS", payload: response });
      await dispatch({ type: "LOADING", payload: false });
    } else {
      return;
    }
  };

  return (
    <div className="pagination-container">
      {loading ? <Loading /> : ""}
      <div className="pagination">
        <button className="gl" onClick={previous}>
          &#60;
        </button>
        <span className="page-name">Page&nbsp;{pageNum}</span>
        <button className="gl" onClick={next} id={pageNum}>
          &#62;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
