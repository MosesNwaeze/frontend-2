import React, { useEffect } from "react";
import UserInputForm from "../components/UserInputForm";

function Login() {
  useEffect(() => {
    document.title = `Login page`;
  });
  return (
    <div>
      <UserInputForm />
    </div>
  );
}

export default Login;
