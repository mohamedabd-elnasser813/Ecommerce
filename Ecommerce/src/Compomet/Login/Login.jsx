import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css/";
import { useFormik } from "formik";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";

export default function Login() {
    let { setToken, setEmail, setUserName ,userName} = useContext(userContext);
  const [errorApi, setErrorApi] = useState(null);
  let navgiate = useNavigate(); 
  const [isLoading, setisLoading] = useState(false);
  
  // axios api
  async function handleLogin(values) {
    setisLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        navgiate("/");        
        setToken(res.data.token)
        setUserName(res.data.user.name);
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("name", res.data.user.name);
        setisLoading(false);
      })
      .catch((errors) => {
        setErrorApi(errors.response.data.message);
        setisLoading(false);
      });
  }

  let validationSchema = Yup.object().shape({  
   email: Yup.string().email("Email is invalid").required("Email is required"),
   password: Yup.string().matches(/^(?=.*[!@#$%^&*])[A-Z][A-Za-z0-9@#$%^&*!]{1,15}$/,"password must be include letters and numbers").required("password is required"),
    });

  //Hook Formik

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });
  return (
    <div className="flex flex-col items-center dark:text-white justify-center h-screen">
      {errorApi ? (
        <div
          className="container mx-auto rounded-xl p-4 my-4 text-center text-white bg-green-800"
          role="alert"
        >
          {errorApi}
        </div>
      ) : null}

  <h1 className="text-center text-2xl">Login Now:</h1>
      <form
        className="container w-1/3 mx-auto pt-5 shadow-2xl  border-gray-500 p-3 mt-4 dark:bg-gray-700"
        onSubmit={formik.handleSubmit}
      >
        <div className="grid grid-cols-1 mx-auto overflow-hidden">
          <div className="relative z-0 w-full my-5  group">
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
              email:
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
          <div className="relative z-0 w-full  group">
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
              password:
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
          <div className="py-5 text-center">
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? <i className="fas fa-spin fa-spinner"></i> : "Login"}
            </button>
          </div>
          <Link
            to="/ForgetPass"
            className="text-center underline hover:text-blue-400"
          >
            Forget Password
          </Link>
        </div>
      </form>
    </div>
  );
}
