import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/headerStyle.css";
import { Link } from "react-router-dom";

import ApplicationContext from "./ApplicationContext";
import logo from "../components/logoipsum-287.svg";

function Header() {
  const [state, dispatch] = useContext(ApplicationContext);
  const navigate = useNavigate();
  const login = state.login;

  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, []);

  const user = login ? JSON.parse(localStorage.getItem("user")) : "";

  const handleLogout = async (event) => {
    event.preventDefault();
    const confirmation = window.confirm("Do you mean to logout?");
    if (confirmation) {
      localStorage.clear();
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      await dispatch({ type: "LOGIN", payload: false });
      await dispatch({ type: "USER", payload: {} });
      await dispatch({ type: "PRODUCTS", payload: [] });
      await dispatch({ type: "PAGE_NUM", payload: 1 });
      await dispatch({ type: "LOADING", payload: true });
      navigate("/login");
    }
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="login">
        {login ? (
          <div className="user-info">
            <div className="welcome-msg">
              Welcome&nbsp;
              <span className="user-id">{user.id}</span>
              <Link to="/edit-account">
                <span className="welcome-user">Edit Account</span>
              </Link>
            </div>
            <Link to="/logout" onClick={handleLogout}>
              <span className="logout">Logout</span>
            </Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
