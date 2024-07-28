import React, { useContext } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { DataContext } from '../contexts/DataContext';

const FilterBar = () => {
  const { setFilters, setPagination } = useContext(DataContext);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageSizeChange = (size) => {
    setPagination((prev) => ({ ...prev, pageSize: size, currentPage: 1 }));
  };

  return (
    <div className="d-flex mb-3">
      <Form.Control
        type="text"
        placeholder="Search by Username"
        name="username"
        onChange={handleFilterChange}
        className="me-2"
      />
      <Dropdown onSelect={handlePageSizeChange}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Page Size
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {[5, 10, 20, 50].map((size) => (
            <Dropdown.Item key={size} eventKey={size}>
              {size}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default FilterBar;
