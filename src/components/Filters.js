// /src/components/Filters.js
import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

const Filters = ({ page, onFilterChange }) => {
  const { filters, setFilters, pageSize, setPageSize } = useContext(DataContext);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Update the local filter state
    const newFilters = { ...localFilters, [name]: value };

    // Reset other filters when one is selected
    const resetFilters = Object.keys(newFilters).reduce((acc, key) => {
      acc[key] = key === name || key === 'pageSize' ? newFilters[key] : '';
      return acc;
    }, {});

    setLocalFilters(resetFilters);
    setFilters(resetFilters);

    if (name === 'pageSize') {
      setPageSize(Number(value));
    }

    onFilterChange(name, value);
  };

  return (
    <div className="filter-bar">
      <label>
        <select name="pageSize" onChange={handleFilterChange} value={pageSize}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        Entries
      </label>

      {page === 'users' && (
        <>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={localFilters.name || ''}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={localFilters.email || ''}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Birth Date:
            <input
              type="text"
              name="birthDate"
              placeholder="Birth Date"
              value={localFilters.birthDate || ''}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={localFilters.gender || ''}
              onChange={handleFilterChange}
            />
          </label>
        </>
      )}

      {page === 'products' && (
        <>
          <label>
            Title:
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={localFilters.title || ''}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Brand:
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={localFilters.brand || ''}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={localFilters.category || ''}
              onChange={handleFilterChange}
            />
          </label>
        </>
      )}
    </div>
  );
};

export default Filters;
