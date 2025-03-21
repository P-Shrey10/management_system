import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUpload, FaTrash } from "react-icons/fa";

const AddStaff = () => {
  const { id } = useParams();
  const [staffData, setStaffData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    location: "",
    dob: "",
    staffId: "",
    department: "",
    documentType: "",
    documentNumber: "",
  });

  // For staff photo
  const [staffPhoto, setStaffPhoto] = useState<File | null>(null);
  const [staffPhotoPreview, setStaffPhotoPreview] = useState<string>("");

  // For document upload
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentFilePreview, setDocumentFilePreview] = useState<string>("");

  // Document types options
  const staffDocumentTypes = [
    { value: "", label: "Select document type" },
    { value: "national_id", label: "National ID" },
    { value: "citizenship", label: "Citizenship" },
    { value: "passport", label: "Passport" },
    { value: "pan_card", label: "PAN Card" },
    { value: "voter_card", label: "Voter Card" },
    { value: "license", label: "License" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/staff/${id}`)
        .then((response: any) => {
          setStaffData(response.data);
          if (response.data.staffPhoto) {
            setStaffPhotoPreview(response.data.staffPhoto);
          }
          if (response.data.documentFile) {
            setDocumentFilePreview(response.data.documentFile);
          }
        })
        .catch((error: any) => {
          console.error("Error fetching staff data:", error);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStaffPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStaffPhoto(file);

      // Create preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      // Revoke old URL if exists to free memory
      if (staffPhotoPreview) {
        URL.revokeObjectURL(staffPhotoPreview);
      }
      setStaffPhotoPreview(previewUrl);
    }
  };

  const handleDocumentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocumentFile(file);

      // Create preview URL for the selected document (if it's an image)
      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        if (documentFilePreview) {
          URL.revokeObjectURL(documentFilePreview);
        }
        setDocumentFilePreview(previewUrl);
      } else {
        // For non-image documents, just display filename
        setDocumentFilePreview(file.name);
      }
    }
  };

  const removeStaffPhoto = () => {
    if (staffPhotoPreview) {
      URL.revokeObjectURL(staffPhotoPreview);
    }
    setStaffPhoto(null);
    setStaffPhotoPreview("");
  };

  const removeDocumentFile = () => {
    if (documentFilePreview && documentFilePreview.startsWith("blob:")) {
      URL.revokeObjectURL(documentFilePreview);
    }
    setDocumentFile(null);
    setDocumentFilePreview("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("firstName", staffData.firstName);
    formData.append("middleName", staffData.middleName);
    formData.append("lastName", staffData.lastName);
    formData.append("phone", staffData.phone);
    formData.append("email", staffData.email);
    formData.append("location", staffData.location);
    formData.append("dob", staffData.dob);
    formData.append("staffId", staffData.staffId);
    formData.append("department", staffData.department);
    formData.append("documentType", staffData.documentType);
    formData.append("documentNumber", staffData.documentNumber);

    // Append photos to the FormData if they exist
    if (staffPhoto) {
      formData.append("staffPhoto", staffPhoto);
    }

    if (documentFile) {
      formData.append("documentFile", documentFile);
    }

    // Log the data (would be replaced with an API call)
    console.log("Staff data:", staffData);
    console.log("Staff photo:", staffPhoto);
    console.log("Document file:", documentFile);

    // Here you would make an API call to save the staff member
    // Example: axios.post('/api/staff', formData)

    // Reset form after submission
    setStaffData({
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      location: "",
      dob: "",
      staffId: "",
      department: "",
      documentType: "",
      documentNumber: "",
    });

    // Clear files and revoke object URLs
    if (staffPhotoPreview && staffPhotoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(staffPhotoPreview);
    }
    if (documentFilePreview && documentFilePreview.startsWith("blob:")) {
      URL.revokeObjectURL(documentFilePreview);
    }
    setStaffPhoto(null);
    setDocumentFile(null);
    setStaffPhotoPreview("");
    setDocumentFilePreview("");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-[#614F7F] mb-6">
        {id ? "Edit Staff Member" : "Add New Staff Member"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={staffData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label
              htmlFor="middleName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={staffData.middleName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter middle name"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={staffData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={staffData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={staffData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={staffData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth *
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={staffData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="staffId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Staff ID *
            </label>
            <input
              type="text"
              id="staffId"
              name="staffId"
              value={staffData.staffId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter staff ID"
            />
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department *
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={staffData.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter department"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Staff Photo *
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="staff-photo"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaUpload className="w-8 h-8 mb-3 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> staff
                  photo
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 400x400px)
                </p>
              </div>
              <input
                id="staff-photo"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleStaffPhotoChange}
              />
            </label>
          </div>

          {staffPhotoPreview && (
            <div className="mt-4">
              <div className="relative w-32 h-32">
                <img
                  src={staffPhotoPreview}
                  alt="Staff preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeStaffPhoto}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="documentType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Document Type *
            </label>
            <select
              id="documentType"
              name="documentType"
              value={staffData.documentType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            >
              {staffDocumentTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="documentNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Document Number *
            </label>
            <input
              type="text"
              id="documentNumber"
              name="documentNumber"
              value={staffData.documentNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter document number"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document File *
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="document-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaUpload className="w-8 h-8 mb-3 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>{" "}
                  document file
                </p>
                <p className="text-xs text-gray-500">
                  PDF, PNG, JPG (MAX. 5MB)
                </p>
              </div>
              <input
                id="document-file"
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleDocumentFileChange}
              />
            </label>
          </div>

          {documentFilePreview && (
            <div className="mt-4">
              {documentFilePreview.startsWith("blob:") ? (
                <div className="relative w-64 h-40">
                  <img
                    src={documentFilePreview}
                    alt="Document preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeDocumentFile}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ) : (
                <div className="relative flex items-center p-4 bg-gray-100 rounded-md">
                  <span className="flex-1 truncate">{documentFilePreview}</span>
                  <button
                    type="button"
                    onClick={removeDocumentFile}
                    className="ml-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300"
          >
            {id ? "Update Staff Member" : "Add Staff Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
