import React, { useState } from 'react'
import './home.css'
import Header from '../../Components/header/Header.jsx'
import ExploreMenu from '../../Components/exploremenu/ExploreMenu.jsx'
import FoodDisplay from '../../Components/fooddisplay/FoodDisplay.jsx'
import AppDownload from '../../Components/appdownload/AppDownload.jsx'
const Home = () => {
  const [category,setCategory]=useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
