import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import Register from './Pages/Register/Register'
import Products from './Pages/Products/Products'
import { ResetPass } from './Pages/ResetPass/ResetPass'

const App = () => {
    return (
        <div className='container'>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/Products' element={<Products />} />
                    <Route path='/ResetPass/:token' element={<ResetPass />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
