import { useState, FormEvent } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "/logo.png";
import axiosInstance from "../../plugin/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      const cookieOptions = {
        expires: rememberMe ? 7 : 1,
        secure: import.meta.env.MODE === "production",
        sameSite: "strict" as const,
      };

      Cookies.set("management_system_token", token, cookieOptions);

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Login successful!");

      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={Logo} alt="Logo" className="w-20 h-20 rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-[#614F7F]">Welcome Back!</h2>
          <p className="text-gray-600 text-sm mt-2">
            The faster you fill up, the faster you get access.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#614F7F] font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-[#614F7F] font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#614F7F] rounded border-gray-300 focus:ring-[#614F7F]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a
              href="/forget-password"
              className="text-sm text-[#614F7F] hover:underline"
            >
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#614F7F] text-white py-2 rounded-lg transition shadow-md ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#523F6B]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#614F7F] hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
