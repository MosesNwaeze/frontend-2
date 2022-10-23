import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationContext from "../components/ApplicationContext";
import Products from "../components/Products";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import "../styles/mainStyle.css";
import Loading from "../components/Loading";

export default function Index() {
  const [state, dispatch] = useContext(ApplicationContext);
  const navigate = useNavigate();
  const { login, loading,pageNum } = state;

  useEffect(() => {
    document.title = `Welcome to Aina Anna Products Collections Page`;
    if (!login) {
      navigate("/login");
    }
    const handleProductRequest = async () => {
      const response = await fetch(`http://localhost:5000/order_items?pages=${pageNum}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const fetchProducts = await response.json();
      await dispatch({ type: "PRODUCTS", payload: fetchProducts });
      await dispatch({ type: "LOADING", payload: false });
    };
    handleProductRequest();
  }, []);

  return (
    <main className="main">
      {loading ? <Loading /> : ""}
      <Filter />
      <Products />
      <Pagination />
    </main>
  );
}
