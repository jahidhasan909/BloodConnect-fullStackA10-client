"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CiMedicalCross } from "react-icons/ci";

export default function SplashScreen({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white dark:bg-white/60"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            
            <div className="absolute w-[600px] h-[600px] rounded-full bg-red-500/7 blur-[120px]" />

            
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-red-400/15"
                style={{
                  width: Math.random() * 14 + 6,
                  height: Math.random() * 14 + 6,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -250],
                  x: [0, Math.random() * 60 - 30],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              />
            ))}

           
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-red-300 text-xl"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  bottom: "-40px",
                }}
                animate={{
                  y: [-700],
                  x: [0, Math.random() * 50 - 25],
                  rotate: [-10, 10, -10],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 6,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut",
                }}
              >
                <CiMedicalCross />
              </motion.div>
            ))}

            {/* Logo */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -12, 0],
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src="https://i.ibb.co.com/9H990mRT/blood-donation-logo-template-vector-35411128-Photoroom-removebg-preview-removebg-preview.png"
                alt="BloodConnect Logo"
                width={130}
                height={130}
                className=""
                priority
              />

              <motion.h1
                className="mt-2 text-2xl font-black uppercase dark:text-white"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                 <span className="text-[#db0000]">Blood</span>Connect
              </motion.h1>

              <motion.p
                className="mt-3 text-gray-500 uppercase text-md text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Connecting Donors, Saving Lives
              </motion.p>

              
              <div className="flex gap-2 mt-8">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-3 h-3 rounded-full bg-[#db0000]"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: dot * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grow"
        >
          {children}
        </motion.div>
      )}
    </>
  );
}