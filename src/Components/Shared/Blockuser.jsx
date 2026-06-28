"use client";

import { motion } from "framer-motion";
import { ShieldX } from "lucide-react";

export default function BlockedUser() {
  return (
    <div className="flex items-center justify-center mt-19 min-h-[70vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden max-w-xl w-full rounded-[32px] border border-red-200/50 bg-white shadow-[0_25px_60px_rgba(220,38,38,0.15)]"
      >
       
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-red-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-rose-100 blur-3xl" />

        <div className="relative z-10 p-10 text-center">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 0 rgba(220,38,38,.25)",
                "0 0 35px rgba(220,38,38,.45)",
                "0 0 0 rgba(220,38,38,.25)",
              ],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
            }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700"
          >
            <ShieldX size={42} className="text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            className="mt-8 text-3xl font-black text-gray-900"
          >
            Account Temporarily Blocked
          </motion.h2>

          <p className="mt-4 text-gray-600 leading-8">
            Your account has been temporarily restricted by the administrator.
            You can't create a donation request until your account is reviewed
            and reactivated.
          </p>

          <div className="mt-8 rounded-2xl bg-red-50 border border-red-100 p-5">
            <p className="text-sm text-red-600 font-medium">
              If you think this is a mistake, please contact the administrator
              for assistance.
            </p>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2 }}
            className="mt-8 h-1 rounded-full bg-gradient-to-r from-red-500 via-rose-400 to-red-500"
          />
        </div>
      </motion.div>
    </div>
  );
}