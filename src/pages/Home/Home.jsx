import React from 'react'
import './Home.module.css'
import FeaturedProduct from '../../Components/FeaturedProduct/FeaturedProduct'
import MainSlider from '../../Components/MainSlider/MainSlider'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import Loader from '../../Components/Loader/Loader'


export default function Home() {
  const {  isLoading } = useQuery('loading');

  if (isLoading) {
    return <Loader/>
  }
  return (
    <div className='container py-5'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider/>
      <CategorySlider/>
      <FeaturedProduct />
      </div>
  )
}
