import { useNavigate } from "react-router-dom";
import Logo from "/logo.png";

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <img src={Logo} alt="Logo Image" className="h-14" />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 text-white rounded-lg bg-[#614F7F] hover:bg-[#523F6B]"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 text-white rounded-lg bg-[#614F7F] hover:bg-[#523F6B]"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
