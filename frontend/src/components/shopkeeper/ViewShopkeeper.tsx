import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaFacebook, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";

// Define the shopkeeper type
interface Shopkeeper {
  id: string;
  name: string;
  shopName: string;
  location: string;
  email: string;
  phone: string;
  description: string;
  shopkeeperPhoto: string;
  shopPhoto: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
}

const ViewShopkeeper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shopkeeper, setShopkeeper] = useState<Shopkeeper | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<string>("shopkeeperPhoto");

  useEffect(() => {
    // In a real application, you would fetch the shopkeeper from an API
    // For demo purposes, we'll use a mock shopkeeper
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock shopkeeper data
      const mockShopkeeper: Shopkeeper = {
        id: id || "1",
        name: "John Smith",
        shopName: "Tech Haven",
        location: "New York, NY",
        email: "john@techhaven.com",
        phone: "+1 (555) 123-4567",
        description: "Premium electronics and gadgets store with a wide range of latest technology products. Offering exceptional customer service and technical support for all your technology needs. Established in 2010, Tech Haven has become the go-to destination for tech enthusiasts in New York City.",
        shopkeeperPhoto: "john.jpg",
        shopPhoto: "techhaven.jpg",
        facebook: "https://facebook.com/techhaven",
        instagram: "https://instagram.com/techhaven",
        twitter: "https://twitter.com/techhaven",
        website: "https://techhaven.com"
      };
      
      setShopkeeper(mockShopkeeper);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">Loading shopkeeper details...</p>
        </div>
      </div>
    );
  }

  if (!shopkeeper) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-red-500">Shopkeeper not found</p>
        </div>
        <div className="mt-4 text-center">
          <Link 
            to="/shopkeeper/list" 
            className="text-[#614F7F] hover:underline"
          >
            Back to Shopkeepers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Link 
          to="/shopkeeper/list" 
          className="mr-4 text-gray-500 hover:text-[#614F7F]"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-[#614F7F] flex-grow">
          Shopkeeper Details
        </h1>
        <Link 
          to={`/shopkeeper/edit/${shopkeeper.id}`}
          className="px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300 flex items-center"
        >
          <FaEdit className="mr-2" /> Edit Shopkeeper
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shopkeeper Images */}
        <div>
          <div className="mb-4 border rounded-lg overflow-hidden h-64">
            <img 
              src={activeImage === "shopkeeperPhoto" ? `/images/${shopkeeper.shopkeeperPhoto}` : `/images/${shopkeeper.shopPhoto}`} 
              alt={activeImage === "shopkeeperPhoto" ? shopkeeper.name : shopkeeper.shopName} 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
              }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div 
              className={`border rounded-lg overflow-hidden h-20 cursor-pointer ${activeImage === "shopkeeperPhoto" ? 'border-[#614F7F] border-2' : ''}`}
              onClick={() => setActiveImage("shopkeeperPhoto")}
            >
              <img 
                src={`/images/${shopkeeper.shopkeeperPhoto}`} 
                alt={shopkeeper.name} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/100?text=Shopkeeper";
                }}
              />
            </div>
            <div 
              className={`border rounded-lg overflow-hidden h-20 cursor-pointer ${activeImage === "shopPhoto" ? 'border-[#614F7F] border-2' : ''}`}
              onClick={() => setActiveImage("shopPhoto")}
            >
              <img 
                src={`/images/${shopkeeper.shopPhoto}`} 
                alt={shopkeeper.shopName} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/100?text=Shop";
                }}
              />
            </div>
          </div>
        </div>

        {/* Shopkeeper Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">{shopkeeper.name}</h2>
          <h3 className="text-xl text-[#614F7F] mb-4">{shopkeeper.shopName}</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{shopkeeper.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{shopkeeper.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{shopkeeper.phone}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Shop Description</h3>
            <p className="text-gray-700">{shopkeeper.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Social Media & Contact</h3>
            <div className="flex space-x-4">
              {shopkeeper.facebook && (
                <a 
                  href={shopkeeper.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaFacebook size={24} />
                </a>
              )}
              {shopkeeper.instagram && (
                <a 
                  href={shopkeeper.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800"
                >
                  <FaInstagram size={24} />
                </a>
              )}
              {shopkeeper.twitter && (
                <a 
                  href={shopkeeper.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <FaTwitter size={24} />
                </a>
              )}
              {shopkeeper.website && (
                <a 
                  href={shopkeeper.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaGlobe size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewShopkeeper;