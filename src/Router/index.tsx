import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../Screens/Login'
import Home from '../Screens/Home'
import PrivateRoute from './PrivateRoutes'
import Test from '../Screens/Test'
import Queries from '../Screens/Queries'

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/Login" element={<Login />}></Route>
          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/Queries" element={<Queries />}></Route>
            <Route path="/Test" element={<Test />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
