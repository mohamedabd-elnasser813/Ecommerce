import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { usecardContext } from "../../Context/CardContext";
import { useQuery } from "@tanstack/react-query";

export default function AllOrder() {
  const { cartOwner , getWishList , setIsWishList} = useContext(usecardContext);
  const [userOrder, setUserOrder] = useState(null);

 async function getUser(cartOwner) {
     return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
      .then((res) => {
        setUserOrder(res.data);
      })
      .catch((error) => {
        <p className="dark:text-white">Error in Server</p>
      });
    }
    
    const { data: y , isLoading:loading} = useQuery({
     queryKey: ["count of WishList"],
     queryFn: getWishList,
   });
  

  useEffect(() => {
    if (cartOwner) {
      getUser(cartOwner);
      setIsWishList(y?.data?.count);
    }
  }, [y]);

  if (loading){
    return (
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
    );
  }
    return (
      <section className=" bg-white py-24 antialiased dark:bg-gray-900 ">
        <div className="min-h-screen flex flex-col">
          <div className="text-center">
            <h2 className="text-2xl font-semibold dark:text-white sm:text-3xl">
              My Orders
            </h2>
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg pt-10">
            <table className="w-full container mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td>
                    <th scope="col" className="px-6 py-3 text-center">
                      Product Img
                    </th>
                  </td>
                  <td>
                    <th scope="col" className="px-6 py-3 text-center">
                      Product Name
                    </th>
                  </td>
                  <td>
                    <th scope="col" className="px-6 py-3 text-center">
                      Brand
                    </th>
                  </td>
                  <td>
                    <th scope="col" className="px-6 py-3 text-center">
                      Category
                    </th>
                  </td>
                  <td>
                    <th scope="col" className="px-6 py-3 text-center">
                      Count
                    </th>
                  </td>
                  <td>
                    <th scope="col" className="px-10 py-3 text-center">
                      Price
                    </th>
                  </td>
                  <td>
                    <th scope="col" className="px-10 py-3 text-center">
                      Total Price
                    </th>
                  </td>
                  <td>
                    <th scope="col">Payment Method</th>
                  </td>
                  <td>
                    <th scope="col" className="ps-10 py-3 text-center">
                      Date
                    </th>
                  </td>
                </tr>
              </thead>
              <tbody>
                {userOrder?.map((items) => {
                  let x = new Date(items.createdAt);
                  let formData = `${x.getDate()}/${
                    x.getUTCMonth() + 1
                  }/${x.getFullYear()}`;

                  return items?.cartItems.map((item) => {
                    return (
                      <tr
                        key={items._id}
                        className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={item.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.product.title.split(" ", 2).join(" ")}
                        </th>
                        <td className="px-6 py-4 ">
                          {item.product.brand.name}
                        </td>
                        <td className="px-6 py-4">
                          {item.product.category.name}
                        </td>
                        <td className="px-10 py-4 font-bold capitalize">
                          {item.count}
                        </td>
                        <td className="px-6 py-4 font-extrabold">
                          {item.price} EGP
                        </td>
                        <td className="px-10 py-4 font-extrabold">
                          {item.price * item.count} EGP
                        </td>
                        <td className="px-10 py-4 font-bold capitalize">
                          {items.paymentMethodType}
                        </td>
                        <td className="p-4">{formData}</td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>

            {/* <nav
            className="my-6  flex justify-center sm:mt-8"
            aria-label="Page navigation example"
          >
            <ul className="flex h-8 items-center -space-x-px text-sm">
              <li>
                <NavLink
                  href="#"
                  className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-4 w-4 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m15 19-7-7 7-7"
                    />
                  </svg>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </NavLink>
              </li>

              <li>
                <NavLink
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="#"
                  className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-4 w-4 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </NavLink>
              </li>
            </ul>
          </nav> */}
          </div>
        </div>
      </section>
    );
}
