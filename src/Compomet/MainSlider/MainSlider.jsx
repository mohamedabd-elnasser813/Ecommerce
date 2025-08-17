import React, { useEffect, useState } from 'react';
import style from './MainSlider.module.css/'
import Slider from 'react-slick';
import slideOne from "../../assets/slider-image-1.jpeg";
import slideTwo from "../../assets/slider-image-2.jpeg";
import slideThree from "../../assets/slider-image-3.jpeg";
import bannerTwo from "../../assets/grocery-banner-2.jpeg";
import bannerOne from "../../assets/grocery-banner.png";

export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] container mx-auto pt-20">
        <div className="overflow-hidden">
          <Slider {...settings} className="w-full mb-10">
            <div>
              <img
                src={slideOne}
                alt=""
                className="h-[300px] w-full object-fit"
              />
            </div>
            <div>
              <img
                src={slideTwo}
                alt=""
                className="h-[300px] w-full object-fit"
              />
            </div>
            <div>
              <img
                src={slideThree}
                alt=""
                className="h-[300px] w-full object-fit"
              />
            </div>
          </Slider>
        </div>
        <div>
            <img src={bannerOne} alt="" className='h-[150px] w-full object-fit'/>
            <img src={bannerTwo} alt="" className='h-[150px] w-full object-fit'/>
        </div>
      </div>
    </>
  );
    
  
}
