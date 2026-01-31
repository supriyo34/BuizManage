import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Approvals from './pages/Approvals';
import Budget from './pages/Budget';
import Admin from './pages/Admin';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({ name: 'John Doe' });
  const handleLogout = () => { setUser(null); alert('Logged out successfully!'); };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;