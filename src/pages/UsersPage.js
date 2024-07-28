import React, { useContext, useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import DataTable from '../components/DataTable';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { DataContext } from '../contexts/DataContext';

const UsersPage = () => {
  const { data, setPage, totalPages, setFilters, pageSize, setPageSize } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  useFetchData('users', currentPage);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (query) => {
    setFilteredData(data.filter(item => {
      return Object.keys(item).some(key => {
        const value = item[key];
        if (key === 'address' && typeof value === 'object' && value !== null) {
          const { city, state, country } = value;
          const addressString = `${city}, ${state}, ${country}`;
          return addressString.toLowerCase().includes(query.toLowerCase());
        }
        return String(value).toLowerCase().includes(query.toLowerCase());
      });
    }));
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPage(1); // Reset to the first page on filter change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1); // Reset to the first page on page size change
  };

  return (
    <div>
      <h1>Users</h1>
      <Filters page="users" onFilterChange={handleFilterChange} />
      <SearchBar onSearch={handleSearch} />
      <DataTable data={filteredData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default UsersPage;
