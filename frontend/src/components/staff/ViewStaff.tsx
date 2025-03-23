import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";

// Define the staff type
interface Staff {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  dob: string;
  staffId: string;
  department: string;
  documentType: string;
  documentNumber: string;
  staffPhoto: string;
  documentFile: string;
}

const ViewStaff: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [staff, setStaff] = useState<Staff | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<string>("staffPhoto");

  useEffect(() => {
    if (id) {
      setIsLoading(true);

      // In a real application, this would be an API call
      // For demonstration, we'll simulate an API response
      setTimeout(() => {
        // Mock staff data
        const mockStaff: Staff = {
          id: id,
          firstName: "Jane",
          middleName: "Marie",
          lastName: "Doe",
          phone: "+1 (555) 987-6543",
          email: "jane.doe@company.com",
          location: "Boston, MA",
          dob: "1990-05-15",
          staffId: "EMP12345",
          department: "Human Resources",
          documentType: "passport",
          documentNumber: "P123456789",
          staffPhoto: "jane_doe.jpg",
          documentFile: "passport_scan.jpg",
        };

        setStaff(mockStaff);
        setIsLoading(false);
      }, 1000);

      // Uncomment for real API implementation
      /*
      axios
        .get(`/api/staff/${id}`)
        .then((response) => {
          setStaff(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching staff data:", error);
          setIsLoading(false);
        });
      */
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">Loading staff details...</p>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-red-500">Staff member not found</p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/staff/list" className="text-[#614F7F] hover:underline">
            Back to Staff List
          </Link>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get full name
  const getFullName = () => {
    return [staff.firstName, staff.middleName, staff.lastName]
      .filter(Boolean)
      .join(" ");
  };

  // Get document type label
  const getDocumentTypeLabel = (type: string) => {
    const documentTypes: { [key: string]: string } = {
      national_id: "National ID",
      citizenship: "Citizenship",
      passport: "Passport",
      pan_card: "PAN Card",
      voter_card: "Voter Card",
      license: "License",
      other: "Other Document",
    };

    return documentTypes[type] || type;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Link
          to="/staff/list"
          className="mr-4 text-gray-500 hover:text-[#614F7F]"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-[#614F7F] flex-grow">
          Staff Details
        </h1>
        <Link
          to={`/staff/edit/${staff.id}`}
          className="px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300 flex items-center"
        >
          <FaEdit className="mr-2" /> Edit Staff
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Staff Images */}
        <div>
          <div className="mb-4 border rounded-lg overflow-hidden h-64">
            <img
              src={
                activeImage === "staffPhoto"
                  ? `/images/${staff.staffPhoto}`
                  : `/images/${staff.documentFile}`
              }
              alt={activeImage === "staffPhoto" ? getFullName() : "Document"}
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
                activeImage === "staffPhoto" ? "border-[#614F7F] border-2" : ""
              }`}
              onClick={() => setActiveImage("staffPhoto")}
            >
              <img
                src={`/images/${staff.staffPhoto}`}
                alt={getFullName()}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/100?text=Staff";
                }}
              />
              <p className="text-xs text-center mt-1 text-gray-500">
                Profile Photo
              </p>
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
                src={`/images/${staff.documentFile}`}
                alt="Document"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/100?text=Document";
                }}
              />
              <p className="text-xs text-center mt-1 text-gray-500">Document</p>
            </div>
          </div>
        </div>

        {/* Staff Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">{getFullName()}</h2>
          <h3 className="text-xl text-[#614F7F] mb-4">{staff.department}</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <FaIdCard className="mt-1 mr-2 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Staff ID</p>
                <p className="font-medium">{staff.staffId}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaBuilding className="mt-1 mr-2 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{staff.department}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaEnvelope className="mt-1 mr-2 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{staff.email}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaPhone className="mt-1 mr-2 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{staff.phone}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-2 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{staff.location}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaCalendarAlt className="mt-1 mr-2 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{formatDate(staff.dob)}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Document Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Document Type</p>
                  <p className="font-medium">
                    {getDocumentTypeLabel(staff.documentType)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Document Number</p>
                  <p className="font-medium">{staff.documentNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStaff;
