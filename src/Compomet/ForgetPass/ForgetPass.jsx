import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { userContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import toast from 'react-hot-toast';

export default function ForgetPass() {

    const [step , setStep] = useState(1)
    const [loading , setLoading] = useState(false)
    const {setToken} = useContext(userContext)
    let navigate = useNavigate();
     function forgetPassword(values) {
      setLoading(true);
       axios
         .post(
           "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
           values
         )
         .then((res) => {
            setLoading(false)
            toast.success("verify code Send Done")
           setStep(2)
         })
         .catch((error) => {
          <p className="text-3xl dark:text-white">Error in Server</p>;
            setLoading(false)
            toast.error("error")
         });
     }

     function veriftyPass(values){
      setLoading(true)
        axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , values
        ).then((res)=>{
            setLoading(false)
            toast.success("Done")
            setStep(3)
        }).catch((error)=>{
          <p className="text-3xl dark:text-white">Error in Server</p>
            setLoading(false)
            toast.error("error")
        });
     }

     function resetPass(values) {
            setLoading(true);
        axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
        .then((res)=>{
            setLoading(false);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            toast.success("Your Password Reset Done")
            navigate("/");
        }).catch((error)=>{
          <p className="text-3xl dark:text-white">Error in Server</p>;
            setLoading(false)
            toast.error("error")
        });
     }

      let validationSchema = Yup.object().shape({
        email: step === 1 ? Yup.string().required("Email is Required") : Yup.string().nullable(), 
        resetCode: step === 2 ? Yup.string().required("Verify Error") : Yup.string().nullable() ,
        newPassword: step === 3 ?  Yup.string().min(5,"min 5 character").max(10,"max 10 character") 
          .matches(
            /^(?=.*[!@#$%^&*])[A-Z][A-Za-z0-9@#$%^&*!]{1,15}$/,
            "password must be include letters and numbers"
          )
          .required("Password is Required") : Yup.string().nullable()
      });

     let formik = useFormik({
       initialValues: {
         email: "",
         resetCode: "",
         newPassword : "", 
       },

       onSubmit: (values) => {
         if (step === 1) {
           forgetPassword(values);
         } else if (step === 2) {
           veriftyPass(values);
         }
       },
       validationSchema
     });
  
  return (
    <form
      className="container w-1/2 mx-auto pt-10"
      onSubmit={formik.handleSubmit}
    >
      {/* email */}
      <div className="min-h-screen pt-24">
        <div className="relative z-0 w-full my-5 container grid grid-cols-1  mx-auto  group">
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
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

        {/* resetCode */}
        {step === 2 ? (
          <div className="relative z-0 w-full my-10 container grid grid-cols-1  mx-auto  group">
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              placeholder=" "
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              resetCode:
            </label>
            {formik.errors.resetCode && formik.touched.resetCode && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.resetCode}
              </div>
            )}
          </div>
        ) : null}

        {/* newPassword */}
        {step === 3 ? (
          <div className="relative z-0 w-full my-10 container grid grid-cols-1  mx-auto  group">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder=" "
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              newPassword:
            </label>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div
                className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.newPassword}
              </div>
            )}
          </div>
        ) : null}

        {/* Button */}
        <div className="text-center">
          {step === 1 ? (
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="me-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {loading ? <i className="fas fa-spin fa-spinner"></i> : "Send"}
            </button>
          ) : null}

          {step === 2 ? (
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="me-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {loading ? <i className="fas fa-spin fa-spinner"></i> : "Verify"}
            </button>
          ) : null}

          {step === 3 ? (
            <button
              onClick={step === 3 ? () => resetPass(formik.values) : null}
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="me-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {loading ? <i className="fas fa-spin fa-spinner"></i> : "Reset"}
            </button>
          ) : null}

          {step === 2 ? (
            <button
              onClick={() => forgetPassword(formik.values)}
              type="button"
              className="me-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Resend code
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}

