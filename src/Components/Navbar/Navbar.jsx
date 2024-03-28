import React, { useContext } from 'react'
import './Navbar.module.css'
import logo from './../../assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';


export default function Navbar() {
  let navigate = useNavigate();
  const { userToken, setUserToken } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);
  const {WishlistCount} = useContext(WishlistContext)
  
  

  function Logout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }
  return (
    <>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid px-5">
    <Link className="navbar-brand" to={''}>
      <img src={logo} className="w-100" alt="" />
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userToken && (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to={''} className="nav-link fw-bold">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'cart'} className="nav-link fw-bold">
              Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'wishlist'} className="nav-link fw-bold">
              Wishlist
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'categories'} className="nav-link fw-bold">
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'brands'} className="nav-link fw-bold">
              Brands
            </Link>
          </li>
        </ul>
      )}
      {userToken && (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <div className="socialMedia">
            <Link to={'cart'} className='fa-solid mx-2 cursor-pointer fa-cart-shopping position-relative'>
              <span className="badge bg-main rounded-pill position-absolute top-0 start-100 translate-middle smaller-badge">
                {numOfCartItems}
              </span>
            </Link>
            <Link to={'wishlist'} className='fa-solid mx-2 cursor-pointer fa-heart position-relative'>
              <span className="badge bg-main rounded-pill position-absolute top-0 start-100 translate-middle smaller-badge">
                {WishlistCount}
              </span>
            </Link>
            <i className="fab mx-2 fa-instagram cursor-pointer"></i>
            <i className="fab mx-2 fa-facebook cursor-pointer"></i>
            <i className="fab mx-2 fa-tiktok cursor-pointer"></i>
            <i className="fab mx-2 fa-twitter cursor-pointer"></i>
            <i className="fab mx-2 fa-linkedin cursor-pointer"></i>
            <i className="fab mx-2 fa-youtube cursor-pointer"></i>
          </div>
          <li className="nav-item">
            <span onClick={() => { Logout(); }} className="nav-link cursor-pointer fw-bold">
              Logout
            </span>
          </li>
        </ul>
      )}
      {!userToken && (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li className="nav-item">
            <Link to={"register"} className="nav-link fw-bold">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"login"} className="nav-link fw-bold">
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  </div>
</nav>

    </>
  )
}
