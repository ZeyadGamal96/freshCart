import React, { useContext  } from 'react'
import './ProductItem.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';

export default function ProductItem({ product }) {
  const { addProductToCart, setNumOfCartItems } = useContext(CartContext);
  const { addProductToWishlist } = useContext(WishlistContext);
 

  async function addProduct(id) {
    let { data } = await addProductToCart(id);
    if (data.status === 'success') {
      toast.success(data.message, {
        position: 'bottom-right',
        duration: 4000,
      });
      setNumOfCartItems(data.numOfCartItems)
    }
  }

  async function addWishlist(id) {
    const  data  = await addProductToWishlist(id);
    console.log(data);
    if (data.status === 'success') {
      toast.success(data.message, {
        position: 'bottom-right',
        duration: 4000,
      });
    }
  }
  

  return (
    <div className='col-md-2 product position-relative'>
      <Link to={`details/${product.id}`}>
        <img src={product.imageCover} className='w-100' alt="product" />
        <h6 className='text-main '>{product.category.name}</h6>
        <h2 className='h5'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
        <div className='d-flex justify-content-between my-3'>
          <span>{product.price} EPG</span>
          <span><i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage}</span>
        </div>
      </Link>
      <button className='btn bg-main w-100 mb-2 text-white' onClick={() => { addProduct(product.id) }}>ADD TO CART</button>
      <button className='btn bg-danger w-100 mb-2 text-white' onClick={() => { addWishlist(product.id) }}>ADD TO WISHLIST</button>
    </div>
  )
}

