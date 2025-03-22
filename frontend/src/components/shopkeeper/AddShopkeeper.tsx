import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUpload, FaTrash } from "react-icons/fa";

const AddShopkeeper = () => {
  const { id } = useParams();
  const [shopkeeperData, setShopkeeperData] = useState({
    name: "",
    shopName: "",
    location: "",
    email: "",
    phone: "",
    description: "",
    facebook: "",
    instagram: "",
    twitter: "",
    website: "",
  });
  
  // For shopkeeper photo
  const [shopkeeperPhoto, setShopkeeperPhoto] = useState<File | null>(null);
  const [shopkeeperPhotoPreview, setShopkeeperPhotoPreview] = useState<string>("");
  
  // For shop photo
  const [shopPhoto, setShopPhoto] = useState<File | null>(null);
  const [shopPhotoPreview, setShopPhotoPreview] = useState<string>("");

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/shopkeeper/${id}`)
        .then((response: any) => {
          setShopkeeperData(response.data);
          if (response.data.shopkeeperPhoto) {
            setShopkeeperPhotoPreview(response.data.shopkeeperPhoto);
          }
          if (response.data.shopPhoto) {
            setShopPhotoPreview(response.data.shopPhoto);
          }
        })
        .catch((error: any) => {
          console.error("Error fetching shopkeeper data:", error);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setShopkeeperData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShopkeeperPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setShopkeeperPhoto(file);
      
      // Create preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      // Revoke old URL if exists to free memory
      if (shopkeeperPhotoPreview) {
        URL.revokeObjectURL(shopkeeperPhotoPreview);
      }
      setShopkeeperPhotoPreview(previewUrl);
    }
  };

  const handleShopPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setShopPhoto(file);
      
      // Create preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      // Revoke old URL if exists to free memory
      if (shopPhotoPreview) {
        URL.revokeObjectURL(shopPhotoPreview);
      }
      setShopPhotoPreview(previewUrl);
    }
  };

  const removeShopkeeperPhoto = () => {
    if (shopkeeperPhotoPreview) {
      URL.revokeObjectURL(shopkeeperPhotoPreview);
    }
    setShopkeeperPhoto(null);
    setShopkeeperPhotoPreview("");
  };

  const removeShopPhoto = () => {
    if (shopPhotoPreview) {
      URL.revokeObjectURL(shopPhotoPreview);
    }
    setShopPhoto(null);
    setShopPhotoPreview("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("name", shopkeeperData.name);
    formData.append("shopName", shopkeeperData.shopName);
    formData.append("location", shopkeeperData.location);
    formData.append("email", shopkeeperData.email);
    formData.append("phone", shopkeeperData.phone);
    formData.append("description", shopkeeperData.description);
    formData.append("facebook", shopkeeperData.facebook);
    formData.append("instagram", shopkeeperData.instagram);
    formData.append("twitter", shopkeeperData.twitter);
    formData.append("website", shopkeeperData.website);

    // Append photos to the FormData if they exist
    if (shopkeeperPhoto) {
      formData.append("shopkeeperPhoto", shopkeeperPhoto);
    }
    
    if (shopPhoto) {
      formData.append("shopPhoto", shopPhoto);
    }

    // Log the data (would be replaced with an API call)
    console.log("Shopkeeper data:", shopkeeperData);
    console.log("Shopkeeper photo:", shopkeeperPhoto);
    console.log("Shop photo:", shopPhoto);

    // Here you would make an API call to save the shopkeeper
    // Example: axios.post('/api/shopkeepers', formData)

    // Reset form after submission
    setShopkeeperData({
      name: "",
      shopName: "",
      location: "",
      email: "",
      phone: "",
      description: "",
      facebook: "",
      instagram: "",
      twitter: "",
      website: "",
    });

    // Clear images and revoke object URLs
    if (shopkeeperPhotoPreview) URL.revokeObjectURL(shopkeeperPhotoPreview);
    if (shopPhotoPreview) URL.revokeObjectURL(shopPhotoPreview);
    setShopkeeperPhoto(null);
    setShopPhoto(null);
    setShopkeeperPhotoPreview("");
    setShopPhotoPreview("");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-[#614F7F] mb-6">
        {id ? "Edit Shopkeeper" : "Add New Shopkeeper"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Shopkeeper Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={shopkeeperData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter shopkeeper name"
            />
          </div>

          <div>
            <label
              htmlFor="shopName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Shop Name *
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={shopkeeperData.shopName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter shop name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Shop Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={shopkeeperData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            placeholder="Enter shop location (City, State)"
          />
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
              value={shopkeeperData.email}
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
              value={shopkeeperData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shopkeeper Photo *
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="shopkeeper-photo"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaUpload className="w-8 h-8 mb-3 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> shopkeeper photo
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 400x400px)
                </p>
              </div>
              <input
                id="shopkeeper-photo"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleShopkeeperPhotoChange}
              />
            </label>
          </div>

          {shopkeeperPhotoPreview && (
            <div className="mt-4">
              <div className="relative w-32 h-32">
                <img
                  src={shopkeeperPhotoPreview}
                  alt="Shopkeeper preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeShopkeeperPhoto}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shop Photo *
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="shop-photo"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaUpload className="w-8 h-8 mb-3 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> shop photo
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x600px)
                </p>
              </div>
              <input
                id="shop-photo"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleShopPhotoChange}
              />
            </label>
          </div>

          {shopPhotoPreview && (
            <div className="mt-4">
              <div className="relative w-64 h-40">
                <img
                  src={shopPhotoPreview}
                  alt="Shop preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeShopPhoto}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Shop Description
          </label>
          <textarea
            id="description"
            name="description"
            value={shopkeeperData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            placeholder="Enter shop description"
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Social Media Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="facebook"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Facebook
              </label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                value={shopkeeperData.facebook}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
                placeholder="Facebook profile URL"
              />
            </div>

            <div>
              <label
                htmlFor="instagram"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Instagram
              </label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={shopkeeperData.instagram}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
                placeholder="Instagram profile URL"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={shopkeeperData.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
                placeholder="Twitter profile URL"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={shopkeeperData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
                placeholder="Shop website URL"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300"
          >
            {id ? "Update Shopkeeper" : "Add Shopkeeper"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShopkeeper;