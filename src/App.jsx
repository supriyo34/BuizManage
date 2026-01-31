import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'

function App() {
  const [user, setUser] = useState({ name: 'John Doe' })

  const handleLogout = () => {
    setUser(null)
    alert('Logged out successfully!')
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main style={{ padding: '2rem', margin: 0 }}>
        <h1>Welcome to BuizManage</h1>
        <p>Expense & Budget Management System</p>
      </main>
    </>
  )
}

export default App