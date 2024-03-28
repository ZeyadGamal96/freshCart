import React, { useContext, useEffect, useState } from 'react';
import './Wishlist.module.css';
import { WishlistContext } from '../../Context/WishlistContext';
import EmptyCart from '../../assets/images/empty-WISHLIST.png';
import { Helmet } from 'react-helmet';
import Loader from '../../Components/Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function Wishlist() {
  const { getLoggedWishlist, removeProductWishlist } = useContext(WishlistContext);
  const { addProductToCart , setNumOfCartItems } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);




  async function getWishlist() {
    const  data  = await getLoggedWishlist();
    setWishlist(data.data);
    setLoading(false);
  }


  async function removeProductW(id) {
    const data = await removeProductWishlist(id);
    getWishlist()
    console.log(data);
  }


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

  useEffect(() => {
   getWishlist();
  }, [])
  



  if (loading) {
    return <Loader />;
  }

  return (
    <div className='container bg-main-light p-4 min-vh-100'>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <h2 className='h1'>Wishlist:</h2>
      {wishlist.length === 0 ? (
        <div className='d-flex justify-content-center'>
          <img src={EmptyCart} alt='emptyCart' className='w-50 text-center' />
        </div>
      ) : (
        wishlist.map((wishlistItem) => (
          <div className="row border-top p-4 m-1 align-items-center" key={wishlistItem._id}>
            <div className="col-md-1">
              <img src={wishlistItem.imageCover} className='w-100' alt="product_img" />
            </div>
            <div className="col-md-11">
              <div className="d-flex justify-content-between">
                <div className="col-md-9">
                  <h4>{wishlistItem.title}</h4>
                  <h6 className='text-main my-3'>Price: <span className='text-black'>{wishlistItem.price} EGP</span> </h6>
                  <h6 className='cursor-pointer' onClick={() => { removeProductW(wishlistItem._id) }}>
                    <i className='fa-solid fa-trash-can text-danger'></i> Remove
                  </h6>
                </div>
                <div className="col-md-3 text-end pt-4">
                <button className='btn btn-outline-main fw-bold' onClick={() => addProduct(wishlistItem._id)}>ADD TO CART</button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
