import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import ForgotPassword from "./components/forget_password/ForgetPassword";
import Signup from "./components/signup/Signup";
import AdminLayout from "./adminMain";
import Dashboard from "./components/dashboard/Dashboard";
import AddOrder from "./components/order/AddOrder";
import ViewOrder from "./components/order/ViewOrder";
import ListOrder from "./components/order/ListOrder";
import AddProduct from "./components/product/AddProduct";
import ViewProduct from "./components/product/ViewProduct";
import ListProduct from "./components/product/ListProduct";
import AddShopkeeper from "./components/shopkeeper/AddShopkeeper";
import ViewShopkeeper from "./components/shopkeeper/ViewShopkeeper";
import ListShopkeeper from "./components/shopkeeper/ListShopkeeper";
import AddCustomer from "./components/customer/AddCustomer";
import ViewCustomer from "./components/customer/ViewCustomer";
import ListCustomer from "./components/customer/ListCustomer";
import AddStaff from "./components/staff/AddStaff";
import ViewStaff from "./components/staff/ViewStaff";
import ListStaff from "./components/staff/ListStaff";

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
        path="/order/add"
        element={
          <AdminLayout>
            <AddOrder />
          </AdminLayout>
        }
      />
      <Route
        path="/order/view/:id"
        element={
          <AdminLayout>
            <ViewOrder />
          </AdminLayout>
        }
      />
      <Route
        path="/order/edit/:id"
        element={
          <AdminLayout>
            <AddOrder />
          </AdminLayout>
        }
      />
      <Route
        path="/order/list"
        element={
          <AdminLayout>
            <ListOrder />
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
            <ViewShopkeeper />
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

      <Route
        path="/customer/add"
        element={
          <AdminLayout>
            <AddCustomer />
          </AdminLayout>
        }
      />
      <Route
        path="/customer/view/:id"
        element={
          <AdminLayout>
            <ViewCustomer />
          </AdminLayout>
        }
      />
      <Route
        path="/customer/edit/:id"
        element={
          <AdminLayout>
            <AddCustomer />
          </AdminLayout>
        }
      />
      <Route
        path="/customer/list"
        element={
          <AdminLayout>
            <ListCustomer />
          </AdminLayout>
        }
      />

      <Route
        path="/staff/add"
        element={
          <AdminLayout>
            <AddStaff />
          </AdminLayout>
        }
      />
      <Route
        path="/staff/view/:id"
        element={
          <AdminLayout>
            <ViewStaff />
          </AdminLayout>
        }
      />
      <Route
        path="/staff/edit/:id"
        element={
          <AdminLayout>
            <AddStaff />
          </AdminLayout>
        }
      />
      <Route
        path="/staff/list"
        element={
          <AdminLayout>
            <ListStaff />
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default App;
