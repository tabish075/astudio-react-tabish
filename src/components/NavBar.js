import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/users">React Tabish</Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/users">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  );
};

export default NavigationBar;
