// /src/components/SearchBar.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <button 
          className="btn btn-outline-secondary" 
          type="button" 
          onClick={() => setSearchVisible(!searchVisible)}
        >
          <FaSearch />
        </button>
      </div>
      {searchVisible && (
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      )}
    </div>
  );
};

export default SearchBar;
