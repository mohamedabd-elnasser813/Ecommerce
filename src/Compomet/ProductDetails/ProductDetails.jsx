import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css/";
import axios from "axios";
import { Link, NavLink, useParams } from "react-router-dom";
import Products from "../Products/Products";
import { usecardContext } from "../../Context/CardContext";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Slider from "react-slick";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [details, setDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isImage, setIsImage] = useState(null);

  // Render counter of wish list
  const {
    getWishList,
    setIsWishList,
    getCard,
    setIsCardCounter,
    addToCart,
    addToWishlist,
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

  const { data: x } = useQuery({
    queryKey: ["number of cart"],
    queryFn: getCard,
  });
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

  function getApiDetalis(id) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setDetails(res.data.data);
        setIsImage(res.data.data.images);
        setLoading(false);
      })
      .catch((error) => {
        <p className="text-3xl dark:text-white">Error in Server</p>;
      });
  }

  function getApiRelatedProduct(category) {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        let result = res.data.data.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(result);
      })
      .catch();
  }

  useEffect(() => {
    getApiDetalis(id);
    getApiRelatedProduct(category);
  }, [id, category]);

  //Toast Wishliat
  const [wishlistStatus, setWishlistStatus] = useState({});
  async function handleWishList(id) {
    let flag = await addToWishlist(id);
    setWishlistStatus((prev) => {
      return { ...prev, [id]: true }
    })
    if (flag) {
      toast.success("Product add Success to WishList");
    } else {
      toast.error("Product add failed");
    }
  }


  const settings = {
    customPaging: function (index) {
      return (
        <NavLink>
          <img src={isImage[index]} alt={`img ${index + 1}`} />
        </NavLink>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-active",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  const settingsRelated = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <>
      <div className="min-h-screen pt-16 bg-white dark:bg-slate-950 text-black dark:text-white">
        {loading ? (
          <>
            <div className="loader">
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
            </div>
            ;
          </>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700 container mx-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-wrap -mx-4">
                {/* Product Images */}
                <div className="w-full text-center md:w-1/2 px-4 mb-8">
                  <div className="slider-container">
                    <Slider
                      {...settings}
                      className="lg:w-[70%] mx-auto md:w-full"
                    >
                      {isImage?.map((image, index) => {
                        return (
                          <div key={index} className="mb-3">
                            <img
                              src={image}
                              className="mx-auto object-cover"
                              alt={`img ${index + 1}`}
                            />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
                {/* Product Details? */}
                <div className="w-full md:w-1/2 px-4 space-y-10">
                  <h2 className="text-3xl font-bold mb-2">{details?.title}</h2>
                  <p className="text-gray-600 mb-4">SOLD: {details?.sold}</p>
                  {details?.priceAfterDiscount ? (
                    <div className="mb-4">
                      <span className="text-2xl font-bold mr-2">
                        {details?.priceAfterDiscount} EGP
                      </span>
                      <span className="text-gray-500 line-through">
                        {" "}
                        {details?.price}EGP
                      </span>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-2xl font-bold mr-2">
                        {details?.price} EGP
                      </span>
                    </div>
                  )}

                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${index < details?.ratingsAverage
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

                    <span className="ml-2 text-gray-600">
                      {details?.ratingsAverage}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{details?.description}</p>

                  <div className="flex space-x-4 mb-6">
                    <button
                      onClick={() => {
                        addProductCart(id);
                      }}
                      className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {isLoadingButton[details?.id] ? (
                        <i
                          class="fa-solid fa-spinner fa-spin"
                          aria-hidden="true"
                        ></i>
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
                        handleWishList(details?.id);
                      }}
                      className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <i
                        className={`mx-1 ${wishlistStatus[details?.id]
                            ? "fa-solid fa-heart text-red-500"
                            : "fa-regular fa-heart"
                          }`}
                      ></i>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="me-2">
          <i className="fas fa-star text-yellow-300 me-2"></i>
          <span>{details?.ratingsAverage}</span>
        </div>
      ) : (
        <>
          <div className="container mx-auto">
            <h1 className="dark:text-white text-center text-3xl mt-3">Related Product</h1>
            <Slider {...settingsRelated} className="container mx-aut">
              {relatedProducts?.map((product, index) => (
                <div className="grid gap-3 container mx-auto py-6  dark:text-white">
                  <>
                    <div
                      key={product.id}
                      className="shadow relative group overflow-hidden p-3"
                    >
                      <Link
                        to={`/ProductDetails/${product.id}/${product.category.name}`}
                      >
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
                                  className={`w-4 h-4 ${index < product.ratingsAverage
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
                          <div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {product.priceAfterDiscount ? (
                                <>
                                  <div className="flex items-center">
                                    <span className="line-through">
                                      {product.price} EGP
                                    </span>
                                    <span className="text-yellow-400 ml-2">
                                      {product.priceAfterDiscount} EGP
                                    </span>
                                  </div>
                                  <span className="bg-yellow-400 rounded-lg absolute p-2 top-0 right-0">
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
                          disabled={isLoadingButton[product.id]}
                          onClick={() => {
                            addProductCart(product.id);
                          }}
                          type="button"
                          className="p-2 my-2 text-white text-[12px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          {isLoadingButton[product.id] ? (
                            <i
                              class="fa-solid fa-spinner fa-spin"
                              aria-hidden="true"
                            ></i>
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
                            handleWishList(product.id);
                          }}
                          type="button"
                          className="p-2 my-2 text-white text-[12px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <i
                            className={`mx-1 ${wishlistStatus[product.id]
                                ? "fa-solid fa-heart text-red-500"
                                : "fa-regular fa-heart"
                              }`}
                          ></i>
                          Add to WishList
                        </button>
                      </div>
                    </div>
                  </>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </>
  );
}
