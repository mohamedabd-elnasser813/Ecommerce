import React, { useContext, useEffect, useState } from 'react'
import { usecardContext } from '../../Context/CardContext'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function WishList() {
    let token = localStorage.getItem("token")
    const {
      getWishList,
      setIsWishList,
      getCard,
      setIsCardCounter,
      addToCart,
      isLoadingButton,
    } = useContext(usecardContext);
      const {
        data,
        isLoading,
        isError,
        refetch: refetchWishList,
      } = useQuery({
        queryKey: ["count of WishList"],
        queryFn: getWishList,
      });
      
      
      const { data:x } = useQuery({
          queryKey: ["number of cart"],
          queryFn: getCard,
        });
        
        //Remove wishList
        function removeFromWishList(id) {
            axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:{token}}
            ).then((res)=>{
                setIsWishList(res.data.data.length);
                refetchWishList();
                toast.success("Remove Done")
            }).catch((error)=>{
                <p className="text-3xl dark:text-white">Error in Server</p>;
                toast.error("Remove Failed")
            });
        }
        
        useEffect(() => {
          if (x?.data?.numOfCartItems) {
            setIsCardCounter(x.data.numOfCartItems);
          }
          if (data?.data?.count) {
            setIsWishList(data.data.count);
          }
        }, [x?.data?.numOfCartItems, data?.data?.count]);

        
         async function addProductCart(id) {
           let flag = await addToCart(id);
           if (flag) {
             toast.success("Product add Success to Cart");
           } else {
             toast.error("Product add failed");
           }
         }




  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white grid gap-3 container mx-auto py-20 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {data?.data?.data.map((product) => (
        <div
          key={product.id}
          className="w-full relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
            <div>
              <img
                className="p-5 rounded-t-lg"
                src={product.imageCover}
                alt={product.title}
              />
            </div>
            <div className="px-5 pb-5 h-[120px]">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.title.split(" ", 2).join(" ")}
              </h5>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < product.ratingsAverage
                          ? "text-yellow-300"
                          : "text-gray-200 dark:text-gray-600"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {product.ratingsAverage}
                </span>
              </div>
              <div className>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {product.priceAfterDiscount ? (
                    <>
                      <div className="flex  items-center ">
                        <span className="line-through">
                          {product.price} EGP
                        </span>
                        <span className="text-yellow-400 ml-2">
                          {product.priceAfterDiscount} EGP
                        </span>
                      </div>
                      <span className="bg-yellow-400 rounded-lg absolute p-2  top-0 right-0">
                        Sale
                      </span>
                    </>
                  ) : (
                    <span>{product.price} EGP</span>
                  )}
                </span>
              </div>
            </div>
          </Link>

          {/* Buttons */}
          <div className="flex justify-evenly">
            <button
              onClick={() => {
                addProductCart(product.id);
                getCard;
              }}
              type="button"
              className="p-2 my-2 text-white text-[12px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg  text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoadingButton[product.id] ? (
                <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>

            <button
              onClick={() => {
                removeFromWishList(product.id);
                getWishList;
              }}
              type="button"
              className="p-2 my-2 text-white text-[13px] bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-lg  text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <svg
                className="w-3.5 h-3.5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
 