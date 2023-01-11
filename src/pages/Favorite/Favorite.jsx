import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromFavorite,removeAllProducts } from '../../redux/Slice/SliceFavorite'
import '../Favorite/style.scss'

const Favorite = () => {
  const {products} = useSelector((state)=> state.favorites)
  
  console.log(products.length);
  const dispatch = useDispatch()
  return (
    <div className='favorite_body'>
    {/* <img src="https://media2.giphy.com/media/jtoTdx6Wf1rPUvCmnd/giphy.gif?cid=ecf05e47yom7kuo32ib7qtndmuo0om0licqf434p909zgt5q&rid=giphy.gif&ct=g" alt="" /> */}
      <div  className='favorite_container'>
        <button onClick={()=> dispatch(removeAllProducts())} className='emptyBtn'>Empty</button>
        {
          
          products.length===0?(<div className='empy_message'><p>Your Favorite in currently empt!</p><Link to={'/'}><button className='shoppingBtn'>Go Shopping</button></Link></div>):(products && products.map((item)=>(
            <div className='products'>
             <div className="products_image"><img src={item.image} alt="" /></div>
             <div className="products_name">{item.name}</div>
             <div className="products_price">${item.current_price}</div>
             <button onClick={()=>dispatch(removeFromFavorite(item.id))} className='deleteBtn'>Delete</button>
            </div>
           )))
          }
      
        
      
       </div>
    </div>
  )
}

export default Favorite