import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

interface Customer {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  location: string;
  dob: string;
  customerPhoto: string;
  documentType: string;
  documentFile: string;
}

const ListCustomer: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [customersPerPage] = useState<number>(10);

  useEffect(() => {
    setTimeout(() => {
      const mockCustomers: Customer[] = [
        {
          id: "1",
          firstName: "Alice",
          middleName: "Marie",
          lastName: "Johnson",
          mobileNumber: "+1 (555) 123-4567",
          email: "alice.johnson@example.com",
          location: "New York, NY",
          dob: "1990-05-15",
          customerPhoto: "alice.jpg",
          documentType: "passport",
          documentFile: "alice_passport.jpg",
        },
        {
          id: "2",
          firstName: "Robert",
          middleName: "",
          lastName: "Smith",
          mobileNumber: "+1 (555) 987-6543",
          email: "robert.smith@example.com",
          location: "Los Angeles, CA",
          dob: "1985-10-22",
          customerPhoto: "robert.jpg",
          documentType: "national_id",
          documentFile: "robert_national_id.pdf",
        },
        {
          id: "3",
          firstName: "Emily",
          middleName: "Rose",
          lastName: "Davis",
          mobileNumber: "+1 (555) 456-7890",
          email: "emily.davis@example.com",
          location: "Chicago, IL",
          dob: "1992-07-08",
          customerPhoto: "emily.jpg",
          documentType: "license",
          documentFile: "emily_license.jpg",
        },
        {
          id: "4",
          firstName: "Michael",
          middleName: "James",
          lastName: "Wilson",
          mobileNumber: "+1 (555) 234-5678",
          email: "michael.wilson@example.com",
          location: "Houston, TX",
          dob: "1988-12-14",
          customerPhoto: "michael.jpg",
          documentType: "voter_card",
          documentFile: "michael_voter_card.pdf",
        },
        {
          id: "5",
          firstName: "Sophia",
          middleName: "",
          lastName: "Martinez",
          mobileNumber: "+1 (555) 876-5432",
          email: "sophia.martinez@example.com",
          location: "Miami, FL",
          dob: "1995-03-27",
          customerPhoto: "sophia.jpg",
          documentType: "pan_card",
          documentFile: "sophia_pan_card.jpg",
        },
      ];

      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Search function
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((customer) =>
        [
          customer.firstName,
          customer.middleName,
          customer.lastName,
          customer.email,
          customer.location,
        ].some((field) =>
          field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  // Delete handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const updatedCustomers = customers.filter(
        (customer) => customer.id !== id
      );
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
      alert("Customer deleted successfully");
    }
  };

  // Get full name helper
  const getFullName = (customer: Customer): string => {
    return `${customer.firstName} ${
      customer.middleName ? customer.middleName + " " : ""
    }${customer.lastName}`;
  };

  // Format date helper
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

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
        <h1 className="text-2xl font-semibold text-[#614F7F]">Customers</h1>
        <Link
          to="/customer/add"
          className="px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300"
        >
          Add New Customer
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
            placeholder="Search customers by name, email, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customers table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "S.N",
                "Photo",
                "Name",
                "Contact",
                "Location",
                "Date of Birth",
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
            ) : currentCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  No customers found
                </td>
              </tr>
            ) : (
              currentCustomers.map((customer, index) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {indexOfFirstCustomer + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      {customer.customerPhoto ? (
                        <img
                          src={`/images/${customer.customerPhoto}`}
                          alt={getFullName(customer)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500">
                          {customer.firstName.charAt(0)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getFullName(customer)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{customer.email}</div>
                    <div className="text-sm text-gray-500">
                      {customer.mobileNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(customer.dob)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-3">
                      <Link to={`/customer/view/${customer.id}`} title="View">
                        <FaEye className="text-blue-600 hover:text-blue-800" />
                      </Link>
                      <Link to={`/customer/edit/${customer.id}`} title="Edit">
                        <FaEdit className="text-yellow-600 hover:text-yellow-800" />
                      </Link>
                      <button
                        onClick={() => handleDelete(customer.id)}
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

export default ListCustomer;
