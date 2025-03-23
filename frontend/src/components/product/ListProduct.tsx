import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  brand: string;
  sku: string;
  description: string;
  images: string[];
}

const ListProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);

  useEffect(() => {
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: "1",
          name: "Smartphone X",
          type: "Electronics",
          price: 999.99,
          discountPrice: 899.99,
          stock: 50,
          brand: "TechBrand",
          sku: "TECH-SP-001",
          description: "Latest smartphone with advanced features",
          images: ["image1.jpg", "image2.jpg"],
        },
        {
          id: "2",
          name: "Office Chair",
          type: "Furniture",
          price: 199.99,
          discountPrice: null,
          stock: 25,
          brand: "ComfortPlus",
          sku: "FURN-CH-002",
          description: "Ergonomic office chair with lumbar support",
          images: ["chair1.jpg"],
        },
        {
          id: "3",
          name: "Wireless Headphones",
          type: "Electronics",
          price: 149.99,
          discountPrice: 129.99,
          stock: 100,
          brand: "AudioMax",
          sku: "TECH-HP-003",
          description: "Noise cancelling wireless headphones",
          images: ["headphones1.jpg", "headphones2.jpg"],
        },
        {
          id: "4",
          name: "Coffee Table",
          type: "Furniture",
          price: 249.99,
          discountPrice: 199.99,
          stock: 15,
          brand: "HomeStyle",
          sku: "FURN-TB-004",
          description: "Modern coffee table with storage",
          images: ["table1.jpg"],
        },
        {
          id: "5",
          name: "Smart Watch",
          type: "Electronics",
          price: 299.99,
          discountPrice: 279.99,
          stock: 75,
          brand: "TechBrand",
          sku: "TECH-WT-005",
          description: "Smart watch with health monitoring",
          images: ["watch1.jpg", "watch2.jpg"],
        },
      ];

      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Search function
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        [product.name, product.type, product.brand].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Delete handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      alert("Product deleted successfully");
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
        <h1 className="text-2xl font-semibold text-[#614F7F]">Products</h1>
        <Link
          to="/product/add"
          className="px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300"
        >
          Add New Product
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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "S.N",
                "Name",
                "Type",
                "Price",
                "Stock",
                "Brand",
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
            ) : currentProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  No products found
                </td>
              </tr>
            ) : (
              currentProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {indexOfFirstProduct + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${product.price.toFixed(2)}
                    {product.discountPrice && (
                      <div className="text-sm text-green-600">
                        ${product.discountPrice.toFixed(2)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-3">
                      <Link to={`/product/view/${product.id}`} title="View">
                        <FaEye className="text-blue-600 hover:text-blue-800" />
                      </Link>
                      <Link to={`/product/edit/${product.id}`} title="Edit">
                        <FaEdit className="text-yellow-600 hover:text-yellow-800" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
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

export default ListProduct;
