import React, { useContext, useEffect, useState } from 'react';
import SocialMedia from '../SocialMedia/SocialMedia';
import logo from "../../assets/letter-u-shopping-cart-logo-alphabet-u-online-store-icon_1113277-321-removebg-preview.png";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t-2">
      <div className="mx-auto w-full max-w-screen-xl p-4">
        <div className="md:flex md:justify-between flex-col">
          <div className="mb-6 md:mb-0 flex">
            <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
            <h2 className='dark:text-white text-3xl'>Shopping</h2>
          </div>

        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 Shady Sherif. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-5">
            <SocialMedia />
          </div>
        </div>
      </div>
    </footer>
  );
}
