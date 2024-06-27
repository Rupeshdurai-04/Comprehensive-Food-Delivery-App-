import React, { useState } from 'react'
import Navbar from './Components/navbar/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Cart from './Pages/cart/Cart.jsx'
import Placeorder from './Pages/Placeorder/Placeorder.jsx'
import Footer from './Components/footer/Footer.jsx'
import LoginPopUp from './Components/loginpopup/LoginPopUp.jsx'
import Verify from './Pages/Verify/Verify.jsx'
import Myorders from './Pages/MyOrders/Myorders.jsx'
const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='App'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/order' element={<Placeorder/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
        <Route path='/myorders'element={<Myorders/>}></Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App