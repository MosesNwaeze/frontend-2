import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationContext from "../components/ApplicationContext";
import Products from "../components/Products";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import "../styles/mainStyle.css";
import axios from "axios";
import Loading from "../components/Loading";

export default function Index() {
  const context = useContext(ApplicationContext);
  const { products, setProducts } = context;
  const navigate = useNavigate();
  const { login, loading, setLoading } = context;

  useEffect(() => {
    document.title = `Welcome to Aina Anna Products Collections Page`;
    if (!login) {
      navigate("/login");
    }
    const handleProductRequest = async () => {
      const response = await fetch(`http://localhost:3000/order_items`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const fetchProducts = await response.json();
      await setProducts(fetchProducts);
      setLoading(false);
    };
    handleProductRequest();
  }, [login]);

  return (
    <main className="main">
      {loading ? <Loading /> : ""}
      <Filter />
      <Products products={products} />
      <Pagination />
    </main>
  );
}
