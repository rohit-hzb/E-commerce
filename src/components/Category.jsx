import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

const Category = () => {
  const { categoryOnlyData} = useData();
const navigate=useNavigate();
  return (
    <div className="bg-gradient-to-br from-[#2d0b5a] via-[#120721] to-black py-3">
      <div className="max-w-7xl mx-auto flex gap-4 items-center justify-center px-4 flex-wrap">
        {categoryOnlyData.map((item, index) => (
          <button
            key={index}
            onClick={()=>navigate(`/category/${item}`)}
            className="bg-gradient-to-r from-rose-600 to-purple-700  text-white px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
