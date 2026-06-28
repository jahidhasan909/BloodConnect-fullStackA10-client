"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';



const HeroBanner = () => {


    return (
        <div className="relative w-full min-h-screen  overflow-hidden flex flex-col justify-between p-6 md:p-16 lg:p-20 font-sans">

            
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

                    <svg className="absolute top-1/4 left-0 w-full h-full object-cover text-rose-200 stroke-current opacity-40" preserveAspectRatio="none" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-50,300 C 350,500 800,100 1500,400" strokeWidth="1.5" />
                        <path d="M-50,330 C 400,480 750,130 1500,420" strokeWidth="0.8" />
                        <path d="M-50,360 C 450,460 700,160 1500,440" strokeWidth="0.4" />
                    </svg>


                    <svg className="absolute animate-floating top-32 right-32 w-28 h-28 text-rose-200 stroke-current opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth="0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h2l2-4 2 8 2-4h2" />
                    </svg>


                    <svg className="absolute top-40 animate-floating  right-72 w-8 h-8 text-rose-200 stroke-current opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>


                    <svg className="absolute animate-floating top-1/4 left-1/2 ml-10 w-16 h-16 text-rose-200 stroke-current -rotate-45 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="1">
                        <rect x="5" y="8" width="14" height="8" rx="4" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                    </svg>



                    <svg className="absolute animate-floating bottom-20 left-1/2 w-24 h-24 text-rose-200 stroke-current opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth="0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>


                    <svg className="absolute top-[40%] animate-floating left-10 w-16 h-16 text-rose-200 stroke-current opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>


                    <svg className="absolute bottom-24 animate-floating left-1/3 w-10 h-10 text-rose-200 stroke-current opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>


                    <svg className="absolute top-20 animate-floating right-1/4 w-3 h-3 text-rose-200 stroke-current opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
                    <svg className="absolute top-1/3 animate-floating left-1/4 w-3 h-3 text-rose-200 stroke-current opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
                    <svg className="absolute bottom-1/3 animate-floating right-10 w-4 h-4 text-rose-200 stroke-current opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
                </div>
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <div className="w-full ml-10 mt-4 md:mt-10 text-black dark:text-white z-10 relative">
                    <h1 className="text-4xl sm:text-4xl md:text-8xl font-medium tracking-tight leading-[1.05]">
                        One drop can <br />
                        <span className="text-[#db0000]">save</span> a life.
                    </h1>
                </div>
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <div className="w-full flex items-center justify-center py-2 md:py-4 -mt-8 mx-auto z-10 relative">
                    <div className="relative w-full text-center pointer-events-none z-0 flex items-center justify-center">
                        <span className="text-[11vw] font-black tracking-tighter  text-rose-900/[0.06] uppercase dark:text-rose-300/[0.10] block leading-none translate-y-[15%] select-none animate-floating">
                            BloodConnect
                        </span>
                    </div>
                </div>
            </motion.div>



            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-auto z-10 relative">


                <div className="w-full md:w-1/3 order-2 md:order-1 border-l-2 px-2 border-[#db0000] ">

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className='text-black dark:text-white font-semibold'><span className='text-[#db0000]'>Bloodconnect</span> connects donors with people</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >

                        <TypeAnimation
                            className="react-type-animation text-base sm:text-md text-black  leading-relaxed dark:text-white max-w-sm block font-semibold"
                            sequence={[
                                'in urgent need of blood.',
                                1500,
                                'during emergencies.',
                                1500,
                                'within minutes.',
                                1500,
                                'across your local community.',
                                1500,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </motion.div>

                </div>


                <div className="w-full md:w-2/3 flex flex-col items-start md:items-end text-left md:text-right gap-8 order-1 md:order-2">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >

                        <h2 className="text-4xl sm:text-4xl text-black dark:text-white md:text-8xl font-medium tracking-tight leading-[1.05]">
                            Every drop<br /> Every life <span className='text-[#db0000]'>.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

                            <Link href="/registration" className="relative inline-block p-[2px] overflow-hidden rounded-md group">

                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#E11D48_50%,#E2E8F0_100%)]"
                                />


                                <Button
                                    className="relative bg-[#db0000] hover:bg-[#db00008b] text-white font-semibold text-base h-12 px-8 rounded-md transition-all flex items-center justify-center gap-2 w-full "
                                >
                                    <svg className="w-5 animate-pulse h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                    </svg>
                                    Join as a donor
                                </Button>
                            </Link>

                            <Link href={'/searchdonor'}>
                                <Button


                                    variant="bordered"
                                    className="border-2 border-black hover:bg-[#f4f4f4] hover:text-[#1c1c1c] text-black dark:border-white dark:text-white font-semibold text-base h-14 px-8 rounded-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto group"
                                >
                                    <svg className="w-5 h-5  stroke-current fill-none transition-transform group-hover:rotate-12" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                    Search Donors
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default HeroBanner;