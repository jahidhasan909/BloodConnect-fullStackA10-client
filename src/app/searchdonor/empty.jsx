"use client";

import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

const NoRequestsFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-4"
        >

            <div className="relative flex items-center justify-center w-24 h-24 mb-2">

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#db0000]"
                />

                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-full  dark:bg-rose-950/30 flex items-center justify-center"
                >
                    <Droplets className="w-17 h-8 text-[#db0000]" strokeWidth={1.5} />
                </motion.div>
            </div>


            <div className="space-y-1">
                <h3 className="text-lg  text-gray-600 dark:text-slate-100">
                    Ready to Find a Donor?
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                    Choose the required blood group and location above, then click
                    <span className="font-medium text-red-600"> Search Donors </span>
                    to see matching donors.
                </p>
            </div>
        </motion.div>
    );
};

export default NoRequestsFound;