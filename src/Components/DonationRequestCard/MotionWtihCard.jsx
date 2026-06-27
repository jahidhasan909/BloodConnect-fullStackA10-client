"use client"
import React from 'react';
import { motion } from 'framer-motion'
import DonationRequestCard from './DonationRequestCard';

const MotionWtihCard = ({ pendingRequests }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pendingRequests.map((request, index) => (

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    key={request._id}>
                    <DonationRequestCard key={request._id} request={request} />
                </motion.div>
            ))}
        </div>
    );
};

export default MotionWtihCard;