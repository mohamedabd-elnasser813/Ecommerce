import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/letter-u-shopping-cart-logo-alphabet-u-online-store-icon_1113277-321-removebg-preview.png";
import SocialMedia from "../SocialMedia/SocialMedia";
import { userContext } from "../../Context/UserContext";
import { DarkContext } from "../../Context/DarkModeContext";
import { usecardContext } from "../../Context/CardContext";
import { useFormik } from "formik";



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartCounter, wishList, setQueryData, queryData } =
    useContext(usecardContext);
  let { token, setToken } = useContext(userContext)
  let navgiate = useNavigate()
  function logOut() {
    localStorage.removeItem('token')
    navgiate('/login')
    setToken(null)
  }
  const { isDark, setDarkMode } = useContext(DarkContext);
  const toggle = () => {
    setDarkMode(!isDark);
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])



  return (
    <nav className="bg-white shadow-md dark:bg-gray-900 fixed left-0 right-0 top-0 z-10 dark:text-white">
      <div className="flex items-center justify-between mx-auto p-4 ">
        {/* Navlinks & Photo header */}
        <div className="flex items-center lg:space-x-8 rtl:space-x-reverse  ">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              className="w-9 max-w-9 object-contain dark:text-white"
              alt="FreshCart Logo"
            />
            <h1 className="text-xl font-extralight">Shopping</h1>
          </div>

          {token ? (
            <>
              <ul
                className={`${isMenuOpen
                    ? " space-x-0 space-y-3 border-gray-200 dark:bg-gray-900 text-center "
                    : `hidden`
                  } lg:flex items-center font-medium text-sm lg:space-x-6  rtl:space-x-reverse  absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 transition-all duration-500 ease-in-out`}
              >
                <li>
                  <NavLink
                    to=""
                    className="dark:text-white text-black"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cart" className="dark:text-white text-black">
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink to="products" className="dark:text-white text-black">
                    products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="Brands" className="dark:text-white text-black">
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Categories"
                    className="dark:text-white text-black"
                  >
                    Categories
                  </NavLink>
                </li>
                <div className="inline space-x-4 space-y-4 text-xl lg:hidden ">
                  <SocialMedia
                    className={
                      "border p-2 text-xs rounded-[50%] cursor-pointer transition-all duration-300 hover:text-blue-500 hover:bg-white"
                    }
                  />

                  <form>
                    <label
                      htmlFor="default-search"
                      className=" text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="search"
                        id="default-search"
                        value={queryData}
                        onChange={(e) => {
                          setQueryData(e.target.value);
                        }}
                        className=" block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search "
                      />
                      <i className="fa-solid fa-magnifying-glass absolute top-3 left-3"></i>
                    </div>
                  </form>
                </div>
              </ul>
            </>
          ) : null}
        </div>
        {/* Login & Register & Darkmode or Logout & darkMode */}
        <div className="lg:flex items-center space-x-6 rtl:space-x-reverse">
          {token ? (
            <>
              {cartCounter ? (
                <div className="top-3 z-10 absolute sm:right-[75px]  md:right-[90px] lg:right-[112px] bg-red-500 flex-col rounded-[50%] w-5 h-5 flex items-center justify-center">
                  <span className="text-white">{cartCounter}</span>
                </div>
              ) : null}
              {wishList ? (
                <div className="top-3 z-10 absolute sm:right-[120px]  md:right-[130px] lg:right-[155px] bg-yellow-500 flex-col rounded-[50%] w-5 h-5 flex items-center justify-center">
                  <span className="text-white">{wishList}</span>
                </div>
              ) : null}

              <div className="lg:flex gap-6 hidden relative items-center">
                <form>
                  <label
                    htmlFor="default-search"
                    className=" text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="search"
                      id="default-search"
                      value={queryData}
                      onChange={(e) => {
                        setQueryData(e.target.value);
                      }}
                      className=" block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search "
                    />
                    <i className="fa-solid fa-magnifying-glass absolute top-3 left-3"></i>
                  </div>
                </form>

                <SocialMedia />
                <Link to={"/Profile"}>
                  <i className="fa-solid fa-user dark:text-white"></i>
                </Link>
                <Link to={"/Wishlist"}>
                  <i
                    className={`dark:text-white text-black  fa-solid fa-heart realtive`}
                  ></i>
                </Link>
                <Link to={"/cart"}>
                  <i
                    className={`dark:text-white text-black  fa-solid fa-cart-shopping`}
                  ></i>
                </Link>
                {/* dark */}
                <i
                  className={`${isDark
                      ? "fa-solid fa-sun cursor-pointer text-white"
                      : "fa-solid fa-moon cursor-pointer dark:text-white text-black"
                    } `}
                  onClick={toggle}
                ></i>
              </div>
              <div className="lg:flex gap-3">
                <NavLink
                  onClick={logOut}
                  to="/Login"
                  className="text-sm cursor-pointer text-green-600 dark:text-green-500 hover:underline lg:block hidden"
                >
                  Logout
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <i
                className={`${isDark
                    ? "fa-solid fa-sun cursor-pointer text-white"
                    : "fa-solid fa-moon cursor-pointer dark:text-white text-black"
                  } `}
                onClick={toggle}
              ></i>

              <NavLink
                to="Login"
                className="text-sm text-green-600 dark:text-green-500"
              >
                Login
              </NavLink>
              <NavLink
                to="Register"
                className="text-sm text-green-600 dark:text-green-500 hover:underline"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* darkmode menubar for link */}
        {token ? (
          <div className="flex gap-6 items-center lg:hidden">
            <NavLink
              onClick={logOut}
              to="/Login"

              className="text-sm cursor-pointer text-green-600 dark:text-green-500 hover:underline"
            >
              Logout
            </NavLink>

            <Link to={"/Profile"}>
              <i className="fa-solid fa-user dark:text-white"></i>
            </Link>
            <Link to={"/Wishlist"}>
              <i
                className={`dark:text-white text-black  fa-solid fa-heart `}
              ></i>
            </Link>
            <Link to={"/cart"}>
              <i
                className={`dark:text-white text-black  fa-solid fa-cart-shopping`}
              ></i>
            </Link>

            <i
              className={`${isDark
                  ? "fa-solid fa-sun cursor-pointer text-white"
                  : "fa-solid fa-moon cursor-pointer  text-black"
                } `}
              onClick={toggle}
            ></i>

            <div
              className="lg:hidden flex items-center gap-6"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <>
                  <i className="fa-solid fa-xmark fa-xl dark:text-white text-black cursor-pointer "></i>
                </>
              ) : (
                <i className="fa-solid fa-bars fa-xl cursor-pointer dark:text-white text-black"></i>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
