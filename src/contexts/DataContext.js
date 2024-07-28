import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (endpoint) => {
    const queryString = new URLSearchParams({
      ...filters,
      page,
      limit: pageSize,
    }).toString();

    try {
      const response = await fetch(`https://dummyjson.com/${endpoint}?${queryString}`);
      const result = await response.json();
      setData(result.data);
      setTotalPages(Math.ceil(result.total / pageSize));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, filters, setFilters, page, setPage, pageSize, setPageSize, totalPages, setTotalPages, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
