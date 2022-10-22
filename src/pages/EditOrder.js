import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/editAccount.css";
import ApplicationContext from "../components/ApplicationContext";

function EditOrder() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(ApplicationContext);
  const [city, setCity] = useState(state.user.seller_city);
  const [myState, setState] = useState(state.user.seller_state);

  const { login } = state;

  useEffect(() => {
    document.title = `Update User Page`;
    if (!login) {
      navigate("/login");
    }
  }, [city, myState]);

  const handleAccountUpdate = async (event) => {
    event.preventDefault();
    if (city !== "" && myState !== "") {
      const updatedAccount = {
        city,
        state: myState,
      };
      setCity("");
      setState("");
      console.log(updatedAccount);
      const request = await fetch(`http://localhost:5000/account`, {
        method: "put",
        body: JSON.stringify(updatedAccount),
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();

      if (response) {
        localStorage.setItem("user", JSON.stringify(response));
        await dispatch({ type: "USER", payload: response });
        window.alert("Record updated!");
        navigate("/");
      }
    } else {
      window.alert("Empty field is not allowed");
      return;
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    if (name === "city") {
      setCity(value);
    } else {
      setState(value);
    }
  };
  return (
    <div className="update-acct-container">
      <form onSubmit={handleAccountUpdate} className="acct-info">
        <label className="acct-field">
          <span>City</span>
          <input
            type="text"
            value={city}
            className="update-seller-input"
            onChange={handleChange}
            name="city"
          />
        </label>
        <label className="acct-field">
          <span>State</span>
          <input
            type="text"
            value={myState}
            className="update-seller-input"
            onChange={handleChange}
            name="state"
          />
        </label>
        <button
          type="submit"
          className="update-record-btn"
          onClick={handleAccountUpdate}
        >
          Update record
        </button>
      </form>
    </div>
  );
}

export default EditOrder;
