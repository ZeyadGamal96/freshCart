import React from 'react'
import './MainSlider.module.css'
import Slider from 'react-slick'
import image_1 from '../../assets/images/slider-2.jpeg'
import image_2 from '../../assets/images/slider-image-1.jpeg'
import image_3 from '../../assets/images/slider-image-2.jpeg'
import image_4 from '../../assets/images/slider-image-3.jpeg'

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <div className='row mt-5 g-0'>
      <div className="col-md-9">
        <Slider {...settings}>
        <img src={image_1} height={400} className='w-100' alt="slideImage" />
        <img src={image_2} height={400} className='w-100' alt="slideImage" />
        <img src={image_3} height={400} className='w-100' alt="slideImage" />
        <img src={image_4} height={400} className='w-100' alt="slideImage" />

        </Slider>

      </div>
      <div className="col-md-3">
        <img src={image_2} height={200} className='w-100' alt="slideImage" />
        <img src={image_3} height={200} className='w-100' alt="slideImage" />
      </div>
    </div>
  )
}
