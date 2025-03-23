import { useState, useEffect } from "react";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";
import Management from "../../svg/Management";

const Home = () => {
  const fullText =
    "Streamline your workflow, enhance productivity, and manage your operations efficiently with our intuitive management system.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 50); // Adjust speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HomeHeader />
      <div className="flex flex-row items-center justify-center bg-gray-100 text-gray-900 px-6 py-8">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "#614F7F" }}>
            Welcome to Management System
          </h1>
          <p className="text-lg text-gray-700 min-h-[80px]">{displayedText}</p>
        </div>
        <div className="ml-22">
          <Management />
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default Home;
