import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

// Define the product type
interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  brand: string;
  sku: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  description: string;
  images: string[];
}

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    // In a real application, you would fetch the product from an API
    // For demo purposes, we'll use a mock product
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock product data
      const mockProduct: Product = {
        id: id || "1",
        name: "Smartphone X",
        type: "Electronics",
        price: 999.99,
        discountPrice: 899.99,
        stock: 50,
        brand: "TechBrand",
        sku: "TECH-SP-001",
        weight: "200",
        length: "150",
        width: "75",
        height: "8",
        description: "The latest smartphone with advanced features including a high-resolution camera, fast processor, and long-lasting battery. Perfect for professionals and tech enthusiasts who need reliable performance and cutting-edge technology.",
        images: ["image1.jpg", "image2.jpg", "image3.jpg"]
      };
      
      setProduct(mockProduct);
      setActiveImage(mockProduct.images[0]);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-red-500">Product not found</p>
        </div>
        <div className="mt-4 text-center">
          <Link 
            to="/product/list" 
            className="text-[#614F7F] hover:underline"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Link 
          to="/product/list" 
          className="mr-4 text-gray-500 hover:text-[#614F7F]"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-[#614F7F] flex-grow">
          Product Details
        </h1>
        <Link 
          to={`/product/edit/${product.id}`}
          className="px-4 py-2 bg-[#614F7F] text-white rounded-md hover:bg-[#503F6F] transition-colors duration-300 flex items-center"
        >
          <FaEdit className="mr-2" /> Edit Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4 border rounded-lg overflow-hidden h-64">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Product+Image";
              }}
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg overflow-hidden h-20 cursor-pointer ${activeImage === image ? 'border-[#614F7F] border-2' : ''}`}
                  onClick={() => setActiveImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/100?text=Image";
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
          
          <div className="flex items-baseline mb-4">
            {product.discountPrice ? (
              <>
                <span className="text-xl font-semibold text-green-600 mr-2">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">{product.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Brand</p>
              <p className="font-medium">{product.brand}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">SKU</p>
              <p className="font-medium">{product.sku}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stock</p>
              <p className="font-medium">{product.stock} units</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium">{product.weight ? `${product.weight} g` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dimensions</p>
                <p className="font-medium">
                  {product.length && product.width && product.height ? 
                    `${product.length} × ${product.width} × ${product.height} cm` : 
                    'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;