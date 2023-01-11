import React, { useEffect, useState } from 'react'
import '../Home/style.scss'
import {FaSearchDollar} from 'react-icons/fa'
import {BiTrendingDown,BiTrendingUp} from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adProductToFavorite } from '../../redux/Slice/SliceFavorite'
import { getProducts } from '../../service/getProducts'
const Home = () => {
  const [data,setData] = useState()
  const {id} = useParams()
  const [inputVal,setinputVal] = useState('')
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
 
  const handleChange = (event)=>{
    setinputVal(event.target.value)
  }
  useEffect(()=>{
    getProducts().then((res)=>{
      if(res.status ===200){
        setData(res.data)
        setLoading(false)
      }
    })
  },[])
  return (
    <div className='home_body'>
      <div className='conatiner'>
        <div className='elements'>
        <div className="elements_top">
        <h1>Cyrpto Tracker Application</h1>
        <div className='search_body'>
          <input value={inputVal} onChange={handleChange} type="text" placeholder='Search by crypto name'/>
          <FaSearchDollar/>
        </div>
        </div>
        <div className="elements_body">
<table class="table">
  <thead>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col">Coin Name</th>
      <th scope="col">Price</th>
      <th scope="col">Price Change</th>
      <th scope="col">Market Cap</th>
      <th scope="col">Favorite</th>
      {/* <th scope="col">Detail</th> */}
    </tr>
  </thead>
  <tbody>
    {
      loading?(<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>):(
        data && data.filter((item)=>{
          if(inputVal ===''){
            return item
          }else if(item.name.toLowerCase().includes(inputVal.toLowerCase())){
            return item
          }
        })
        .map((item)=>{
          return(
            <tr key={item.id}> 
            <td scope="row">{item.market_cap_rank}</td>
  
            <td className='coinName'><div className='coinName-left'><img src={item.image} alt="" /></div><div className='coinName-right'><p>{item.name}</p></div></td>
  
            <td className='price'>${item.current_price}</td>
  
            <td>{item.market_cap_change_percentage_24h<=0? <div style={{color:'red'}}>{item.market_cap_change_percentage_24h}%<BiTrendingDown/></div>:<div style={{color:'green'}}>{item.market_cap_change_percentage_24h}%<BiTrendingUp/></div>}</td>
  
            <td className='marketCup'>${item.market_cap}</td>
  
            <td><button   onClick={()=>dispatch(adProductToFavorite(item))}   className='favoriteBtn'>Favorite</button></td>
            {/* <td><Link to={'/detail'}><button>Detail</button></Link></td> */}
        
          </tr>
          )
        })
      )
    }
   
    
  </tbody>
</table>
        </div>
        </div>
  
      </div>
    </div>
  )
}

export default Home