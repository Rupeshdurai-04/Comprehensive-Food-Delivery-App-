import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './list.css'
const List = ({url}) => {

  const[list,setList] = useState([]);

  const fetchList = async()=>{
      const res = await axios.get(`${url}/api/food/list`)
      if(res.data.success){
        setList(res.data.data)
      }else{
        toast.error("Error")
      }
  }

  const removeFood = async(foodId)=>{
    const res = await axios.post(`${url}/api/food/remove`,{_id:foodId})
    await fetchList();
    if(res.data.success){
      toast.success(res.data.message)
    }else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div className='list add flex-col'>
       <p>All Foods List</p>
       <div className="list-table">
        <div className="list-table-format title">
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
        </div>
        {list.map((item,idx)=>{
          return(
            <div key={idx} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
            </div>
          )
        })}
       </div>
    </div>
  )
}

export default List
