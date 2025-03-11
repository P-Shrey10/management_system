import { useState } from "react";
import Logo from "../../../public/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Full Name:", fullName);
    console.log("Email:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Logo and Forgot Password Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={Logo} alt="Logo" className="w-20 h-20 rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-[#614F7F]">Forgot Password?</h2>
          <p className="text-gray-600 text-sm mt-2">
            Enter your full name and email to get your new password in your mail.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-4">
            <label className="block text-[#614F7F] font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-[#614F7F] font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full bg-[#614F7F] text-white py-2 rounded-lg hover:bg-[#523F6B] transition shadow-md"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
