import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/userInputFormStyle.css";
import ApplicationContext from "./ApplicationContext";

function UserInputForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useContext(ApplicationContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (username === "" || password === "") {
        return;
      }
      const userAccountData = {
        username,
        password,
      };
      setPassword("");
      setUsername("");

      const request = await fetch(`http://localhost:5000/login`, {
        method: "post",
        body: JSON.stringify(userAccountData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (response.message === "Unauthorized") {
        const element = document.querySelector(".hidden");
        element.classList.remove("hidden");
      } else {
        const user = {
          id: response.id,
          seller_city: response.seller_city,
          seller_state: response.seller_state,
          seller_id: response.seller_id,
        };
        const token = response.token;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        await dispatch({ type: "LOGIN", payload: true });
        await dispatch({ type: "USER", payload: user });
        localStorage.setItem("login", true);
        navigate("/");
      }
    } catch (error) {
      console.log(`E-UserInputForm-${error.message}`);
    }
  };

  const handleChange = async (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  return (
    <form className="user-form-container" onSubmit={handleSubmit}>
      <div className="user-form">
        <p className="unauth hidden">Invalid login credential</p>
        <h1 className="account-login-message">Login account</h1>
        <div className="form-group">
          <label htmlFor="username">Username or seller's ID</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Seller ID"
            onChange={handleChange}
            value={username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="Password"
            value={password}
          />
        </div>
        <div className="submit-button">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default UserInputForm;
