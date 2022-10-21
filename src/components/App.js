import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login";
import ApplicationContext from "./ApplicationContext";

function App() {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);

  const applicationState = {
    login,
    setLogin,
    user,
    setUser,
    products,
    setProducts,
    pageNum,
    setPageNum,
    loading,
    setLoading,
  };
  useEffect(() => {}, [pageNum, products, login, loading]);
  return (
    <ApplicationContext.Provider value={applicationState}>
      <Router>
        <Routes>
          <Route element={<Layout />} path="*" />
          <Route element={<Login />} path="login" />
        </Routes>
      </Router>
    </ApplicationContext.Provider>
  );
}

export default App;
