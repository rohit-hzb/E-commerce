import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import loading from "../assets/Loading4.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notFound from "../assets/notfound.json";

const Products = () => {
  const { data, fetchAllProducts } = useData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  // ✅ SAFE FILTER
  const filteredData = (data || []).filter((item) => {
    const title = item?.title?.toLowerCase() || "";
    const itemCategory = item?.category?.toLowerCase() || "";
    const itemBrand = item?.brand?.toLowerCase() || "";

    const matchSearch = title.includes(search.toLowerCase());
    const matchCategory =
      category === "" || itemCategory === category.toLowerCase();
    const matchBrand =
      brand === "" || itemBrand === brand.toLowerCase();
    const matchPrice =
      item?.price >= priceRange[0] &&
      item?.price <= priceRange[1];

    return matchSearch && matchCategory && matchBrand && matchPrice;
  });

  // ✅ PAGINATION LOGIC
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <video muted autoPlay loop>
          <source src={loading} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mb-10">
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSection
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <div className="w-full">
          {paginatedData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10">
                {paginatedData.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                totalItems={filteredData.length}
                itemsPerPage={itemsPerPage}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-[400px]">
              <div className="flex justify-center md-h-[600px] md-w-[900px] mt-10">
            <Lottie animationData={notFound} classID="w-[500px]"/>
          </div>
          
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
