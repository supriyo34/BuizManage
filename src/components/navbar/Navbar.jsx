import React, { useState } from 'react';
import './Navbar.css';
import { Menu, X, LogOut, User } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
            <a href="/dashboard" className="nav-link">Dashboard</a>
          </li>
          <li className="nav-item">
            <a href="/expenses" className="nav-link">My Expenses</a>
          </li>
          <li className="nav-item">
            <a href="/approvals" className="nav-link">Approvals</a>
          </li>
          <li className="nav-item">
            <a href="/budget" className="nav-link">Budget</a>
          </li>
          <li className="nav-item">
            <a href="/admin" className="nav-link">Admin</a>
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