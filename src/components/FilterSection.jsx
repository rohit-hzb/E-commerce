import React from "react";
import { useData } from "../context/DataContext";

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
}) => {
  const { categoryOnlyData, brandOnlyData } = useData();

  return (
    <div className="bg-gray-100 p-4 rounded-md w-full md:w-72 lg:w-80 h-max">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />

      {/* Category */}
    {/* Category */}
<h1 className="mt-5 font-semibold text-lg md:text-xl">Category</h1>

<div className="flex flex-col gap-2 mt-3">

  {/* ✅ ALL OPTION */}
  <label className="flex gap-2 items-center cursor-pointer">
    <input
      type="radio"
      name="category"
      value=""
      checked={category === ""}
      onChange={() => setCategory("")}
    />
    <span className="uppercase">All</span>
  </label>

  {/* EXISTING CATEGORIES */}
  {categoryOnlyData
    ?.filter((item) => typeof item === "string")
    .map((item) => (
      <label
        key={item}
        className="flex gap-2 items-center cursor-pointer"
      >
        <input
          type="radio"
          name="category"
          value={item}
          checked={category === item}
          onChange={(e) => setCategory(e.target.value)}
        />
        <span className="uppercase">{item}</span>
      </label>
    ))}
</div>


      {/* Brand */}
      <h1 className="mt-5 font-semibold text-lg mb-3">Brand</h1>
      <select
        name="brand"
        id="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
      >
        <option value="">All Brands</option>
        {brandOnlyData
          ?.filter((item) => typeof item === "string")
          .map((item) => (
            <option value={item.toLowerCase()} key={item}> {/* ✅ FIX */}
              {item.toUpperCase()}
            </option>
          ))}
      </select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-lg mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label>
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setSearch("");
          setCategory("");
          setBrand("");
          setPriceRange([0, 5000]);
        }}
        className="bg-red-500 text-white rounded-md px-3 py-2 mt-5 w-full">
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
