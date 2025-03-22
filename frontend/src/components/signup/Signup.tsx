import { useState, FormEvent } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "/logo.png";
import axiosInstance from "../../plugin/axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !location ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please make sure all fields are filled out.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        phone,
        location,
        gender,
        password,
      });

      toast.success("Signup successful!");
      clearForm();
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Signup failed:", error);
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setGender("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
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

        <form onSubmit={handleSignup}>
          <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[#614F7F] font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
          />
        </div>

        <div>
          <label className="block text-[#614F7F] font-medium mb-2">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <label className="block text-[#614F7F] font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F] pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#614F7F]"
            style={{ top: "32px" }}
          >
            {showPassword ? (
          <AiFillEyeInvisible size={20} />
            ) : (
          <AiFillEye size={20} />
            )}
          </button>
        </div>

        <div className="relative">
          <label className="block text-[#614F7F] font-medium mb-2">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F] pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#614F7F]"
            style={{ top: "32px" }}
          >
            {showConfirmPassword ? (
          <AiFillEyeInvisible size={20} />
            ) : (
          <AiFillEye size={20} />
            )}
          </button>
        </div>
          </div>

          <button
        type="submit"
        disabled={loading}
        className={`w-full bg-[#614F7F] text-white py-2 rounded-lg transition shadow-md ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#523F6B]"
        }`}
          >
        {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
