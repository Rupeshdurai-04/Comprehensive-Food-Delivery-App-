import React from 'react'
import Navbar from './components/navbar/Navbar.jsx'
import SideBar from './components/sidebar/SideBar.jsx'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/add/Add.jsx'
import List from './pages/list/List.jsx'
import Order from './pages/order/Order.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = 'http://localhost:4000'
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/list' element={<List url={url}/>}></Route>
          <Route path='/orders' element={<Order url={url}/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App