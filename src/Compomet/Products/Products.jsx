import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { usecardContext } from "../../Context/CardContext";
import toast from "react-hot-toast";
import Fuse from "fuse.js";

export default function Products() {
  const {
    addToCart,
    getCard,
    setIsCardCounter,
    addToWishlist,
    getWishList,
    setIsWishList,
    isLoadingButton,
    wishlistStatus,
    searchResult,
    setSearchResult,
    queryData,
  } = useContext(usecardContext);

  const options = {
    keys: ["title"],
    threshold: 0.3
  }

  // Get API product
  function getApiProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  // Get API product query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getApiProduct,
  });
  let searchData = data?.data?.data;

  useEffect(() => {
    if (searchData) {
      if (queryData) {
        const fuse = new Fuse(searchData, options);
        let result = fuse.search(queryData).map((res) => { return res.item });
        setSearchResult(result);
      }
      else if (queryData === "") {
        setSearchResult(searchData)
      }
    } else {
      setSearchResult([]);
    }

  }, [searchData, queryData])

  // Get card query
  const { data: x } = useQuery({
    queryKey: ["number of cart"],
    queryFn: getCard,
  });

  // Get wish list query
  const { data: y } = useQuery({
    queryKey: ["count of WishList"],
    queryFn: getWishList,
  });

  useEffect(() => {
    setIsCardCounter(x?.data?.numOfCartItems);
    setIsWishList(y?.data?.count);
    ;
  }, [x, y]);

  if (isError) {
    return <h2 className="py-24">Error in Server</h2>;
  }

  async function addProductCart(id) {

    const flag = await addToCart(id);
    if (flag) {
      toast.success("Product added successfully to Cart");

    } else {
      toast.error("Product add failed");
    }

  }

  async function handleWishList(id) {
    const flag = await addToWishlist(id);
    if (flag) {
      toast.success("Product added successfully to WishList");
    } else {
      toast.error("Product add failed");
    }
  }


  async function handleWishListCustom(id) {
    const flag = await addToWishlist(id);
    if (flag) {
      toast.success("Product added successfully to WishList");
    } else {
      toast.error("Product add failed");
    }
  }





  return (
    <>
      {isLoading ? <div className="loader">

        <div className="truckWrapper">
          <div className="truckBody">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 198 93"
              className="trucksvg"
            >
              <path
                strokeWidth={3}
                stroke="#282828"
                fill="#F83D3D"
                d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
              />
              <path
                strokeWidth={3}
                stroke="#282828"
                fill="#7D7C7C"
                d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
              />
              <path
                strokeWidth={2}
                stroke="#282828"
                fill="#282828"
                d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
              />
              <rect
                strokeWidth={2}
                stroke="#282828"
                fill="#FFFCAB"
                rx={1}
                height={7}
                width={5}
                y={63}
                x={187}
              />
              <rect
                strokeWidth={2}
                stroke="#282828"
                fill="#282828"
                rx={1}
                height={11}
                width={4}
                y={81}
                x={193}
              />
              <rect
                strokeWidth={3}
                stroke="#282828"
                fill="#DFDFDF"
                rx="2.5"
                height={90}
                width={121}
                y="1.5"
                x="6.5"
              />
              <rect
                strokeWidth={2}
                stroke="#282828"
                fill="#DFDFDF"
                rx={2}
                height={4}
                width={6}
                y={84}
                x={1}
              />
            </svg>
          </div>
          <div className="truckTires">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 30"
              className="tiresvg"
            >
              <circle
                strokeWidth={3}
                stroke="#282828"
                fill="#282828"
                r="13.5"
                cy={15}
                cx={15}
              />
              <circle fill="#DFDFDF" r={7} cy={15} cx={15} />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 30"
              className="tiresvg"
            >
              <circle
                strokeWidth={3}
                stroke="#282828"
                fill="#282828"
                r="13.5"
                cy={15}
                cx={15}
              />
              <circle fill="#DFDFDF" r={7} cy={15} cx={15} />
            </svg>
          </div>
          <div className="road" />
          <svg
            xmlSpace="preserve"
            viewBox="0 0 453.459 453.459"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            id="Capa_1"
            version="1.1"
            fill="#000000"
            className="lampPost"
          >
            <path
              d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
            />
          </svg>
        </div>

      </div> :




        <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white grid gap-5 container mx-auto py-20 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {searchResult.map((product) => (
            <div
              key={product.id}
              className="relative w-full max-w-sm mx-auto bg-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden group transition-all duration-500 hover:shadow-xl hover:border-blue-500 hover:scale-105"
            >
              <Link to={`/ProductDetails/${product.id}/${product.category?.name}`}>

                <div className="relative overflow-hidden rounded-lg">
                  <img
                    className="w-full transition-transform duration-500 group-hover:scale-110"
                    src={product.imageCover}
                    alt={`Image of ${product.title}`}
                  />

                  {product.priceAfterDiscount && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-white font-bold text-xs uppercase px-3 py-1 rounded-lg shadow-md">
                      Sale
                    </span>
                  )}
                </div>

                <div className="p-4 text-center bg-gray-100 dark:bg-gray-800">

                  <h5 className="text-lg font-semibold truncate text-gray-900 dark:text-gray-300">
                    {product.title}
                  </h5>

                  <div className="flex items-center justify-center mt-2 mb-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${index < product.ratingsAverage
                          ? "text-yellow-300"
                          : "text-gray-200 dark:text-gray-600"
                          }`}
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {product.ratingsAverage}
                    </span>
                  </div>

                  <div className="text-xl font-bold text-gray-900 dark:text-gray-300 mb-3">
                    {product.priceAfterDiscount ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="line-through text-gray-500">
                          {product.price} EGP
                        </span>
                        <span className="text-yellow-500">
                          {product.priceAfterDiscount} EGP
                        </span>
                      </div>
                    ) : (
                      <span>{product.price} EGP</span>
                    )}
                  </div>
                </div>
              </Link>

              {/* button */}
              <div className="flex justify-between gap-2 p-4 bg-gray-100 dark:bg-gray-900 rounded-b-lg">

                <button
                  disabled={isLoadingButton[product.id]}
                  onClick={() => addProductCart(product.id)}
                  className="flex-1 p-2 text-white bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                >
                  {isLoadingButton[product.id] ? (
                    <i className="fa-solid fa-spinner fa-spin text-lg"></i>
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-shopping text-lg"></i>
                      <span>Add</span>
                    </>
                  )}
                </button>


                {/* <button
                  onClick={() => handleWishList(product.id)}
                  className="flex-1 p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <i
                    className={`text-lg ${wishlistStatus[product.id]
                      ? "fa-solid fa-heart text-white animate-pulse"
                      : "fa-regular fa-heart"
                      }`}
                  ></i>
                </button> */}
                <button
                  onClick={() => handleWishListCustom(product.id)}
                  className="flex-1 p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <i
                    className={`text-lg ${wishlistStatus[product.id]
                      ? "fa-solid fa-heart text-white animate-pulse"
                      : "fa-regular fa-heart"
                      }`}
                  ></i>
                </button>

              </div>
            </div>
          ))}
        </div>

      }
    </>
  );
}
