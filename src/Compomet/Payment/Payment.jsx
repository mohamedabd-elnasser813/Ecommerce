import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { usecardContext } from '../../Context/CardContext';
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useQuery } from '@tanstack/react-query';

export default function Payment() {
    let token = localStorage.getItem("token")
    let navgiate = useNavigate()
    const { cartId, setIsCardCounter, setIsWishList, getWishList, getCard } =
      useContext(usecardContext);

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



    //Loading
    const [isLoading , setIsLoading] = useState(false)
    const [isLoadingOnline , setIsLoadingOnline] = useState(false)
    //pay Cash 
   function handleCashPayment(apiObj) {
     setIsLoading(true);
     axios
       .post(
         `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
         { apiObj },
         { headers: { token } }
       )
       .then((res) => {
         setIsLoading(false);
          setIsCardCounter();
         toast.success("Pay Done");
         navgiate("/allorders");
         
       })
       .catch((error) => {
         setIsLoading(false);
         toast.error("Pay Error");
       });
   }

   //Online Cash
   function handleCashOnline(apiObj) {
      setIsLoadingOnline(true);
     axios
       .post(
         `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
         { apiObj },
         { headers: { token } }
       )
       .then((res) => {
         window.open(res.data.session.url,"_self");
         setIsLoadingOnline(false);
          setIsCardCounter();

       })
       .catch((error) => {
        <p className="text-3xl dark:text-white">Error in Server</p>;
         setIsLoadingOnline(false);
         toast.error("Pay Error");
       });
   }

   const [cash , setIsCash]= useState(false)
   function handelPayment(values){
    let apiObj = { shippingAddress: values };
    if (cash) {
        handleCashPayment(apiObj)
    }
    else{
        handleCashOnline(apiObj)
    } 
   }
    let validationSchema = Yup.object().shape({
      details: Yup.string().required("Enter a Details"),
      phone:Yup.string().matches(/^01[1250][0-9]{8}$/,"Phone is inValid , must be a Egyptian Number").required("Number is required"),
      city:Yup.string().required("Enter Your City")
    });
  let formikPayment = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handelPayment,
    validationSchema
  });


  return (
    <>
      <form
        className="container w-1/2 mx-auto min-h-screen "
        onSubmit={formikPayment.handleSubmit}
      >
        <div className="grid grid-cols-1 mx-auto overflow-hidden pt-40">
          {/* details Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="details"
              name="details"
              placeholder=" "
              onBlur={formikPayment.handleBlur}
              value={formikPayment.values.details}
              onChange={formikPayment.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              details :
            </label>
            {formikPayment.errors.details && formikPayment.touched.details && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formikPayment.errors.details}
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder=" "
              onBlur={formikPayment.handleBlur}
              value={formikPayment.values.phone}
              onChange={formikPayment.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              phone:
            </label>
            {formikPayment.errors.phone && formikPayment.touched.phone && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formikPayment.errors.phone}
              </div>
            )}
          </div>

          {/* city field */}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="city"
              name="city"
              placeholder=" "
              onBlur={formikPayment.handleBlur}
              value={formikPayment.values.city}
              onChange={formikPayment.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              city:
            </label>
            {formikPayment.errors.city && formikPayment.touched.city && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formikPayment.errors.city}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="py-2 text-center">
            <button
              onClick={() => {
                setIsCash(true);
              }}
              disabled={
                !formikPayment.isValid || !formikPayment.dirty ? true : false
              }
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className="fas fa-spin fa-spinner"></i>
              ) : (
                "Pay Cash"
              )}
            </button>
            <button
              onClick={() => {
                setIsCash(false);
              }}
              disabled={
                !formikPayment.isValid || !formikPayment.dirty ? true : false
              }
              type="submit"
              className="ms-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoadingOnline ? (
                <i className="fas fa-spin fa-spinner"></i>
              ) : (
                "Pay Online"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

      // <form
      //   className="container w-1/2 mx-auto min-h-screen"
      //   onSubmit={formikPaymentPayment.handleSubmit}
      // >
      //   <div className="grid grid-cols-1 mx-auto overflow-hidden">
      //     <div className="py-1">
      //       <label
      //         htmlFor="details"
      //         typeof="text"
      //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-500"
      //       >
      //         details:
      //       </label>
      //       <input
      //         onBlur={formikPayment.handleBlur}
      //         value={formikPayment.values.details}
      //         onChange={formikPayment.handleChange}
      //         type="text"
      //         id="details"
      //         name="details"
      //         className="p-2 w-full text-gray-900 border rounded-lg outline-none"
      //       />
      //       {/* {formik.errors.details && formik.touched.details && (
      //         <div
      //           className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      //           role="alert"
      //         >
      //           {formik.errors.details}
      //         </div>
      //       )} */}
      //     </div>
      //     <div className="py-1 relative z-0 w-full mb-5 group">
      //       <label
      //         htmlFor="phone"
      //         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      //       >
      //         phone:
      //       </label>
      //       <input
      //         onBlur={formikPayment.handleBlur}
      //         value={formikPayment.values.phone}
      //         onChange={formikPayment.handleChange}
      //         type="phone"
      //         id="phone"
      //         name="phone"
      //         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      //       />
      //     </div>
      //     <div className="py-1">
      //       <label
      //         htmlFor="city"
      //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-green-500"
      //       >
      //         city:
      //       </label>
      //       <input
      //         onBlur={formikPayment.handleBlur}
      //         value={formikPayment.values.city}
      //         onChange={formikPayment.handleChange}
      //         type="text"
      //         id="city"
      //         name="city"
      //         className="p-2 w-full text-gray-900 border rounded-lg outline-none"
      //       />
      //     </div>
      //   </div>
      //   <div className="py-2 text-center">
      //     <button
      //       onClick={() => {
      //         setIsCash(true);
      //       }}
      //       disabled={
      //         !formikPayment.isValid || !formikPayment.dirty ? true : false
      //       }
      //       type="submit"
      //       className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      //     >
      //       {isLoading ? (
      //         <i className="fas fa-spin fa-spinner"></i>
      //       ) : (
      //         "Pay Cash"
      //       )}
      //     </button>
      //     <button
      //       onClick={() => {
      //         setIsCash(false);
      //       }}
      //       disabled={
      //         !formikPayment.isValid || !formikPayment.dirty ? true : false
      //       }
      //       type="submit"
      //       className="ms-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      //     >
      //       {isLoadingOnline ? (
      //         <i className="fas fa-spin fa-spinner"></i>
      //       ) : (
      //         "Pay Online"
      //       )}
      //     </button>
      //   </div>
      // </form>