import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdFavorite} from 'react-icons/md'
import '../Navbar/style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { adProductToFavorite } from '../../redux/Slice/SliceFavorite'

const Navbar = () => {
  const {products} = useSelector((state)=> state.favorites)
  
  console.log(products.length);
  return (
    <div className='navbar'>
   
      <div className='navabr_left'><Link to={'/'}><img src="https://pbs.twimg.com/profile_images/447942046255312898/DDqtgQZ1_400x400.jpeg" alt="Logo" /></Link></div>

      <div className='navbar_right'>
      <Link to={'/'}><span><AiFillHome/></span><span>HOME</span></Link>
      <Link to={'/favorite'}><span><MdFavorite/></span><div className='fav'>FAVORITE <div className='fav_count'>{products.length}</div></div></Link>
      </div>
   
    </div>
  )
}

export default Navbar