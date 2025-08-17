import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import CategorySlider from '../Slider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  return <>
    <MainSlider/>
    <CategorySlider/>
    <Products/>

  </>
}
