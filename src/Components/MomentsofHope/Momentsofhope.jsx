"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const images = [
  "https://i.ibb.co.com/wTp08fs/360-F-309202280-Cgs-Wo-CAd-LBe9-INBvdw-BKUkpa-LEP4-XNLa.jpg",
  "https://i.ibb.co.com/TMwrsRRQ/blood-donor-stock.jpg",
  "https://i.ibb.co.com/5WFDLNJK/Facebook-RCB-Graphic-jpg-img.jpg",
  "https://i.ibb.co.com/MD00ksdT/image.jpg",
  "https://i.ibb.co.com/3m1w1Vwt/images-1.jpg",
  "https://i.ibb.co.com/6227ss5/images-2.jpg",
  "https://i.ibb.co.com/8LscQDY8/images.jpg",
  "https://i.ibb.co.com/6cXH1Ttv/istockphoto-1757606871-612x612.jpg",
];

export default function Momentsofhope() {
  return (
    <section className="py-20 bg-white dark:bg-white/13">
      <div className="max-w-11/14 mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-rose-100 dark:bg-white/20 text-red-600 font-semibold">
              Moments of Hope
            </span>

            <h2 className="text-2xl lg:text-4xl font-bold mt-4">
              Community Gallery
            </h2>

            <p className="text-gray-500 text-xs lg:text-[1rem] mt-3 dark:text-gray-300 max-w-2xl mx-auto">
              Explore inspiring moments from blood donation drives.
            </p>
          </div>

          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            navigation
            centeredSlides
            grabCursor
            loop
            watchSlidesProgress
            slidesPerView="auto"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              modifier: 2,
              scale: 0.85,
              slideShadows: false,
            }}
            className="gallerySwiper"
          >
            {images.map((img, i) => (
              <SwiperSlide
                key={i}
                style={{
                  width: "360px",
                }}
              >
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={img}
                    alt=""
                    width={500}
                    height={600}
                    className="h-[450px] w-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </motion.div>
      </div>
    </section>
  );
}