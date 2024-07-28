import React, { useContext } from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { DataContext } from '../contexts/DataContext';

const Pagination = ({ currentPage, onPageChange, pageSize, onPageSizeChange }) => {
  const { totalPages } = useContext(DataContext);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize);
  };

  return (
    <div className="pagination-container">
      <BootstrapPagination>
        <BootstrapPagination.Prev
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        />
        {[...Array(totalPages)].map((_, idx) => (
          <BootstrapPagination.Item
            key={idx + 1}
            active={currentPage === idx + 1}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </BootstrapPagination.Item>
        ))}
        <BootstrapPagination.Next
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        />
      </BootstrapPagination>
      <select value={pageSize} onChange={handlePageSizeChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default Pagination;
