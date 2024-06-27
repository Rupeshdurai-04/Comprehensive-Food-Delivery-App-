import React, { useContext, useEffect } from 'react'
import './fooddisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../fooditem/FoodItem'
const FoodDisplay = ({category}) => {
    const{food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
<div className="food-display-list">
    {food_list.map((item,idx)=>{
      {console.log(item.category,category);}
      if(category === 'All' || category === item.category){
        return <FoodItem key={idx} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
      }
    })}
</div>
    </div>
  )
}

export default FoodDisplay
