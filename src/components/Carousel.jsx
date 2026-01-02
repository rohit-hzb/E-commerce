import React, { useEffect } from "react";
import DataContext, { useData } from "../context/DataContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

/* ARROWS */
const Arrow = ({ onClick, icon: Icon, position }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-30 hidden md:flex 
    items-center justify-center w-11 h-11 rounded-full 
    bg-white/10 backdrop-blur border border-white/20 text-white
    hover:bg-rose-600 transition ${position}`}
  >
    <Icon size={20} />
  </button>
);

const Carousel = () => {
  const navigate = useNavigate();
  const { data, fetchAllProducts } = useData();
  console.log("carousel", data);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
    fade: true,
    nextArrow: <Arrow icon={AiOutlineRight} position="right-4" />,
    prevArrow: <Arrow icon={AiOutlineLeft} position="left-4" />,
  };

  return (
    <section className="  w-full px-3 sm:px-6 md:px-10 py-6">
      <div className="rounded-3xl overflow-hidden ">
        <Slider {...settings}>
          {data?.slice(0, 8).map((item) => (
            <div key={item.id}>
              {/* FIXED & SMALLER HEIGHT */}
              <div className="relative min-h-[420px] md:min-h-[520px] flex items-center bg-[#0b0616]">
                {/* BACKGROUND */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2d0b5a] via-[#120721] to-black" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
                  <div className="flex flex-col-reverse md:flex-row items-center gap-10">
                    {/* LEFT CONTENT */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                      <span className="text-rose-500 text-xs tracking-[0.3em] uppercase font-semibold">
                        Premium Electronics
                      </span>

                      <h1 className="text-xl sm:text-2xl md:text-5xl font-extrabold text-white line-clamp-2 uppercase">
                        {item.title}
                      </h1>

                      <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto md:mx-0 line-clamp-3">
                        {item.description}
                      </p>

                      <button
                        className="mt-4 inline-flex items-center gap-2 px-8 py-3 
                        bg-gradient-to-r from-rose-600 to-purple-700 
                        text-white font-semibold rounded-xl 
                        hover:scale-105 transition"
                        onClick={() => navigate("/products")}
                      >
                        Shop Now →
                      </button>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="w-full md:w-1/2 flex justify-center relative">
                      {/* GLOW */}
                      <div
                        className="absolute w-56 h-56 md:w-[360px] md:h-[360px] 
                        bg-gradient-to-tr from-rose-600/30 to-purple-700/30 
                        rounded-full blur-[100px]"
                      />

                      {/* IMAGE WRAPPER */}
                      <div
                        className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] 
                        md:w-[380px] md:h-[380px] 
                        rounded-full bg-white/5 backdrop-blur 
                        border border-white/20 shadow-2xl 
                        flex items-center justify-center p-6 md:p-10"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-full object-contain 
                          hover:scale-110 transition duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <Category />
      </div>
    </section>
  );
};

export default Carousel;
