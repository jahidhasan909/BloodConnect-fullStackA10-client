"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

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

const Momentsofhope = () => {
    return (
        <section className="py-20 px-4 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
            >

                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 text-[#db0000] px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                            Moments of Hope
                        </span>

                        <h2 className="text-4xl font-black text-slate-900 mt-4">
                            Community Gallery
                        </h2>

                        <p className="text-gray-500 text-[1rem] mt-3 max-w-2xl mx-auto">
                            Explore inspiring moments from blood donation drives, community
                            events, and the generous people who help save lives every day.
                        </p>
                    </div>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        className="z-0"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="overflow-hidden rounded-3xl group">
                                    <Image
                                        src={image}
                                        alt={`Gallery ${index + 1}`}
                                        width={500}
                                        height={350}
                                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </motion.div>

        </section>
    );
};

export default Momentsofhope;