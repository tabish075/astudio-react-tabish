// /src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



// Create a root.
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root container

// Initial render: Render an element to the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
