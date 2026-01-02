import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products?limit=150");
      setData(res.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };
    const getUniqueCategory = (data, property) => {
      const newVal = data?.map((curElem) => curElem[property]) || [];
      return [...new Set(newVal)];
    };
  
    const categoryOnlyData = getUniqueCategory(data, "category");
    const brandOnlyData=getUniqueCategory(data,"brand");

  return (
    <DataContext.Provider value={{ data, loading, fetchAllProducts,categoryOnlyData ,brandOnlyData}}>
      {children}
    </DataContext.Provider>
  );
};

/* ✅ Proper Custom Hook */
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }
  return context;
};

export default DataContext;
