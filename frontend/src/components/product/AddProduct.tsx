import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUpload, FaTrash } from "react-icons/fa";

const AddProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    type: "",
    price: "",
    discountPrice: "",
    stock: "",
    brand: "",
    sku: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const productTypes = [
    "Decorative",
    "Automobiles",
    "Electronics",
    "Clothing",
    "Furniture",
    "Kitchen",
    "Sports",
    "Others",
  ];

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/product/${id}`)
        .then((response: any) => {
          setProductData(response.data);
          if (response.data.images) {
            setPreviewImages(response.data.images);
          }
        })
        .catch((error: any) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = e.target.files ? Array.from(e.target.files) : [];

    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);

      // Create preview URLs for the selected images
      const newPreviewImages = files.map((file) => URL.createObjectURL(file));
      setPreviewImages((prevPreviews) => [
        ...prevPreviews,
        ...newPreviewImages,
      ]);
    }
  };

  const removeImage = (index: number) => {
    // Remove the image from both arrays
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    // Revoke the object URL to free memory
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("type", productData.type);
    formData.append("price", productData.price);
    formData.append("discountPrice", productData.discountPrice);
    formData.append("stock", productData.stock);
    formData.append("brand", productData.brand);
    formData.append("sku", productData.sku);
    formData.append("weight", productData.weight);
    formData.append("length", productData.length);
    formData.append("width", productData.width);
    formData.append("height", productData.height);
    formData.append("description", productData.description);

    // Append all images to the FormData
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    // Log the data (would be replaced with an API call)
    console.log("Product data:", productData);
    console.log("Images:", images);

    // Here you would make an API call to save the product
    // Example: axios.post('/api/products', formData)

    // Reset form after submission
    setProductData({
      name: "",
      type: "",
      price: "",
      discountPrice: "",
      stock: "",
      brand: "",
      sku: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      description: "",
    });

    // Clear images and revoke object URLs
    previewImages.forEach((url) => URL.revokeObjectURL(url));
    setImages([]);
    setPreviewImages([]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-[#614F7F] mb-6">
        {id ? "Edit Product" : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Type *
          </label>
          <select
            id="type"
            name="type"
            value={productData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
          >
            <option value="" disabled>
              Select product type
            </option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            placeholder="Enter product name"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter product price"
            />
          </div>

          <div>
            <label
              htmlFor="discountPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Discount Price
            </label>
            <input
              type="number"
              id="discountPrice"
              name="discountPrice"
              value={productData.discountPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter discount price"
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock Quantity *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter stock quantity"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter product brand"
            />
          </div>

          <div>
            <label
              htmlFor="sku"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter product SKU"
            />
          </div>

          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Weight
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={productData.weight}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter product weight"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="length"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Length
            </label>
            <input
              type="number"
              id="length"
              name="length"
              value={productData.length}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter length"
            />
          </div>
          <div>
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Width
            </label>
            <input
              type="number"
              id="width"
              name="width"
              value={productData.width}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter width"
            />
          </div>
          <div>
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Height
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={productData.height}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
              placeholder="Enter height"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#614F7F]"
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Images *
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaUpload className="w-8 h-8 mb-3 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </label>
          </div>

          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {previewImages.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300"
          >
            {id ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
