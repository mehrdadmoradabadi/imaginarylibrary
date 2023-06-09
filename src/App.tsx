import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignIn from './components/SignIn/SignIn'
import HomePage from './components/Home/HomePage'
import UserDashboard from './components/UserDashboard/UserDashboard'
import BookDetail from './components/BookDetail/BookDetail'
import UserCart from './components/UserCart/UserCart'
import Dashboard from './components/AdminPanel/AdminDashboard'
import Layout from './components/Layout/Layout'
import AdminLayout from './components/Layout/AdminLayout'
import Category from './components/Category/Category'
import SignUp from './components/SignIn/SignUp'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/admin-panel"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <UserDashboard />
              </Layout>
            }
          />
          <Route
            path="/books/:id"
            element={
              <Layout>
                <BookDetail />
              </Layout>
            }
          />
          <Route
            path="/categories/:category"
            element={
              <Layout>
                <Category />
              </Layout>
            }
          />
          <Route
            path="/user-cart"
            element={
              <Layout>
                <UserCart />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
