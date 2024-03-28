import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import './CategorySlider.module.css';

export default function CategorySlider() {
  const { data, isLoading, isError } = useQuery('CategorySlider', getCategorySlider);

  function getCategorySlider() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(response => response.data.data)
      .catch(error => {
        throw new Error('Unable to fetch categories');
      });
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div className="row">
      <div className="col-md-12">
        <Slider className='my-5' {...settings}>
          {data.map(categorySlider => (
            <div key={categorySlider.id} className="px-2">
              <img src={categorySlider.image} className='w-100' height={300} alt="category" />
              <h4 className='text-center'>{categorySlider.name}</h4>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
