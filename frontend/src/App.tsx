import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import ForgotPassword from "./components/forget_password/ForgetPassword";
import Signup from "./components/signup/Signup";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget_password" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
