import React, { useEffect, useState } from 'react'
import './FeaturedProduct.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import ProductItem from '../ProductItem/ProductItem'

export default function FeaturedProduct() {

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  const { data } = useQuery('FeatureProduct', getProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    setSearchList(data?.data.data.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm])

  useEffect(() => {
    if (data) {
      setSearchList(data.data.data);
    }
  }, [data]);



  return (
    <div>
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)} className='form-control mb-4' placeholder='Search for product here' />
      <div className='row gy-4'>
        {searchList?.map((product) => <ProductItem product={product} />)}
      </div>
    </div>

  );
}
