import { useState } from "react";
import {
  FaHome,
  FaShoppingBag,
  FaPlus,
  FaList,
  FaCog,
  FaUser,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../public/logo.png";

const Sidebar = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [shopkeeperOpen, setShopkeeperOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);

  const toggleOrder = () => setOrderOpen(!orderOpen);
  const toggleProduct = () => setProductOpen(!productOpen);
  const toggleShopkeeper = () => setShopkeeperOpen(!shopkeeperOpen);
  const toggleCustomer = () => setCustomerOpen(!customerOpen);
  const toggleStaff = () => setStaffOpen(!staffOpen);

  return (
    <div className="fixed h-screen w-64 bg-gray-50 text-gray-800 flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-semibold border-b border-gray-200 flex items-center justify-center">
        <img src={Logo} alt="logo" className="w-24 h-24" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          <Link to="/dashboard">
            <div className="flex items-center space-x-3 hover:bg-gray-200 p-3 rounded-md cursor-pointer transition-all duration-200">
              <FaHome className="text-[#614F7F]" />
              <span className="text-[#614F7F]">Dashboard</span>
            </div>
          </Link>

          <div>
            <div
              className="flex items-center justify-between hover:bg-gray-200 p-3 rounded-md cursor-pointer transition-all duration-200"
              onClick={toggleOrder}
            >
              <div className="flex items-center space-x-3">
                <FaClipboardList className="text-[#614F7F]" />
                <span className="text-[#614F7F]">Order</span>
              </div>
              <span className="text-[#614F7F]">
                {orderOpen ? (
                  <FaChevronUp className="text-xs text-[#614F7F]" />
                ) : (
                  <FaChevronDown className="text-xs text-[#614F7F]" />
                )}
              </span>
            </div>
            {orderOpen && (
              <div className="pl-6 space-y-2">
                <Link to="/order/list">
                  <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all duration-200">
                    <FaList className="text-[#614F7F]" />
                    <span className="text-[#614F7F]">Order List</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div>
            <div
              className="flex items-center justify-between hover:bg-gray-200 p-3 rounded-md cursor-pointer transition-all duration-200"
              onClick={toggleProduct}
            >
              <div className="flex items-center space-x-3">
                <FaBox className="text-[#614F7F]" />
                <span className="text-[#614F7F]">Product</span>
              </div>
              <span className="text-[#614F7F]">
                {productOpen ? (
                  <FaChevronUp className="text-xs text-[#614F7F]" />
                ) : (
                  <FaChevronDown className="text-xs text-[#614F7F]" />
                )}
              </span>
            </div>
            {productOpen && (
              <div className="pl-6 space-y-2">
                <Link to="/product/add">
                  <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all duration-200">
                    <FaPlus className="text-[#614F7F]" />
                    <span className="text-[#614F7F]">Add Product</span>
                  </div>
                </Link>
                <Link to="/product/list">
                  <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all duration-200">
                    <FaList className="text-[#614F7F]" />
                    <span className="text-[#614F7F]">Product List</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div>
            <div
              className="flex items-center justify-between hover:bg-gray-200 p-3 rounded-md cursor-pointer transition-all duration-200"
              onClick={toggleShopkeeper}
            >
              <div className="flex items-center space-x-3">
                <FaUser className="text-[#614F7F]" />
                <span className="text-[#614F7F]">Shopkeeper</span>
              </div>
              <span className="text-[#614F7F]">
                {shopkeeperOpen ? (
                  <FaChevronUp className="text-xs text-[#614F7F]" />
                ) : (
                  <FaChevronDown className="text-xs text-[#614F7F]" />
                )}
              </span>
            </div>
            {shopkeeperOpen && (
              <div className="pl-6 space-y-2">
                <Link to="/shopkeeper/add">
                  <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all duration-200">
                    <FaPlus className="text-[#614F7F]" />
                    <span className="text-[#614F7F]">Add Shopkeeper</span>
                  </div>
                </Link>
                <Link to="/shopkeeper/list">
                  <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all duration-200">
                    <FaList className="text-[#614F7F]" />
                    <span className="text-[#614F7F]">Shopkeeper List</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div>
            <div
              className="flex items-center justify-between hover:bg-gray-200 p-3 rounded-md cursor-pointer transition-all duration-200"
              onClick={toggleCustomer}
            >
              <div className="flex items-center space-x-3">
                <FaUsers className="text-[#614F7F]" />
                <span className="text-[#614F7F]">Customer</span>
              </div>
              <span className="text-[#614F7F]">
                {customerOpen ? (
                  <FaChevronUp className="text-xs text-[#614F7F]" />
                ) : (
                  <FaChevronDown className="text-xs text-[#614F7F]" />
                )}
              </span>
            </div>
            {customerOpen && (
              <div className="pl-6 space-y-2">
                <Link to="/customer/add">
                  <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all duration-200">
                    <FaPlus className="text-[#614F7F]" />
                    <span className="text-[#614F7F]">Add Customer</span>
                  </div>
                </Link>
                <Link to="/customer/list">
                  <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all duration-200">
                    <FaList className="text-[#614F7F]" />
                    <span className="text-[#614F7F]">Customer List</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div>
            <div
              className="flex items-center justify-between hover:bg-gray-200 p-3 rounded-md cursor-pointer transition-all duration-200"
              onClick={toggleStaff}
            >
              <div className="flex items-center space-x-3">
                <FaShoppingBag className="text-[#614F7F]" />
                <span className="text-[#614F7F]">Staff</span>
              </div>
              <span className="text-[#614F7F]">
                {staffOpen ? (
                  <FaChevronUp className="text-xs text-[#614F7F]" />
                ) : (
                  <FaChevronDown className="text-xs text-[#614F7F]" />
                )}
              </span>
            </div>
            {staffOpen && (
              <div className="pl-6 space-y-2">
                <Link to="/staff/add">
                  <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all duration-200">
                    <FaPlus className="text-[#614F7F]" />
                    <span className="text-[#614F7F]">Add Staff</span>
                  </div>
                </Link>
                <Link to="/staff/list">
                  <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all duration-200">
                    <FaList className="text-[#614F7F]" />
                    <span className="text-[#614F7F]">Staff List</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <Link to="/settings">
          <div className="p-4 hover:bg-gray-200 cursor-pointer transition-all duration-200">
            <div className="flex items-center space-x-3">
              <FaCog className="text-[#614F7F]" />
              <span className="text-[#614F7F]">Settings</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
