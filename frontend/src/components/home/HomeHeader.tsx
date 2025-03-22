import { useNavigate } from "react-router-dom";
import Logo from "/logo.png";

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <img src={Logo} alt="Logo Image" className="h-14" />
      </div>
      <div>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 text-white rounded-lg hover:bg-blue-700"
          style={{ backgroundColor: "#614F7F" }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
