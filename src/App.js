// /src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import { DataProvider } from './contexts/DataContext';
import NavigationBar from './components/NavBar';

function App() {
  return (
    <DataProvider>
      <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/" element={<UsersPage />} /> {/* Default Home Route */}
        </Routes>
      </div>
    </Router>
    
    </DataProvider>
  );
}

export default App;
