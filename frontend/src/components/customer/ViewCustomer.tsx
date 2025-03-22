import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Define the customer type
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

const ViewCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<string>("customerPhoto");

  useEffect(() => {
    // In a real application, you would fetch the customer from an API
    // For demo purposes, we'll use a mock customer
    setIsLoading(true);

    setTimeout(() => {
      // Mock customer data - using the same structure as in ListCustomer
      const mockCustomer: Customer = {
        id: id || "1",
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
      };

      setCustomer(mockCustomer);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const getFullName = (customer: Customer): string => {
    return `${customer.firstName} ${
      customer.middleName ? customer.middleName + " " : ""
    }${customer.lastName}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getDocumentTypeDisplay = (docType: string): string => {
    const documentTypes: { [key: string]: string } = {
      passport: "Passport",
      national_id: "National ID",
      license: "Driver's License",
      voter_card: "Voter ID Card",
      pan_card: "PAN Card",
      other: "Other",
    };

    return documentTypes[docType] || docType;
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-red-500">Customer not found</p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/customer/list" className="text-[#614F7F] hover:underline">
            Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Link
          to="/customer/list"
          className="mr-4 text-gray-500 hover:text-[#614F7F]"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-[#614F7F] flex-grow">
          Customer Details
        </h1>
        <Link
          to={`/customer/edit/${customer.id}`}
          className="px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300 flex items-center"
        >
          <FaEdit className="mr-2" /> Edit Customer
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Images */}
        <div>
          <div className="mb-4 border rounded-lg overflow-hidden h-64">
            <img
              src={
                activeImage === "customerPhoto"
                  ? `/images/${customer.customerPhoto}`
                  : `/images/${customer.documentFile}`
              }
              alt={
                activeImage === "customerPhoto"
                  ? getFullName(customer)
                  : `${getFullName(customer)}'s ${customer.documentType}`
              }
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x300?text=Image+Not+Found";
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div
              className={`border rounded-lg overflow-hidden h-20 cursor-pointer ${
                activeImage === "customerPhoto"
                  ? "border-[#614F7F] border-2"
                  : ""
              }`}
              onClick={() => setActiveImage("customerPhoto")}
            >
              <img
                src={`/images/${customer.customerPhoto}`}
                alt={getFullName(customer)}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/100?text=Customer";
                }}
              />
              <div className="bg-gray-100 p-1 text-xs text-center">
                Profile Photo
              </div>
            </div>
            <div
              className={`border rounded-lg overflow-hidden h-20 cursor-pointer ${
                activeImage === "documentFile"
                  ? "border-[#614F7F] border-2"
                  : ""
              }`}
              onClick={() => setActiveImage("documentFile")}
            >
              <img
                src={`/images/${customer.documentFile}`}
                alt={`${customer.documentType}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/100?text=Document";
                }}
              />
              <div className="bg-gray-100 p-1 text-xs text-center">
                {getDocumentTypeDisplay(customer.documentType)}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {getFullName(customer)}
          </h2>
          <div className="text-sm inline-block bg-[#614F7F] text-white px-2 py-1 rounded mb-4">
            {getDocumentTypeDisplay(customer.documentType)}
          </div>

          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FaPhone className="text-[#614F7F]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="font-medium">{customer.mobileNumber}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FaEnvelope className="text-[#614F7F]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{customer.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FaMapMarkerAlt className="text-[#614F7F]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{customer.location}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FaCalendarAlt className="text-[#614F7F]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{formatDate(customer.dob)}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FaIdCard className="text-[#614F7F]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ID Information</p>
                <p className="font-medium">
                  {getDocumentTypeDisplay(customer.documentType)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
