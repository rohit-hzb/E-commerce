import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <div
      className="
        border border-gray-100 
        rounded-2xl 
        cursor-pointer 
        transition-all 
        p-3
        h-full
        hover:shadow-2xl 
        hover:-translate-y-1
      "
    >
      {/* Image */}
      <div className="bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="
            w-full 
            aspect-square 
            object-contain 
            p-3
          "
          onClick={()=>navigate(`/products/${product.id}`)}
        />
      </div>

      {/* Title */}
      <h1
        className="
          line-clamp-2 
          mt-2 
          text-sm 
          sm:text-base 
          font-semibold
        "
      >
        {product.title}
      </h1>

      {/* Price */}
      <p
        className="
          my-1 
          text-base 
          sm:text-lg 
          text-gray-800 
          font-bold
        "
      >
        ${product.price}
      </p>

      {/* Button */}
      <button
        className="
          bg-red-500 
          px-3 
          py-2 
          text-sm 
          sm:text-base 
          rounded-md 
          text-white 
          w-full 
          cursor-pointer 
          flex 
          gap-2 
          items-center 
          justify-center 
          font-semibold
          hover:bg-red-600
          active:scale-95
          transition
        "
         onClick={()=>addToCart(product)} 
      >
        <IoCartOutline className="w-5 h-5 sm:w-6 sm:h-6"/>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
