import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { Menu, X, LogOut, User } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const activeClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <h1>💼 BuizManage</h1>
        </div>

        {/* Menu Toggle Button (Mobile) */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink to="/dashboard" className={activeClass}>Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/expenses" className={activeClass}>My Expenses</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/approvals" className={activeClass}>Approvals</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/budget" className={activeClass}>Budget</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin" className={activeClass}>Admin</NavLink>
          </li>
        </ul>

        {/* User Profile & Logout */}
        <div className="navbar-user">
          <div className="user-info">
            <User size={20} />
            <span>{user ? user.name : 'Guest'}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;