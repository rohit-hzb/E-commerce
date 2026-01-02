import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 rounded
          ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
      >
        Prev
      </button>

      {/* Page info */}
      <span className="px-4 py-2 bg-gray-100 rounded font-semibold">
        {currentPage} / {totalPages}
      </span>

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 rounded
          ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
