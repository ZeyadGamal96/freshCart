import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export function WishlistContextProvider(props) {
  const [WishlistProducts, setWishlistProducts] = useState([]);
  const [WishlistCount,setWishlistCount] = useState(0);
  

  async function addProductToWishlist(id) {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
         productId: id 
        }, {
           headers: { token: localStorage.getItem("userToken") } 
          });
          getLoggedWishlist();
          return data
    } catch (error) {
      console.log(error);
    }
  }


  async function getLoggedWishlist() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
           headers: { token: localStorage.getItem("userToken") } 
          });
          setWishlistProducts(data?.data);
          setWishlistCount(data?.count)
          return data
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductWishlist(id) {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
           headers: { token: localStorage.getItem("userToken") } 
          });
          getLoggedWishlist();
          return data
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLoggedWishlist()
  }, [])
  


  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getLoggedWishlist,
        removeProductWishlist,
        WishlistProducts,
        setWishlistProducts,
        WishlistCount,
        setWishlistCount,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
