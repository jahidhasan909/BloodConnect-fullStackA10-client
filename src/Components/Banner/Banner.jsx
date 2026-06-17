"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from "@heroui/react";
import { motion } from "framer-motion";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

const HeroBanner = () => {

    const slides = [
        {
            id: 1,
            image: "https://i.ibb.co.com/DgGTntnK/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood-1200x800-1200x675.jpg",
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/0VjcrY50/human-blood-donate-white-background-1308-111266-jpg.avif",
        }
    ];

    return (
        <div className="relative w-full h-[550px] md:h-[650px] bg-slate-900 overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect={'fade'}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                loop={true}
                className="w-full  h-[800px] mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full select-none">



                        <Image src={slide.image} width={1400} height={950} className='absolute  w-full' alt='baner'>

                        </Image>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-transparent" />



                    </SwiperSlide>
                ))}
            </Swiper>



            <div className="absolute inset-0 max-w-7xl mx-auto mt-35 px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-10">
                <div className="max-w-2xl text-white space-y-3 animate-in fade-in  duration-700">


                    <div className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 text-rose-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                        <span className="w-2 h-2 a rounded-full bg-rose-300  animate-pulse"></span>
                        Blood Donation Platform
                    </div>


                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
                        One Drop Can <br /> <span className='text-rose-500'>Save</span> a Life
                    </h1>




                    <TypeAnimation
                       className='text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-xl'
                        sequence={[
                            'BloodConnect connects donors with people',
                            1000,
                            'who need blood in real time.',
                            1000,
                            'Join our trusted community and help',
                            1000,
                            'save lives quickly and safely.',
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        
                        repeat={Infinity}
                    />





                    <div className="pt-4 flex flex-col sm:flex-row gap-4">


                        <Link href="/register" className="relative inline-block p-[2px] overflow-hidden rounded-md group">

                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#E11D48_50%,#E2E8F0_100%)]"
                            />


                            <Button
                                className="relative bg-[#E11D48] hover:bg-rose-700 text-white font-semibold text-base h-12 px-8 rounded-md transition-all flex items-center justify-center gap-2 w-full"
                            >
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                </svg>
                                Join as a donor
                            </Button>
                        </Link>


                        <Button
                            as={Link}
                            href="/search"
                            variant="bordered"
                            className="border-2 border-white hover:bg-white hover:text-slate-900 text-white font-semibold text-base h-12 px-8 rounded-md transition-all flex items-center justify-center gap-2 group"
                        >
                            <svg className="w-5 h-5 stroke-current fill-none transition-transform group-hover:rotate-12" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            Search Donors
                        </Button>

                    </div>
                </div>
            </div>




            <style jsx global>{`
                .swiper-pagination-bullet-active {
                    background: #E11D48 !important;
                    width: 24px !important;
                    border-radius: 4px !important;
                }
                .swiper-pagination-bullet {
                    background: #ffffff;
                    opacity: 0.7;
                }
            `}</style>
        </div>
    );
};

export default HeroBanner;