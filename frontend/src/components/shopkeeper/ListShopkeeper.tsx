import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

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

const ListShopkeeper: React.FC = () => {
  const [shopkeepers, setShopkeepers] = useState<Shopkeeper[]>([]);
  const [filteredShopkeepers, setFilteredShopkeepers] = useState<Shopkeeper[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [shopkeepersPerPage] = useState<number>(10);

  useEffect(() => {
    setTimeout(() => {
      const mockShopkeepers: Shopkeeper[] = [
        {
          id: "1",
          name: "John Smith",
          shopName: "Tech Haven",
          location: "New York, NY",
          email: "john@techhaven.com",
          phone: "+1 (555) 123-4567",
          description: "Premium electronics and gadgets store",
          shopkeeperPhoto: "john.jpg",
          shopPhoto: "techhaven.jpg",
          facebook: "https://facebook.com/techhaven",
          instagram: "https://instagram.com/techhaven",
          twitter: "https://twitter.com/techhaven",
          website: "https://techhaven.com",
        },
        {
          id: "2",
          name: "Sarah Johnson",
          shopName: "Fashion Forward",
          location: "Los Angeles, CA",
          email: "sarah@fashionforward.com",
          phone: "+1 (555) 987-6543",
          description: "Trendy clothing and accessories boutique",
          shopkeeperPhoto: "sarah.jpg",
          shopPhoto: "fashionforward.jpg",
          facebook: "https://facebook.com/fashionforward",
          instagram: "https://instagram.com/fashionforward",
          twitter: "https://twitter.com/fashionforward",
          website: "https://fashionforward.com",
        },
        {
          id: "3",
          name: "Michael Chen",
          shopName: "Green Grocers",
          location: "Seattle, WA",
          email: "michael@greengrocers.com",
          phone: "+1 (555) 456-7890",
          description: "Fresh organic produce and healthy foods",
          shopkeeperPhoto: "michael.jpg",
          shopPhoto: "greengrocers.jpg",
          facebook: "https://facebook.com/greengrocers",
          instagram: "https://instagram.com/greengrocers",
          twitter: "",
          website: "https://greengrocers.com",
        },
        {
          id: "4",
          name: "Emma Wilson",
          shopName: "Book Nook",
          location: "Chicago, IL",
          email: "emma@booknook.com",
          phone: "+1 (555) 234-5678",
          description: "Independent bookstore with rare titles",
          shopkeeperPhoto: "emma.jpg",
          shopPhoto: "booknook.jpg",
          facebook: "https://facebook.com/booknook",
          instagram: "",
          twitter: "https://twitter.com/booknook",
          website: "https://booknook.com",
        },
        {
          id: "5",
          name: "David Rodriguez",
          shopName: "Home Essentials",
          location: "Miami, FL",
          email: "david@homeessentials.com",
          phone: "+1 (555) 876-5432",
          description: "Quality home goods and furniture",
          shopkeeperPhoto: "david.jpg",
          shopPhoto: "homeessentials.jpg",
          facebook: "https://facebook.com/homeessentials",
          instagram: "https://instagram.com/homeessentials",
          twitter: "https://twitter.com/homeessentials",
          website: "https://homeessentials.com",
        },
      ];

      setShopkeepers(mockShopkeepers);
      setFilteredShopkeepers(mockShopkeepers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Search function
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredShopkeepers(shopkeepers);
    } else {
      const filtered = shopkeepers.filter((shopkeeper) =>
        [shopkeeper.name, shopkeeper.shopName, shopkeeper.location].some(
          (field) => field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredShopkeepers(filtered);
    }
  }, [searchTerm, shopkeepers]);

  // Delete handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this shopkeeper?")) {
      const updatedShopkeepers = shopkeepers.filter(
        (shopkeeper) => shopkeeper.id !== id
      );
      setShopkeepers(updatedShopkeepers);
      setFilteredShopkeepers(updatedShopkeepers);
      alert("Shopkeeper deleted successfully");
    }
  };


    // Pagination logic
    const indexOfLastShopkeeper = currentPage * shopkeepersPerPage;
    const indexOfFirstShopkeeper = indexOfLastShopkeeper - shopkeepersPerPage;
    const currentShopkeepers = filteredShopkeepers.slice(
      indexOfFirstShopkeeper,
      indexOfLastShopkeeper
    );
  
    const totalPages = Math.ceil(filteredShopkeepers.length / shopkeepersPerPage);
  
    const paginateNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const paginatePrev = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#614F7F]">Shopkeepers</h1>
        <Link
          to="/shopkeeper/add"
          className="px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300"
        >
          Add New Shopkeeper
        </Link>
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            placeholder="Search shopkeepers by name, shop name, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Shopkeepers table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "S.N",
                "Photo",
                "Name",
                "Shop Name",
                "Location",
                "Contact",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : currentShopkeepers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  No shopkeepers found
                </td>
              </tr>
            ) : (
              currentShopkeepers.map((shopkeeper, index) => (
                <tr key={shopkeeper.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      {shopkeeper.shopkeeperPhoto ? (
                        <img
                          src={`/images/${shopkeeper.shopkeeperPhoto}`}
                          alt={shopkeeper.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500">
                          {shopkeeper.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shopkeeper.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shopkeeper.shopName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shopkeeper.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{shopkeeper.email}</div>
                    <div className="text-sm text-gray-500">
                      {shopkeeper.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-3">
                      <Link
                        to={`/shopkeeper/view/${shopkeeper.id}`}
                        title="View"
                      >
                        <FaEye className="text-blue-600 hover:text-blue-800" />
                      </Link>
                      <Link
                        to={`/shopkeeper/edit/${shopkeeper.id}`}
                        title="Edit"
                      >
                        <FaEdit className="text-yellow-600 hover:text-yellow-800" />
                      </Link>
                      <button
                        onClick={() => handleDelete(shopkeeper.id)}
                        title="Delete"
                      >
                        <FaTrash className="text-red-600 hover:text-red-800" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={paginatePrev}
                disabled={currentPage === 1}
                className={`px-3 py-2 mx-2 leading-tight ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                } rounded-md`}
              >
                Previous
              </button>
            </li>
            <li>
              <button
                className={`px-3 py-2 mx-2 leading-tight bg-[#614F7F] text-white rounded-md`}
              >
                {currentPage}
              </button>
            </li>

            <li>
              <button
                onClick={paginateNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 mx-2 leading-tight ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                } rounded-md`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ListShopkeeper;
