'use client'
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

const DonorMarquee = () => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const [activeDonors, setActiveDonors] = useState([])

    useEffect(() => {
        fetch(`${baseurl}/api/users`)
            .then(res => res.json())
            .then(data => {

                const filtered = data.filter(user =>
                    user.status === 'active' && user.role === 'donor'
                );
                setActiveDonors(filtered);
            })
            .catch(err => console.error("Error fetching donors:", err));
    }, [baseurl]);

    return (
        <div className="w-full py-2 bg-red-50 dark:bg-white/20 ">

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <Marquee className=' grayscale  container mx-auto hover:grayscale-0' speed={80} pauseOnHover={true} gradient={true} gradientColor={[255, 255, 255]}>
                    {activeDonors.map((donor) => (
                        <div
                            key={donor._id}
                            className="flex relative overflow-hidden items-center gap-2  mx-3 max-w-[250px]  p-4 bg-slate-50 dark:bg-white/30 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >

                            <img
                                src={donor.image}
                                alt={donor.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                            />


                            <div className="flex flex-col pr-13">
                                <h3 className="font-bold text-gray-800">{donor.name}</h3>
                                <p className="text-sm text-gray-500 truncate">{donor.upazila}, {donor.district}</p>
                            </div>

                            <div className="absolute  right-0  top-0  bg-red-600 text-white px-4 py-1.5 rounded-bl-2xl font-black text-sm tracking-wide shadow-xs">
                                {donor?.bloodGroup}
                            </div>
                        </div>
                    ))}
                </Marquee>
            </motion.div>
        </div>
    );
};

export default DonorMarquee;