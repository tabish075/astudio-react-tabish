import React from 'react';
import { Table } from 'react-bootstrap';

const DataTable = ({ data = [], type }) => {
  if (data.length === 0) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No data available</th>
          </tr>
        </thead>
      </Table>
    );
  }

  const userHeaders = [
    'id', 'firstName', 'lastName', 'age', 'gender', 'email', 
    'phone', 'username', 'birthDate', 'bloodGroup', 'eyeColor', 'address'
  ];

  const headers = type === 'users' ? userHeaders : Object.keys(data[0]);

  const renderCellContent = (header, content) => {
    if (header === 'address' && typeof content === 'object') {
      const { city, state, country } = content;
      return `${city}, ${state}, ${country}`;
    }

    if (typeof content === 'object' && content !== null) {
      return JSON.stringify(content); // Convert other objects to string
    }

    return content;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {headers.map((header) => (
              <td key={header}>{renderCellContent(header, item[header])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
