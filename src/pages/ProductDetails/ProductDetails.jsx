import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Loader from '../../Components/Loader/Loader';


export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const [Loading, setLoading] = useState(true);
  let { id } = useParams();

  const { addProductToCart, setNumOfCartItems } = useContext(CartContext);
  async function addProduct(id) {
    let { data } = await addProductToCart(id);
    if (data.status === 'success') {
      toast.success(data.message, {
        position: 'bottom-right',
        duration: 4000,
      });
    }
    setNumOfCartItems(data.numOfCartItems)
  }

  useEffect(() => {
    async function getProductDetails() {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setDetails(data.data);
      setLoading(false);
    }
    getProductDetails();
  }, []);


  const images = details.images ? details.images?.map(image => ({
    original: image,
    thumbnail: image
  })) : [];

  if (Loading) {
    return <Loader/>
  }
  return (
    <div className="container">
      <Helmet>
        <title>{details.title}</title>
      </Helmet>
      <div className="row align-items-center mt-5">
        <div className="col-md-3">
          <ImageGallery items={images} autoPlay={true} showNav={false} showFullscreenButton={false} showPlayButton={false} />
        </div>
        <div className="col-md-9">
          <h2 className='fw-bold'>{details.title}</h2>
          <p className='fw-bold text-secondary'>{details.description}</p>
          <p className='fw-bold mt-4'>{details.category?.name}</p>
          <div className='d-flex justify-content-between my-3'>
            <p className='fw-bold'>{details.price} EPG</p>
            <span><i className='fa-solid fa-star rating-color'></i> {details.ratingsAverage}</span>
          </div>
          <button className='btn bg-main w-100 text-white' onClick={() => { addProduct(details.id) }}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}
