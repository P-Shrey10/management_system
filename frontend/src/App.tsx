import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import ForgotPassword from "./components/forget_password/ForgetPassword";
import Signup from "./components/signup/Signup";
import AdminLayout from "./adminMain";
import Dashboard from "./components/dashboard/Dashboard";
import AddProduct from "./components/product/AddProduct";
import ViewProduct from "./components/product/ViewProduct";
import ListProduct from "./components/product/ListProduct";
import AddShopkeeper from "./components/shopkeeper/AddShopkeeper";
import ViewShopkeeper from "./components/shopkeeper/ViewShopkeeper";
import ListShopkeeper from "./components/shopkeeper/ListShopkeeper";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget_password" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/product/add"
        element={
          <AdminLayout>
            <AddProduct />
          </AdminLayout>
        }
      />
      <Route
        path="/product/view/:id"
        element={
          <AdminLayout>
            <ViewProduct />
          </AdminLayout>
        }
      />
      <Route
        path="/product/edit/:id"
        element={
          <AdminLayout>
            <AddProduct />
          </AdminLayout>
        }
      />
      <Route
        path="/product/list"
        element={
          <AdminLayout>
            <ListProduct />
          </AdminLayout>
        }
      />
      <Route
        path="/shopkeeper/add"
        element={
          <AdminLayout>
            <AddShopkeeper />
          </AdminLayout>
        }
      />
      <Route
        path="/shopkeeper/view/:id"
        element={
          <AdminLayout>
            <ViewShopkeeper/>
          </AdminLayout>
        }
      />
      <Route
        path="/shopkeeper/edit/:id"
        element={
          <AdminLayout>
            <AddShopkeeper />
          </AdminLayout>
        }
      />
      <Route
        path="/shopkeeper/list"
        element={
          <AdminLayout>
            <ListShopkeeper />
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default App;
