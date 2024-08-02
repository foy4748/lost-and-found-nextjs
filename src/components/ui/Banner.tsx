"use client";
import { Button } from "flowbite-react";
import Image from "next/image";
import {
  Navigation,
  A11y,
  Autoplay,
  Scrollbar,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function SingleSlide({ slideNum }: { slideNum: number }) {
  return (
    <SwiperSlide className="swiper-slide">
      <section className="relative">
        <figure>
          <Image
            className="w-full h-[91vh]"
            src="/images/banner/banner1.jpg"
            width={1920}
            height={500}
            alt="banner1"
          />
        </figure>
        <div className="slider-overlay absolute top-0 left-0 w-full h-full">
          {/* <div className="slider-overlay w-full h-full"></div> */}
          {/* Slider Body */}
          <div className="flex w-1/2 h-full justify-center items-center">
            <figure className="relative">
              <div className="blob blob-center"></div>
              <Image
                className="relative z-10"
                src={`/images/banner-item-images/${slideNum}.png`}
                width={300}
                height={300}
                alt="Phone"
              />
            </figure>
          </div>
        </div>
      </section>
    </SwiperSlide>
  );
}

function Slides() {
  return (
    <>
      {Array.from({ length: 4 }, (_, idx) => idx + 1).map((num, key) => {
        return <SingleSlide key={key} slideNum={num}></SingleSlide>;
      })}
    </>
  );
}

export default function Banner() {
  return (
    <main>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        <Slides />
      </Swiper>
    </main>
  );
}
