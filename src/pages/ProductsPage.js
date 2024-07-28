import React, { useContext, useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import DataTable from '../components/DataTable';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import { DataContext } from '../contexts/DataContext';

const ProductsPage = () => {
  const { data, setPage, setFilters } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState(data);
  const [activeTab, setActiveTab] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Adjust filters based on active tab
  useEffect(() => {
    if (activeTab === 'Laptops') {
      setFilters({ category: 'laptops' });
    } else {
      setFilters({});
    }
    setPage(1); // Reset to the first page on tab change
  }, [activeTab, setFilters, setPage]);

  // Fetch data with the adjusted filters
  useFetchData('products', currentPage);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (query) => {
    setFilteredData(data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    ));
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPage(1); // Reset to the first page on filter change
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPage(page);
  };

  return (
    <div>
      <h1>Products</h1>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Filters page="products" onFilterChange={handleFilterChange} />
      <SearchBar onSearch={handleSearch} />
      <DataTable data={filteredData} type="products" />
      <Pagination currentPage={currentPage} totalPages={10} onPageChange={handlePageChange} />
    </div>
  );
};

export default ProductsPage;
