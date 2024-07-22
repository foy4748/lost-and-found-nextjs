"use client";
import { Button } from "flowbite-react";
import Image from "next/image";
import { Navigation, A11y, Controller, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function Banner() {
  return (
    <main>
      <Swiper modules={[Navigation, A11y, Controller, Pagination]}>
        <SwiperSlide>
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
            <div className="slider-overlay absolute top-0 left-0 w-full h-full border border-red-400">
              {/* <div className="slider-overlay w-full h-full"></div> */}
              <div className="flex h-full items-center">
                <div className="ms-8 p-4 text-white border border-red-500 gap-4">
                  <h1 className="font-extrabold text-4xl">Lost And Found</h1>
                  <p>
                    Find whatever you&apos;ve lost. Let us know if you&apos;ve
                    found something
                  </p>
                  <Button>Get Started</Button>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section>
            <figure>
              <Image
                className="w-full h-[91vh]"
                src="/images/banner/banner1.jpg"
                width={1920}
                height={1080}
                alt="banner1"
              />
            </figure>
          </section>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
