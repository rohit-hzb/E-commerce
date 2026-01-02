import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // updated
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


/* Skeleton Card */
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow p-4 animate-pulse">
    <div className="h-48 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
    <div className="h-10 bg-gray-300 rounded"></div>
  </div>
);

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const navigate = useNavigate();

  const getFilterData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/products/category/${category}`
      );
      setSearchData(res.data);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilterData();
    window.scrollTo(0,0)
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        ← Back
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 capitalize">
        {category} Products
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : searchData.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
