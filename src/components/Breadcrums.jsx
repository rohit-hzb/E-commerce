import React from "react";
import { useNavigate } from "react-router-dom";

export default function Breadcrums({ title }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 py-3">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm sm:text-base">
        
        {/* Home */}
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer text-gray-600 hover:text-red-500"
        >
          Home
        </span>

        <span className="text-gray-400">/</span>

        {/* Products */}
        <span
          onClick={() => navigate("/products")}
          className="cursor-pointer text-gray-600 hover:text-red-500"
        >
          Products
        </span>

        <span className="text-gray-400">/</span>

        {/* Current Page */}
        <span className="text-gray-800 font-semibold truncate max-w-[180px] sm:max-w-none">
          {title}
        </span>
      </div>
    </div>
  );
}
