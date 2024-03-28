import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../../Components/Loader/Loader';
import { Helmet } from 'react-helmet';

export default function Categories() {
  const { data, isError } = useQuery('Categories', getCategories);
  const {  isLoading } = useQuery('loading');
  


  async function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(response => response.data.data)
      .catch(error => {
        throw new Error('Unable to fetch categories');
      });
  }




  if (isError) return <p>Error fetching data</p>;

  if (isLoading) {
    return <Loader/>
  }
  return (
    <div className="container p-5">
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="row">
        {data.map(category => (
          <div key={category.id} className="col-md-2 product position-relative m-3">
            <img src={category.image} className="w-100" height={300} alt="category" />
            <h6 className="text-main text-center py-2">{category.name}</h6>
          </div>
        ))}
      </div>
    </div>

  );
}
