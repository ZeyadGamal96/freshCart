import React, { useContext, useEffect, useState } from 'react'
import './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import EmptyCart from '../../assets/images/empty-cart.png'
import { Helmet } from 'react-helmet';
import Loader from '../../Components/Loader/Loader';
import { Link } from 'react-router-dom';


export default function Cart() {
  const { getLoggedCart, removeProductCart, updateCartQuantity, setNumOfCartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [loading, setLoading] = useState(true);


  async function getCart() {

    const { data } = await getLoggedCart();
    setProducts(data?.data.products);
    setCartPrice(data?.data.totalCartPrice);
    setCartItemsNumber(data?.numOfCartItems);
    setNumOfCartItems(data?.numOfCartItems);
    setLoading(false);
  }


  async function removeCart(id) {
    const { data } = await removeProductCart(id);
    setProducts(data?.data.products);
    setCartPrice(data?.data.totalCartPrice);
    setNumOfCartItems(data?.numOfCartItems);
    setCartItemsNumber(data?.numOfCartItems);
    setLoading(false);
  }


  async function CartQuantity(id, count) {
    const { data } = await updateCartQuantity(id, count);
    setCartPrice(data?.data.totalCartPrice);
    setProducts(data?.data.products);
    setNumOfCartItems(data?.numOfCartItems);
    setCartItemsNumber(data?.numOfCartItems);
    setLoading(false);
  }

  useEffect(() => {
    getCart();
  }, []);

 

  if (loading) {
    return <Loader />
  }

  return (
    <div className='container bg-main-light p-4 min-vh-100'>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className='d-flex align-items-center justify-content-between'>
        <h2 className='h1'>Shop Cart:</h2>
      </div>

      <div className='d-flex justify-content-between'>
        <span className='text-main'>Total Price: <span className='text-black'>{cartPrice} EGP</span></span>
        <span className='text-main'>Total Cart Items: <span className='text-black'>{cartItemsNumber}</span></span>
      </div>
      {(products?.length === null  ) ? (
        <div className='d-flex justify-content-center'>
          <img src={EmptyCart} alt='emptyCart' className='w-50 text-center' />
        </div>
      ) : (
        products?.map((product) => (
          <div className="row border-top p-4 m-1 align-items-center" key={product._id}>
            <div className="col-md-1">
              <img src={product.product.imageCover} className='w-100' alt="product_img" />
            </div>
            <div className="col-md-11">
              <div className="d-flex justify-content-between">
                <div className="col-md-9">
                  <h4>{product.product.title}</h4>
                  <h6 className='text-main my-3'>Price: <span className='text-black'>{product.price} EGP</span> </h6>
                  <h6 className='cursor-pointer' onClick={() => { removeCart(product.product._id) }}>
                    <i className='fa-solid fa-trash-can text-danger'></i> Remove
                  </h6>
                </div>
                <div className="col-md-3 text-end pt-4">
                  <button className='btn btn-outline-main fw-bold' onClick={() => { CartQuantity(product.product._id, product.count + 1) }}>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button className='btn btn-outline-main fw-bold' onClick={() => { CartQuantity(product.product._id, product.count - 1) }} disabled={product.count === 1 ? 'disabled' : false}>-</button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {(products?.length === 0) ? ('') : (<Link to={'/checkout'} className='btn bg-main w-100 text-white'>Checkout</Link>)}
    </div>
  )
}
