import React, { useContext } from "react";
import ApplicationContext from "./ApplicationContext";
import "../styles/pagination.css";

function Pagination() {
  const context = useContext(ApplicationContext);
  const { products, setProducts, pageNum, setPageNum } = context;
  const total = products.length > 0 ? products[0].total : 0;
  const offset = products.length > 0 ? products[0].offset : 0;

  const previous = async (event) => {
    event.preventDefault();
    if (pageNum > 1) {
      setPageNum((prev) => prev - 1);
      const request = await fetch(
        `http://localhost:3000/order_items?pages=${pageNum}`,
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
    } else {
      return;
    }
  };

  const next = async (event) => {
    event.preventDefault();
    if (Number(total) - Number(offset) > 0) {
      setPageNum((prev) => prev + 1);
      const request = await fetch(
        `http://localhost:3000/order_items?pages=${pageNum}`,
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
      console.log(JSON.parse(localStorage.getItem("token")))
      const response = await request.json();
      setProducts(response);
    } else {
      return;
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button className="gl" onClick={previous}>
          &#60;
        </button>
        <span className="page-name">Page&nbsp;{pageNum}</span>
        <button className="gl" onClick={next}>
          &#62;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
