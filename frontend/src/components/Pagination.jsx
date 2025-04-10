import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  size = 'md',
  className = '',
}) => {
  // Early return if there's only one page
  if (totalPages <= 1) return null;
  
  // Create an array of page numbers to display
  const getPageNumbers = () => {
    // If total pages is less than max visible, show all pages
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate the start and end of the page range
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;
    
    // Adjust if we're near the end
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  
  const pageNumbers = getPageNumbers();
  
  // Handle page changes
  const goToPage = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  const sizes = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };
  
  const buttonSize = sizes[size];
  
  return (
    <nav className={`flex justify-center ${className}`}>
      <ul className="flex items-center space-x-1">
        {/* First page button */}
        {showFirstLast && (
          <li>
            <button
              type="button"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              aria-label="Go to first page"
              className={`
                ${buttonSize} rounded-md 
                flex items-center justify-center 
                ${currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-100'
                }
              `}
            >
              <span className="sr-only">First</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </li>
        )}
        
        {/* Previous button */}
        {showPrevNext && (
          <li>
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
              className={`
                ${buttonSize} rounded-md 
                flex items-center justify-center 
                ${currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-100'
                }
              `}
            >
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </li>
        )}
        
        {/* Page numbers */}
        {pageNumbers.map(page => (
          <li key={page}>
            <button
              type="button"
              onClick={() => goToPage(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`
                ${buttonSize} rounded-md 
                flex items-center justify-center 
                ${currentPage === page 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {page}
            </button>
          </li>
        ))}
        
        {/* Next button */}
        {showPrevNext && (
          <li>
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
              className={`
                ${buttonSize} rounded-md 
                flex items-center justify-center 
                ${currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-100'
                }
              `}
            >
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        )}
        
        {/* Last page button */}
        {showFirstLast && (
          <li>
            <button
              type="button"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Go to last page"
              className={`
                ${buttonSize} rounded-md 
                flex items-center justify-center 
                ${currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-100'
                }
              `}
            >
              <span className="sr-only">Last</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  showFirstLast: PropTypes.bool,
  showPrevNext: PropTypes.bool,
  maxVisiblePages: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Pagination;
