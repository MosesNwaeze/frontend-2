import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApplicationContext from "../components/ApplicationContext";
import "../styles/itemPage.css";

function Item() {
  const [state,dispatch] = useContext(ApplicationContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    state: { data, from },
  } = location;
  useEffect(() => {
    document.title = `Product item page`;
    //const login = localStorage.getItem("login");
    if (!state.login) {
      navigate("/login");
    }
  });

  const handleClick = async (event) => {
    event.preventDefault();
    const confirm = window.confirm("Confirm delete request?");
    if (confirm) {
      const request = await fetch(
        `http://localhost:5000/order_items/${data.id}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token"))
            }`,
          },
        }
      );
      const response = await request.json();
      if (response.message === "deleted successfully") {
        window.alert("Operation was successfull");
        navigate(from);
      }
    }
  };
  return (
    <div className="item-container">
      <div className="item-image">
        <img src="http://via.placeholder.com/150" alt="product" />
      </div>
      <div className="item-info">
        <ul className="item-info-list">
          <li>Order ID: {data.id}</li>
          <li>Date: {data.date}</li>
          <li>Price: {data.price}</li>
          <li>Product category: {data.product_category}</li>
          <li>Product ID: {data.product_id}</li>
        </ul>
      </div>
      <div className="delete-item">
        <button type="button" className="delete-item-btn" onClick={handleClick}>
          Delete Order
        </button>
      </div>
    </div>
  );
}

export default Item;
