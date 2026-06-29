"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">

        
        <div className="relative flex items-center justify-center w-24 h-24">
          <motion.div
            className="absolute inset-0 rounded-full border-[5px] border-red-100 border-t-[#db0000] border-r-[#ff5a5a]"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-10 h-10 text-[#db0000]"
            fill="currentColor"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </motion.svg>
        </div>

        <motion.h1
          className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#db0000] ">Blood</span>Connect
        </motion.h1>

        
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-300 uppercase"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          Connecting lives
        </motion.p>

      </div>
    </div>
  );
}