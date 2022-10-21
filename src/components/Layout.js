import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pages from "./Pages";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/layoutStyle.css";

export default function Layout() {
  const [login, setLogin] = useState(false);
  const user = {
    login: login,
    setLogin: setLogin,
  };
  return (
    <div className="container">
      <Header />
      <Pages />
      <Footer />
    </div>
  );
}
