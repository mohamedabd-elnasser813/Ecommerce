
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Compomet/Layout/Layout'
import Home from './Compomet/Home/Home'
import Products from './Compomet/Products/Products'
import Brands from './Compomet/Brands/Brands'
import Footer from './Compomet/Footer/Footer'
import Login from './Compomet/Login/Login'
import Navbar from './Compomet/Navbar/Navbar'
import Not_found_page from './Compomet/Not-found-page/Not_found_page'
import Register from './Compomet/Register/Register'
import Categories from './Compomet/Categories/Categories'
import UserContext from './Context/UserContext'
import ProtectedRoute from './Compomet/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Compomet/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DarkModeContext, { DarkContext } from './Context/DarkModeContext'
import CardContext from './Context/CardContext'
import { Toaster } from 'react-hot-toast'
import Payment from './Compomet/Payment/Payment'
import Cart from './Compomet/Cart/Cart'
import AllOrder from './Compomet/AllOrder/AllOrder'
import WishList from './Compomet/WishList.jsx/WishList'
import ForgetPass from './Compomet/ForgetPass/ForgetPass'
import Profile from './Compomet/Profile/Profile'
let client = new QueryClient();


// const router = createBrowserRouter([
//   {
//     path: "", element: <Layout />,
//     children: [{ index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
//     { path: "Products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
//     { path: "Brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
//     { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
//     { path: "WishList", element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
//     { path: "Payment", element: <ProtectedRoute> <Payment /> </ProtectedRoute> },
//     { path: "Profile", element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
//     { path: "allorders", element: <ProtectedRoute> <AllOrder /> </ProtectedRoute> },
//     { path: "Categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
//     { path: "ProductDetails/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
//     { path: "Footer", element: <Footer /> },
//     { path: "Login", element: <Login /> },
//     { path: "ForgetPass", element: <ForgetPass /> },
//     { path: "Navbar", element: <Navbar /> },
//     { path: "*", element: <Not_found_page /> },
//     { path: "Register", element: <Register /> },
//     ]
//   }
// ])

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> }, // اجعل تسجيل الدخول الصفحة الأولى
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "ForgetPass", element: <ForgetPass /> },

      // الصفحات المحمية بالتوكين
      { path: "Home", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "Products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: "Brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: "WishList", element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
      { path: "Payment", element: <ProtectedRoute> <Payment /> </ProtectedRoute> },
      { path: "Profile", element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute> <AllOrder /> </ProtectedRoute> },
      { path: "Categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: "ProductDetails/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },

      { path: "Footer", element: <Footer /> },
      { path: "Navbar", element: <Navbar /> },

      { path: "*", element: <Not_found_page /> },
    ],
  },
]);



function App() {
  return (
    <div className="dark:bg-slate-950 bg-white">
      <DarkModeContext>
        <UserContext>
          <CardContext>
            <QueryClientProvider client={client}>
              <RouterProvider router={router}>
              </RouterProvider>
              <Toaster />
            </QueryClientProvider>
          </CardContext>
        </UserContext>
      </DarkModeContext>
    </div>
  );
}

export default App
