import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './Component/Login'
import Home from './Component/Home'

const App = () => {
  return (
    <div>
      <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>

          </Routes>
      </Router>
    </div>
  )
}

export default App