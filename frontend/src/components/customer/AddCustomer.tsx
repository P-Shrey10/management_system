import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUpload, FaTrash } from "react-icons/fa";

const AddCustomer = () => {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    location: "",
    dob: "",
    documentType: "",
  });

  // For customer photo
  const [customerPhoto, setCustomerPhoto] = useState<File | null>(null);
  const [customerPhotoPreview, setCustomerPhotoPreview] = useState<string>("");

  // For document upload
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string>("");

  const documentTypes = [
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
        .get(`/api/customer/${id}`)
        .then((response: any) => {
          setCustomerData(response.data);
          if (response.data.customerPhoto) {
            setCustomerPhotoPreview(response.data.customerPhoto);
          }
          if (response.data.documentFile) {
            setDocumentPreview(response.data.documentFile);
          }
        })
        .catch((error: any) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCustomerPhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomerPhoto(file);

      // Create preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      // Revoke old URL if exists to free memory
      if (customerPhotoPreview) {
        URL.revokeObjectURL(customerPhotoPreview);
      }
      setCustomerPhotoPreview(previewUrl);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocumentFile(file);

      // Create preview URL for the selected document
      const previewUrl = URL.createObjectURL(file);
      // Revoke old URL if exists to free memory
      if (documentPreview) {
        URL.revokeObjectURL(documentPreview);
      }
      setDocumentPreview(previewUrl);
    }
  };

  const removeCustomerPhoto = () => {
    if (customerPhotoPreview) {
      URL.revokeObjectURL(customerPhotoPreview);
    }
    setCustomerPhoto(null);
    setCustomerPhotoPreview("");
  };

  const removeDocument = () => {
    if (documentPreview) {
      URL.revokeObjectURL(documentPreview);
    }
    setDocumentFile(null);
    setDocumentPreview("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("firstName", customerData.firstName);
    formData.append("middleName", customerData.middleName);
    formData.append("lastName", customerData.lastName);
    formData.append("mobileNumber", customerData.mobileNumber);
    formData.append("email", customerData.email);
    formData.append("location", customerData.location);
    formData.append("dob", customerData.dob);
    formData.append("documentType", customerData.documentType);

    // Append photo to the FormData if it exists
    if (customerPhoto) {
      formData.append("customerPhoto", customerPhoto);
    }

    // Append document to the FormData if it exists
    if (documentFile) {
      formData.append("documentFile", documentFile);
    }

    // Log the data (would be replaced with an API call)
    console.log("Customer data:", customerData);
    console.log("Customer photo:", customerPhoto);
    console.log("Document file:", documentFile);

    // Here you would make an API call to save the customer
    // Example: axios.post('/api/customers', formData)

    // Reset form after submission
    setCustomerData({
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      location: "",
      dob: "",
      documentType: "",
    });

    // Clear image and revoke object URL
    if (customerPhotoPreview) URL.revokeObjectURL(customerPhotoPreview);
    setCustomerPhoto(null);
    setCustomerPhotoPreview("");

    // Clear document and revoke object URL
    if (documentPreview) URL.revokeObjectURL(documentPreview);
    setDocumentFile(null);
    setDocumentPreview("");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-[#614F7F] mb-6">
        {id ? "Edit Customer" : "Add New Customer"}
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
              value={customerData.firstName}
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
              value={customerData.middleName}
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
              value={customerData.lastName}
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
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={customerData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter mobile number"
            />
          </div>

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
              value={customerData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter email address"
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
              value={customerData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter location (City, State)"
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
              value={customerData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Photo *
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="customer-photo"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaUpload className="w-8 h-8 mb-3 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>{" "}
                  customer photo
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 400x400px)
                </p>
              </div>
              <input
                id="customer-photo"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCustomerPhotoChange}
              />
            </label>
          </div>

          {customerPhotoPreview && (
            <div className="mt-4">
              <div className="relative w-32 h-32">
                <img
                  src={customerPhotoPreview}
                  alt="Customer preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeCustomerPhoto}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
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
              value={customerData.documentType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            >
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document Upload *
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
                    document
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, PNG, JPG (MAX. 5MB)
                  </p>
                </div>
                <input
                  id="document-file"
                  type="file"
                  className="hidden"
                  accept=".pdf,image/*"
                  onChange={handleDocumentChange}
                  required={!documentPreview}
                />
              </label>
            </div>

            {documentPreview && (
              <div className="mt-4">
                <div className="relative w-32">
                  {documentPreview.endsWith(".pdf") ? (
                    <div className="flex items-center p-2 bg-gray-100 rounded-md">
                      <span className="text-sm truncate mr-2">
                        Document file
                      </span>
                    </div>
                  ) : (
                    <img
                      src={documentPreview}
                      alt="Document preview"
                      className="w-full h-32 object-cover rounded-md"
                    />
                  )}
                  <button
                    type="button"
                    onClick={removeDocument}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300"
          >
            {id ? "Update Customer" : "Add Customer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
