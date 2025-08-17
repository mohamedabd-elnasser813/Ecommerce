import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let usecardContext = createContext();

export default function CardContext({ children }) {
  const [isLoadingButton, setIsLoadingButton] = useState({});
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [productCart, setProductCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [cartOwner , setIsCardOwner] = useState(localStorage.getItem("cartOwner"))
  const [cartCounter , setIsCardCounter] = useState()
  const [wishList, setIsWishList] = useState();
  const [queryData , setQueryData] = useState("")
  const [searchResult , setSearchResult] = useState([])
 
  let token = localStorage.getItem("token");



  // Add to card
  async function addToCart(productId) {
    setIsLoadingButton((prev) => ({ ...prev, [productId]: true }));
    return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      { headers: { token } }
    )
    .then((res) => {
      setIsLoadingButton((prev) => ({ ...prev, [productId]: false }));
      setIsCardCounter(res?.data?.numOfCartItems);
      return true;
    })
    .catch((error) => {
      setIsLoadingButton((prev) => ({ ...prev, [productId]: false }));
      return false;
    });
  }
  
  //get user card
  function getCard() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token },
    });
  }

  //Delete Items
   function deleteItems(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token },
      })
      .then((res) => {
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
        setIsCardCounter(res.data.numOfCartItems);
        setProductCart(res.data.data.products);
      })
      .catch((error) => {
        <p className="text-4xl">Errrrrrrrrrror</p>
      });
  }

  //Update Cart
 async function updateCart(id, count) {
  
   return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers: { token },
        }
      )
      .then((res) => {
        
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
        setIsCardCounter(res.data.numOfCartItems);
        setProductCart(res.data.data.products);
        return true
      })
      .catch((error) => {
        
        return false
      });
  }


  //add Wish List
 async function addToWishlist(productId) {
        setWishlistStatus((prev) => ({ ...prev, [productId]: false }));

   return  axios.post(
     "https://ecommerce.routemisr.com/api/v1/wishlist",
     {
        productId,
      },
      { headers: { token } }
    ).then((res)=>{
      setIsWishList(res.data.data.length);
      setWishlistStatus((prev) => ({ ...prev, [productId]: true })); 
     return true
    }).catch((error)=>{
     console.log(error);
     setWishlistStatus((prev) => ({ ...prev, [productId]: false }));
     return false

    });
  }

  //getWishList
   function getWishList() {
     return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
       headers: { token },
     });
   }

  return (
    <usecardContext.Provider
      value={{
        addToCart,
        getCard,
        //////
        numOfCartItems,
        totalCartPrice,
        productCart,
        setTotalCartPrice,
        setNumOfCartItems,
        setProductCart,
        ///////
        deleteItems,
        updateCart,
        /////////
        cartId,
        setCartId,
        isLoadingButton,
        setIsLoadingButton,
        ////////
        setIsCardOwner,
        cartOwner,
        ////////
        setIsCardCounter,
        cartCounter,
        ////////////
        addToWishlist,
        getWishList,
        //////////////
        wishList,
        setIsWishList,
        //////////////
        wishlistStatus,
        /////////////
        setQueryData,
        queryData,
        setSearchResult,
        searchResult,
        
      }}
    >
      {children}
    </usecardContext.Provider>
  );
}
