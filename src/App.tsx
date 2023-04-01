import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignIn from './components/SignIn/SignIn'
import HomePage from './components/Home/HomePage'
import UserDashboard from './components/UserDashboard/UserDashboard'
import BookDetail from './components/BookDetail/BookDetail'
import UserCart from './components/UserCart/UserCart'
import Dashboard from './components/AdminPanel/Dashboard'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/admin-panel" element={<Dashboard />} />
          <Route path="/user-cart" element={<UserCart />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
