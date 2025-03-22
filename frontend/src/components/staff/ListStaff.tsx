import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

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

const ListStaff: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
  const [filteredStaffMembers, setFilteredStaffMembers] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [staffPerPage] = useState<number>(10);

  useEffect(() => {
    setTimeout(() => {
      const mockStaffMembers: Staff[] = [
        {
          id: "1",
          firstName: "John",
          middleName: "",
          lastName: "Doe",
          phone: "+1 (555) 123-4567",
          email: "john.doe@example.com",
          location: "New York, NY",
          dob: "1985-06-15",
          staffId: "STF001",
          department: "Sales",
          documentType: "passport",
          documentNumber: "P12345678",
          staffPhoto: "john_doe.jpg",
          documentFile: "john_doe_passport.pdf",
        },
        {
          id: "2",
          firstName: "Jane",
          middleName: "Marie",
          lastName: "Smith",
          phone: "+1 (555) 987-6543",
          email: "jane.smith@example.com",
          location: "Los Angeles, CA",
          dob: "1990-03-22",
          staffId: "STF002",
          department: "Marketing",
          documentType: "national_id",
          documentNumber: "ID98765432",
          staffPhoto: "jane_smith.jpg",
          documentFile: "jane_smith_id.jpg",
        },
        {
          id: "3",
          firstName: "Robert",
          middleName: "",
          lastName: "Johnson",
          phone: "+1 (555) 456-7890",
          email: "robert.johnson@example.com",
          location: "Chicago, IL",
          dob: "1988-11-10",
          staffId: "STF003",
          department: "IT",
          documentType: "license",
          documentNumber: "DL876543",
          staffPhoto: "robert_johnson.jpg",
          documentFile: "robert_johnson_license.pdf",
        },
        {
          id: "4",
          firstName: "Emily",
          middleName: "Ann",
          lastName: "Wilson",
          phone: "+1 (555) 234-5678",
          email: "emily.wilson@example.com",
          location: "Miami, FL",
          dob: "1992-07-30",
          staffId: "STF004",
          department: "HR",
          documentType: "passport",
          documentNumber: "P87654321",
          staffPhoto: "emily_wilson.jpg",
          documentFile: "emily_wilson_passport.pdf",
        },
        {
          id: "5",
          firstName: "Michael",
          middleName: "James",
          lastName: "Brown",
          phone: "+1 (555) 876-5432",
          email: "michael.brown@example.com",
          location: "Seattle, WA",
          dob: "1983-09-05",
          staffId: "STF005",
          department: "Finance",
          documentType: "national_id",
          documentNumber: "ID45678901",
          staffPhoto: "michael_brown.jpg",
          documentFile: "michael_brown_id.jpg",
        },
      ];

      setStaffMembers(mockStaffMembers);
      setFilteredStaffMembers(mockStaffMembers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Search function
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStaffMembers(staffMembers);
    } else {
      const filtered = staffMembers.filter((staff) =>
        [
          staff.firstName,
          staff.lastName,
          staff.department,
          staff.staffId,
          staff.location,
        ].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredStaffMembers(filtered);
    }
  }, [searchTerm, staffMembers]);

  // Delete handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      const updatedStaffMembers = staffMembers.filter(
        (staff) => staff.id !== id
      );
      setStaffMembers(updatedStaffMembers);
      setFilteredStaffMembers(updatedStaffMembers);
      alert("Staff member deleted successfully");
    }
  };

  // Pagination logic
  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaffMembers = filteredStaffMembers.slice(
    indexOfFirstStaff,
    indexOfLastStaff
  );

  const totalPages = Math.ceil(filteredStaffMembers.length / staffPerPage);

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
        <h1 className="text-2xl font-semibold text-[#614F7F]">Staff Members</h1>
        <Link
          to="/staff/add"
          className="px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300"
        >
          Add New Staff Member
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
            placeholder="Search staff by name, ID, department, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Staff table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "S.N",
                "Photo",
                "Name",
                "Staff ID",
                "Department",
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
            ) : currentStaffMembers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  No staff members found
                </td>
              </tr>
            ) : (
              currentStaffMembers.map((staff, index) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {indexOfFirstStaff + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      {staff.staffPhoto ? (
                        <img
                          src={`/images/${staff.staffPhoto}`}
                          alt={`${staff.firstName} ${staff.lastName}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500">
                          {staff.firstName.charAt(0)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {`${staff.firstName} ${
                      staff.middleName ? staff.middleName + " " : ""
                    }${staff.lastName}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {staff.staffId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {staff.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{staff.email}</div>
                    <div className="text-sm text-gray-500">{staff.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-3">
                      <Link to={`/staff/view/${staff.id}`} title="View">
                        <FaEye className="text-blue-600 hover:text-blue-800" />
                      </Link>
                      <Link to={`/staff/edit/${staff.id}`} title="Edit">
                        <FaEdit className="text-yellow-600 hover:text-yellow-800" />
                      </Link>
                      <button
                        onClick={() => handleDelete(staff.id)}
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

export default ListStaff;
