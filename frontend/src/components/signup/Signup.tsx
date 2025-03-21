import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "/logo.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={Logo} alt="Logo" className="w-20 h-20 rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-[#614F7F]">
            Create an Account!
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Join us today by filling out the form below.
          </p>
        </div>

        <form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[#614F7F] font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              />
            </div>
            <div>
              <label className="block text-[#614F7F] font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[#614F7F] font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              />
            </div>

            <div>
              <label className="block text-[#614F7F] font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[#614F7F] font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Location"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              />
            </div>

            <div>
              <label className="block text-[#614F7F] font-medium mb-2">
                Gender
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-4 relative">
              <label className="block text-[#614F7F] font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#614F7F]"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6 relative">
              <label className="block text-[#614F7F] font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#614F7F]"
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#614F7F] text-white py-2 rounded-lg hover:bg-[#523F6B] transition shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
