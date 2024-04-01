import React from 'react';
export default function PaginationControls({ currentPage, totalPages, onPageChange }:{currentPage: number, totalPages:number, onPageChange: Function}): JSX.Element {
  // Calculate the page numbers to display
  const pageNumbers = [];

  // Always add the first page
  pageNumbers.push(1);

  // If the current page is more than 2 steps away from the first page, add "..."
  if (currentPage > 3) {
    pageNumbers.push('...');
  }

  // Calculate a range of numbers to show around the current page
  let start = Math.max(currentPage - 1, 2);
  let end = Math.min(currentPage + 1, totalPages - 1);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  // If the current page is more than 2 steps away from the last page, add "..."
  if (currentPage < totalPages - 2) {
    pageNumbers.push('...');
  }

  // Always add the last page
  if (totalPages !== 1) {
    pageNumbers.push(totalPages);
  }
  return (
    <div className="flex items-center justify-center space-x-1">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1 rounded-md rounded-l-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
    >
      Previous
    </button>
    {pageNumbers.map((number, index) =>
      typeof number === 'number' ? (
        <button
          key={index}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md  border border-gray-300 ${currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          {number}
        </button>
      ) : (
        <span key={index} className="px-3 py-1">
          ...
        </span>
      )
    )}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-3 py-1 rounded-md rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
    >
      Next
    </button>
  </div>
  );
};
