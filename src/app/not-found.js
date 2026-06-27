"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Heart } from "lucide-react";
import Image from "next/image";
import { CiMedicalCross } from "react-icons/ci";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden   px-6">

       
            <div className="absolute w-[600px] h-[600px] rounded-full bg-red-400/10 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-red-300/10 blur-[100px]" />
            <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-red-500/10 blur-[90px]" />

            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                    src="https://i.ibb.co.com/Kcm5t1PK/2210-removebg-preview.png"
                    alt="404 Background"
                    width={750}
                    height={750}
                    priority
                    className="opacity-[0.06] blur-[1px] scale-110 select-none pointer-events-none"
                />
            </div>
         
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-red-300 text-xl"
                    initial={{
                        y: -100,
                        x: Math.random() * window.innerWidth,
                        opacity: 0,
                    }}
                    animate={{
                        y: "120vh",
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: "linear",
                    }}
                >
                    <CiMedicalCross />
                </motion.div>
            ))}

         
            {Array.from({ length: 25 }).map((_, i) => (
                <motion.span
                    key={`particle-${i}`}
                    className="absolute rounded-full bg-red-300/30"
                    style={{
                        width: Math.random() * 10 + 4,
                        height: Math.random() * 10 + 4,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [-20, -120],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.3, 0.5],
                    }}
                    transition={{
                        duration: Math.random() * 4 + 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 max-w-xl text-center"
            >
                
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                    }}
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full  text-[#db0000]"
                >
                   <CiMedicalCross size={'lg'} />
                </motion.div>

                <motion.h1
                    animate={{
                        y: [0, -8, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                    className="text-8xl font-black text-[#db0000]"
                >
                    404
                </motion.h1>

                <h2 className="mt-4 text-3xl font-bold text-gray-800">
                    Oops! Page Not Found
                </h2>

                <p className="mt-4 text-gray-500 leading-relaxed">
                    The page you're looking for doesn't exist or may have been moved.
                    Let's get you back to saving lives.
                </p>

                <Link href="/">
                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#db0000] px-6 py-3 font-semibold text-white shadow-lg transition hover:cursor-pointer"
                    >
                        <Home size={20} />
                        Back to Home
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}