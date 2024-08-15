"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Navigation,
  A11y,
  Autoplay,
  Scrollbar,
  Pagination,
  EffectFade,
} from "swiper/modules";

import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";

export function SliderButton() {
  const swiperParent = useSwiper();
  const [currentIdx, setCurrentIdx] = useState(0);
  //const swiperSlide = useSwiperSlide();
  useEffect(() => {
    swiperParent.on("slideChange", (swipe) => {
      setCurrentIdx(swipe.activeIndex);
    });
  }, [swiperParent]);
  return (
    <>
      <div className="flex">
        {[(currentIdx + 1) % 4, (currentIdx + 2) % 4].map((i, idx) => {
          return (
            <figure
              key={idx}
              className="h-[120px] object-cover flex items-center"
              onClick={() => swiperParent.slideTo(i)}
            >
              <Image
                src={`/images/banner-item-images/${i + 1}.png`}
                width={150}
                height={100}
                alt="banner1"
              />
            </figure>
          );
        })}
      </div>
    </>
  );
}

export default function Banner() {
  return (
    <main>
      <Swiper
        modules={[Autoplay, Pagination, Scrollbar, A11y, EffectFade]}
        effect="fade"
        slidesPerView={1}
      >
        {/* pagination={{ clickable: true }} */}
        {[1, 2, 3, 4].map((slideNum, idx) => {
          return (
            <SwiperSlide key={idx}>
              <section className="relative">
                <figure>
                  <Image
                    className="w-full h-[91vh] object-cover"
                    src={`/images/banner/banner-bg-${slideNum}.jpg`}
                    width={1920}
                    height={500}
                    alt="banner1"
                  />
                </figure>
                <div className="slider-overlay z-10 absolute top-0 left-0 w-full h-full">
                  {/* <div className="slider-overlay w-full h-full"></div> */}
                  {/* Slider Body */}
                  <div className="flex h-full justify-center items-center">
                    <figure className="relative w-1/2">
                      <div className={`blob blob-center blob${slideNum}`}></div>
                      <Image
                        className="relative blob-center z-10"
                        src={`/images/banner-item-images/${slideNum}.png`}
                        width={300}
                        height={300}
                        alt="Phone"
                      />
                    </figure>
                    <aside className="w-1/2 me-4">
                      <article className="p-8 h-full w-full bg-green-200 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                        <h1 className="text-6xl text-white text-shadow drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                          Lost Something?
                        </h1>
                        <p className="my-4 text-white text-shadow-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                          <em>
                            Have you misplaced something valuable? Don’t worry!
                            Our platform connects lost items with their rightful
                            owners. Whether it’s a forgotten umbrella, a
                            cherished necklace, or a misplaced gadget, we’re
                            here to help.
                          </em>
                        </p>
                        <div className="my-4 flex gap-2">
                          <Link href={"/report-lost-item"}>
                            <Button size="sm">Report Lost</Button>
                          </Link>
                          <Link href={"/report-found-item"}>
                            <Button size="sm">Report Found</Button>
                          </Link>
                        </div>
                        <SliderButton />
                      </article>
                    </aside>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
}
/*
      <Swiper
        className="h-full w-full"
        modules={[Autoplay, Pagination, Scrollbar, A11y, EffectFade]}
        spaceBetween={50}
        slidesPerView={3}
        loop
        preventClicks={false}
        preventClicksPropagation={false}
      >
        {[1, 2, 3, 4].map((slideNum, idx) => {
          return (
            <SwiperSlide key={idx} className="z-10">
              <figure
                onClick={() => {
                  console.log("HIT");
                  swiperParent.slideTo(slideNum - 1);
                }}
              >
                <Image
                  className="w-full"
                  src={`/images/banner-item-images/${slideNum}.png`}
                  width={100}
                  height={40}
                  alt="banner1"
                />
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>
 */
