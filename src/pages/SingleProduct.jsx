import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loadingVideo from "../assets/Loading3.webm";
import { IoCartOutline, IoRemove, IoAdd } from "react-icons/io5";
import Breadcrums from "../components/Breadcrums";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const discount = 5;
  const discountedPrice = product
    ? (product.price - (product.price * discount) / 100).toFixed(2)
    : 0;

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/products/${id}`
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });
    toast.success("Product added to cart 🛒");
  };

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <video autoPlay loop muted className="w-40 h-40">
          <source src={loadingVideo} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <>
      <Breadcrums title={product.title} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          ← Back
        </button>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-64 md:w-80 object-contain"
              />
            </div>

            {/* Details */}
            <div className="space-y-5">
              <h1 className="text-2xl md:text-3xl font-bold">
                {product.title}
              </h1>

              <p className="text-gray-600">{product.description}</p>

              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-red-500">
                  ₹ {discountedPrice}
                </span>
                <span className="line-through text-gray-400">
                  ₹ {product.price}
                </span>
                <span className="text-green-600 font-semibold">
                  {discount}% OFF
                </span>
              </div>

              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border rounded">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                    className="px-3 py-2"
                  >
                    <IoRemove />
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-3 py-2"
                  >
                    <IoAdd />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                <IoCartOutline size={22} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
