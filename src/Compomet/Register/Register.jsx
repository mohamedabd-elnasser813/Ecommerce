import React, { useContext, useEffect, useState } from 'react';
import {useFormik} from "formik"
import axios from "axios"
import {  useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { userContext } from '../../Context/UserContext';





 export default function Register() {

  const [errorApi,setErrorApi] = useState(null)
   let navigate  = useNavigate();
   const [isLoading , setisLoading] = useState(false)
    const { setToken, setUserName, setEmail } = useContext(userContext);
// axios api   
 async function handleRigister(values){
  setisLoading(true)
   await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      .then((res)=>{
        
        setToken(res.data.token)
        navigate ("/");
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("name", res.data.user.name);
        setisLoading(false)
        setEmail(res.data.user.email)
        setUserName(res.data.user.name)
      }).catch((errors)=>{
       setErrorApi(errors.response?.data?.message);;
        setisLoading(false)
      }).finally(()=>{
        setisLoading(false)
      })
 }




let validationSchema = Yup.object().shape(
  {
    name: Yup.string().min(3,"min 3 at least").max(20,"max 10 at least").required("name is required"),
    email:Yup.string().email("Email is invalid").required("Email is required"),
    phone:Yup.string().matches(/^01[1250][0-9]{8}$/,"Phone is inValid , must be a Egyptian Number").required("Number is required"),
    password:Yup.string().matches(/^(?=.*[!@#$%^&*])[A-Z][A-Za-z0-9@#$%^&*!]{1,15}$/,"password must be include letters and numbers").required("password is required"),    
    rePassword:Yup.string().oneOf([Yup.ref("password")],"rePassword not Match").required("rePassword is required")
  }
)




//Hook Formik

 let formik = useFormik({
   initialValues: {
     name: "",
     email: "",
     password: "",
     rePassword: "",
     phone: "",
   },
   onSubmit: handleRigister,
   validationSchema,
 });
  return (
    <div className="flex flex-col justify-center min-h-screen items-center dark:text-white pt-24">
      {errorApi ? (
        <div
          className="container mx-auto rounded-xl p-4 my-4 text-center text-white bg-green-800 "
          role="alert"
        >
          {errorApi}
        </div>
      ) : null}
      <h1 className="text-center text-2xl">Register Now:</h1>
      
      <form className="container w-1/3 mx-auto shadow-2xl  border-gray-500 p-3 mt-4 dark:bg-gray-700" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 mx-auto overflow-hidden">
          {/* Name Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" "
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {formik.errors.name && formik.touched.name && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {formik.errors.email && formik.touched.email && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" "
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {formik.errors.password && formik.touched.password && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* RePassword Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              placeholder=" "
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
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
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="py-2 text-center">
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className="fas fa-spin fa-spinner"></i>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
