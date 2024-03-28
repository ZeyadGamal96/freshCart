import React from 'react';
import './Brands.module.css';
import Loader from '../../Components/Loader/Loader';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Brands() {
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { data, isLoading } = useQuery('Brands', getBrands);

  return (
    <div className='container py-5'>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className='row'>
        {isLoading ? (
          <Loader />
        ) : (
          data.data.data.map((brand) => (
            <div key={brand.id} className='col-md-2 product'>
              <div>
                <img src={brand.image} alt="brand" className='w-100' />
                <p className='text-main text-center fw-bold'>{brand.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
