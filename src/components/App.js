import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login";
import ApplicationContext from "./ApplicationContext";

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
      const update = initialStates.pageNum + Number(action.payload);
      return { ...initialStates, pageNum: update };
    }
    case "LOADING": {
      return { ...initialStates, loading: action.payload };
    }
    default: {
      return initialStates;
    }
  }
};

function App() {
  const [states, dispatch] = useReducer(reducer, initialStates);

  useEffect(() => {}, [initialStates]);
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
