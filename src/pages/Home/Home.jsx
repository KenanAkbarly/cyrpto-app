import React, { useEffect, useState } from 'react'
import '../Home/style.scss'
import {FaSearchDollar} from 'react-icons/fa'
import {BiTrendingDown,BiTrendingUp} from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adProductToFavorite } from '../../redux/Slice/SliceFavorite'
import { getProducts } from '../../service/getProducts'
import ReactPaginate from 'react-paginate'
const Home = () => {
  const [data,setData] = useState()
  const {id} = useParams()
  const [inputVal,setinputVal] = useState('')
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  
  const [pageCount,setpageCount] = useState(0)
  const fetchComments = async(currenPage)=>{
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currenPage}&sparkline=false`);
    const data = await res.json();
    return data
  }
  const handleClick = async(data)=>{
    console.log(data.selected);

    let currenPage = data.selected + 1;
    
    const commnentsFormServer = await fetchComments(currenPage)
    setData(commnentsFormServer)
  }
  const handleChange = (event)=>{
    setinputVal(event.target.value)
  }
  
  useEffect(()=>{
    getProducts().then((res)=>{
      if(res.status ===200){
        setData(res.data)
        // const total = res.headers.get('x-total-count');
        // console.log('total number',total);
        // console.log(res.data.length);
        const total = res.data.length
        setpageCount(total/100)
        console.log(total);
        console.log(res.data);
        setLoading(false)
      }
    })
  },[])
  // console.log(data.length);
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
      loading?(<div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>):(
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
<ReactPaginate previousLabel={'previous'}
          nextLabel={'next'}
          // breakLabel={'...'}
          pageCount={39}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange = {handleClick}
          containerClassName={`pagination justify-content-center mt-3 `}
          pageClassName = {''}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
/>
        </div>
  
      </div>
    </div>
  )
}

export default Home