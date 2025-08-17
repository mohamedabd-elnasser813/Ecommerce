import React, { useContext, useEffect, useState } from 'react';
import CardContext, { usecardContext } from '../../Context/CardContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const {
    getCard,
    numOfCartItems,
    totalCartPrice,
    productCart,
    setTotalCartPrice,
    setProductCart,
    setNumOfCartItems,
    deleteItems,
    updateCart,
    setCartId,
    setIsCardOwner,
    setIsCardCounter,
    getWishList,
    setIsWishList,

  } = useContext(usecardContext);

  let token = localStorage.getItem("token")
  // Get Cart
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: getCard,
  });

  const { data: y } = useQuery({
    queryKey: ["count of WishList"],
    queryFn: getWishList,
  });

  useEffect(() => {
    if (data?.data?.data) {
      setTotalCartPrice(data.data.data.totalCartPrice);
      setNumOfCartItems(data.data.numOfCartItems);
      setIsCardCounter(data.data.numOfCartItems);
      setProductCart(data.data.data.products);
      setCartId(data.data.cartId);
      setIsCardOwner(data.data.data.cartOwner);
      localStorage.setItem("cartOwner", data.data.data.cartOwner);
    }
  }, [data]);

  useEffect(() => {
    setIsWishList(y?.data?.count);
  }, [y]);



  if (isError) {
    return <p>Error</p>;
  }


  // update to cart
  async function addItemsInCart(id, count) {
    let flag = await updateCart(id, count)

    if (flag) {
      toast.success("Done")
    }
  }

  function clearAll() {
    axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token } })
      .then((res) => {
        setProductCart(null)
        setTotalCartPrice(0)
        setNumOfCartItems(0)


      }).catch((error) => {
        <p className="text-3xl dark:text-white">Error in Server</p>;
      });
  }


  return (
    <>
      {isLoading ? <div className="loader ">
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


        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg py-20 min-h-screen bg-gray-100 dark:bg-gray-900">
          {/* العنوان */}
          <div className="py-4 mb-4 text-center text-lg font-bold text-blue-900 rounded-lg bg-blue-100 dark:bg-gray-800 dark:text-white shadow-md">
            <span>Total Price : {totalCartPrice} EGP</span> |
            <span> Number of Cart Items : {numOfCartItems}</span>
          </div>

          {/* الجدول */}
          <table className="w-full text-sm text-left text-gray-900 dark:text-gray-300 shadow-md rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-16 py-3">Image</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {productCart?.map((product) => (
                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-200">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-20 h-20 object-cover rounded-lg shadow-sm" alt={product.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold">{product.product.title}</td>
                  <td className="px-6 py-4 flex items-center">
                    {/* زر تقليل الكمية */}
                    <button onClick={() => addItemsInCart(product.product._id, product.count - 1)}
                      className="p-1 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-200">
                      <i className="fas fa-minus"></i>
                    </button>

                    {/* حقل العدد */}
                    <input type="tel" value={product.count}
                      className="mx-3 w-12 text-center border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200"
                      readOnly />

                    {/* زر زيادة الكمية */}
                    <button onClick={() => addItemsInCart(product.product._id, product.count + 1)}
                      className="p-1 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-200">
                      <i className="fas fa-plus"></i>
                    </button>
                  </td>
                  <td className="px-6 py-4 font-semibold">{product.price * product.count} EGP</td>
                  <td className="px-6 py-4">
                    {/* زر الحذف */}
                    <button onClick={() => deleteItems(product.product._id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 transition duration-200">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* أزرار العمليات */}
          <div className="flex justify-center items-center mt-5">
            <Link to="/Payment" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200">
              Go To Checkout
            </Link>
            <button onClick={clearAll} className="bg-red-600 text-white px-6 py-3 rounded-lg shadow ml-3 hover:bg-red-700 dark:hover:bg-red-500 transition duration-200">
              Clear All
            </button>
          </div>
        </div>


      }
    </>
  );
}
