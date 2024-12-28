import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo/TUV-NORTH-LOGO.png';

function Sidebar() {
  return (
    <nav className="sidebar navbar navbar-expand-lg d-flex flex-column align-items-start px-3">
      {/* Logo with flex properties for alignment */}
      <div className="d-flex justify-content-between align-items-center w-100 mb-3">
        <img
          src={logo}
          alt="logo"
          className="img-fluid"
          style={{ width: '180px' }}
        />
        {/* Hamburger menu (only visible on mobile) */}
        <button
          className="navbar-toggler d-lg-none"
          style={{ backgroundColor: '#3572ef' }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Navigation links (collapsed in mobile view) */}
      <div className="collapse navbar-collapse w-100" style={{marginTop: "-25rem"}} id="navbarSupportedContent">
        <ul className="navbar-nav flex-column w-100">
          <li className="nav-item mt-3">
            <NavLink
              className="nav-link text-white d-flex align-items-center"
              to="/dashboard"
              style={{ fontSize: '1.1rem', gap: '10px' }}
            >
              <i className="fas fa-home"></i>Dashboard
            </NavLink>
          </li>
          <li className="nav-item mt-3">
            <NavLink
              className="nav-link text-white d-flex align-items-center"
              to="/Allusers"
              style={{ fontSize: '1.1rem', gap: '10px' }}
            >
              <i className="fas fa-users"></i> All Entries
            </NavLink>
          </li>
          <li className="nav-item mt-3">
            <NavLink
              className="nav-link text-white d-flex align-items-center"
              to="/edit"
              style={{ fontSize: '1.1rem', gap: '10px' }}
            >
              <i className="fas fa-edit"></i> Edit Entry
            </NavLink>
          </li>
          <li className="nav-item mt-3">
            <NavLink
              className="nav-link text-white d-flex align-items-center"
              to="/register"
              style={{ fontSize: '1.1rem', gap: '10px' }}
            >
              <i className="fas fa-user-plus"></i> Create Entry
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
