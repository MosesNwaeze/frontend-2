import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login";
import ApplicationContext from "./ApplicationContext";

function App() {
  const initialStates = {
    login: false,
    user: {},
    products: [],
    pageNum: 1,
    loading: true,
  };
  const reducer = (initialStates, action) => {
    switch (action.type) {
      case "LOGIN": {
        return { ...initialStates, login: action.payload };
      }
      case "USER": {
        return { ...initialStates, user: action.payload };
      }
      case "PRODUCTS": {
        return { ...initialStates, products: action.payload };
      }
      case "PAGE_NUM": {
        return { ...initialStates, pageNum: action.payload };
      }
      case "LOADING": {
        return { ...initialStates, loading: action.payload };
      }
      default: {
        return initialStates;
      }
    }
  };
  const [states, dispatch] = useReducer(reducer, initialStates);
  useEffect(() => {}, [
    initialStates.products,
    initialStates.pageNum,
    initialStates.loading,
    initialStates.user,
    initialStates.login,
  ]);
  return (
    <ApplicationContext.Provider value={[states, dispatch]}>
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
