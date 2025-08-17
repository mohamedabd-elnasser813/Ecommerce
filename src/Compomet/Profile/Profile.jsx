import React, { useContext, useEffect, useState } from 'react'
import { usecardContext } from '../../Context/CardContext'
import { userContext } from '../../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

export default function Profile() {
  let token = localStorage.getItem("token");
  const { setIsCardCounter, setIsWishList, getWishList, getCard } =
  useContext(usecardContext);
  const [LoadingPass, setLoadingPass] = useState(false);
  const [LoadingData, setLoadingData] = useState(false);
  const { email, userName, setUserName, setEmail } =
    useContext(userContext);
  // Get card query
  const { data: x } = useQuery({
    queryKey: ["number of cart"],
    queryFn: getCard,
  });
  let navigate = useNavigate()
  // Get wish list query
  const { data: y } = useQuery({
    queryKey: ["count of WishList"],
    queryFn: getWishList,
  });

  useEffect(() => {
    setIsCardCounter(x?.data?.numOfCartItems);
    setIsWishList(y?.data?.count);
  }, [x, y]);

  // update password
  function updatePassword(values) {
    setLoadingPass(true);
    axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        { headers: { token } }
      )
      .then((res) => {
        ;
        setLoadingPass(false);
        toast.success("Password updated Done");
        formikUpdatePassword.resetForm();
        navigate("/Login")
      })
      .catch((error) => {
        <p className="text-3xl dark:text-white">Error in Server</p>;
        setLoadingPass(false);
        toast.error("Password updated Failed");
      });
  }
  
  //update data
  function updateUserData(values) {
    setLoadingData(true);
    axios
    .put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", values, {
      headers: { token },
    })
    .then((res) => {
      
      setLoadingData(false);
      toast.success("data updated Done");
      formikUpdateData.resetForm();
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("name", res.data.user.name);
      
      setEmail(res.data.user.email);
      setUserName(res.data.user.name);
      
    })
    .catch((error) => {
      <p className="text-3xl dark:text-white">Error in Server</p>;
      setLoadingData(false);
      toast.error("data updated Failed");
    });
  }
 
  let validationSchemaOne = Yup.object().shape({
    password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*])[A-Z][A-Za-z0-9@#$%^&*!]{1,15}$/,
      "password must be include letters and numbers"
    )
    .required("password is required"),
    rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "rePassword not Match")
    .required("rePassword is required"),
  });
  let validationSchemaTwo = Yup.object().shape({
    name: Yup.string()
      .min(3, "min 3 at least")
      .max(20, "max 10 at least")
      .required("name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .matches(
        /^01[1250][0-9]{8}$/,
        "Phone is inValid , must be a Egyptian Number"
      )
      .required("Number is required"),
  });
  
  let formikUpdateData = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: updateUserData,
    validationSchema: validationSchemaTwo,
  });
  
  let formikUpdatePassword = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: updatePassword,
    validationSchema : validationSchemaOne,
  });
  
  return (
    <>
      <div className="bg-blue py-24 lg:w-1/2 md:w-full dark:text-white overflow-hidden shadow rounded-lg container mx-auto">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 ">User Profile</h3>
          <p className="mt-1 max-w-2xl text-sm">
            This is some information about the
          </p>
        </div>
        <div className=" px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm ">Full name</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{userName}</dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm ">Email address</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{email}</dd>
            </div>
          </dl>
        </div>
        <div className="pt-3 text-center">
          <Link
            to={"/allorders"}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              GetUserOrders
            </span>
          </Link>
        </div>
        <div className="lg:flex  gap-20 md:block">
          {/* form password */}
          <form
            onSubmit={formikUpdatePassword.handleSubmit}
            className="max-w-sm shadow-lg dark:shadow-black mt-10 w-full p-10 "
          >
            {/* Current pass */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder=" "
                onBlur={formikUpdatePassword.handleBlur}
                value={formikUpdatePassword.values.currentPassword}
                onChange={formikUpdatePassword.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="currentPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                currentPassword
              </label>
            </div>
            {/* password */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                onBlur={formikUpdatePassword.handleBlur}
                value={formikUpdatePassword.values.password}
                onChange={formikUpdatePassword.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {formikUpdatePassword.errors.password &&
                formikUpdatePassword.touched.password && (
                  <div
                    className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formikUpdatePassword.errors.password}
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
                onBlur={formikUpdatePassword.handleBlur}
                value={formikUpdatePassword.values.rePassword}
                onChange={formikUpdatePassword.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                rePassword:
              </label>
              {formikUpdatePassword.errors.rePassword &&
                formikUpdatePassword.touched.rePassword && (
                  <div
                    className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formikUpdatePassword.errors.rePassword}
                  </div>
                )}
            </div>
            <div className="py-2 flex gap-3  justify-between items-center">
              <button
             
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {LoadingPass ? (
                  <i className="fas fa-spin fa-spinner"></i>
                ) : (
                  "update Password"
                )}
              </button>
              <Link
                to="/forgetpass"
                className="hover:text-blue-900 underline text-blue-500"
              >
                Forget Password
              </Link>
            </div>
          </form>

          {/* user data */}
          <form
            className="max-w-sm shadow-lg dark:shadow-black mt-10 w-full p-10"
            onSubmit={formikUpdateData.handleSubmit}
          >
            {/* Name Field */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder=" "
                onBlur={formikUpdateData.handleBlur}
                value={formikUpdateData.values.name}
                onChange={formikUpdateData.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                name:
              </label>
              {formikUpdateData.errors.name &&
                formikUpdateData.touched.name && (
                  <div
                    className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formikUpdateData.errors.name}
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
                onBlur={formikUpdateData.handleBlur}
                value={formikUpdateData.values.email}
                onChange={formikUpdateData.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                email:
              </label>
              {formikUpdateData.errors.email &&
                formikUpdateData.touched.email && (
                  <div
                    className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formikUpdateData.errors.email}
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
                onBlur={formikUpdateData.handleBlur}
                value={formikUpdateData.values.phone}
                onChange={formikUpdateData.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                phone:
              </label>
              {formikUpdateData.errors.phone &&
                formikUpdateData.touched.phone && (
                  <div
                    className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formikUpdateData.errors.phone}
                  </div>
                )}
            </div>
            <div className="py-2">
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {LoadingData ? (
                  <i className="fas fa-spin fa-spinner"></i>
                ) : (
                  "update data"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
