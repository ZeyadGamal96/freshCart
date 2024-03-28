import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(null);
  const [cartID, setCartID] = useState(null);


  function addProductToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        { headers: { token: localStorage.getItem("userToken") } }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function removeProductCart(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function updateCartQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers: { token: localStorage.getItem("userToken") } }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function userPayment(shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=https://ZeyadGamal96.github.io/freshCart`,
        { shippingAddress },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

 

  async function cartCounter() {
    const { data } = await getLoggedCart();
    setNumOfCartItems(data?.numOfCartItems);
    setCartID(data?.data._id)
  }

  useEffect(() => {
    cartCounter();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedCart,
        removeProductCart,
        updateCartQuantity,
        numOfCartItems,
        setNumOfCartItems,
        userPayment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
