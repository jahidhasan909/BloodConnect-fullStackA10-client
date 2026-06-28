"use client";

import React, { useEffect, useState } from 'react';
import {
    Search,
    Flame,
    ShieldCheck,
    Layers,
    Lock,
    ArrowRight,
    HeartHandshake,
    MapPin,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";

const FeaturedSection = () => {

    const [metrics, setMetrics] = useState({
        totalDonors: 0,
        totalRequests: 0,
        districtCount: 0,
        availableGroups: [],
        latestStatus: 'Pending',
        loading: true
    });

    useEffect(() => {
        const fetchSystemMetrics = async () => {
            const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
            try {

                const [usersRes, requestsRes, fundingRes] = await Promise.all([
                    fetch(`${backendUrl}/api/users`).then(res => res.json()).catch(() => []),
                    fetch(`${backendUrl}/api/donationrequest`).then(res => res.json()).catch(() => []),
                    fetch(`${backendUrl}/api/pegination/funding?page=1&limit=1`).then(res => res.json()).catch(() => ({ totalPage: 1 }))
                ]);


                const activeDonorsCount = usersRes.filter(user =>
                    user?.role?.toLowerCase() === 'donor' &&
                    user?.status?.toLowerCase() === 'active'
                ).length;

                const districts = new Set();
                requestsRes.forEach(req => {
                    if (req.location) {
                        const district = req.location.split(',')[0].trim();
                        if (district) districts.add(district);
                    }
                });


                const bloodGroups = new Set();
                usersRes.forEach(user => {
                    if (user.bloodGroup) bloodGroups.add(user.bloodGroup.toUpperCase());
                });


                const latestRequestStatus = requestsRes.length > 0
                    ? requestsRes[requestsRes.length - 1].status
                    : 'Fully Operational';

                setMetrics({
                    totalDonors: activeDonorsCount,
                    totalRequests: requestsRes.length,
                    districtCount: districts.size || 1,
                    availableGroups: bloodGroups.size > 0 ? Array.from(bloodGroups).slice(0, 6) : ['A+', 'O+', 'AB+', 'B-', 'O-', 'AB-', 'B+'],
                    latestStatus: latestRequestStatus,
                    loading: false
                });

            } catch (error) {
                console.error("Failed to parse infrastructure metrics dashboard:", error);
                setMetrics(prev => ({ ...prev, loading: false }));
            }
        };

        fetchSystemMetrics();
    }, []);

    return (
        <section className="bg-slate-50 dark:bg-white/10 dark:mt-4 dark:rounded-t-2xl text-slate-600 py-24 px-4 sm:px-6 lg:px-8 select-none font-sans overflow-hidden antialiased">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    viewport={{ once: true }}
                >

                <div className="mb-10 space-y-3  text-center">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                        Why Choose BloodConnect
                    </h2>
                    <p className="text-base sm:text-[1rem] text-gray-500 dark:text-gray-300  font-normal leading-relaxed">
                        Connect with verified donors and get blood support when it matters most.
                    </p>
                </div>
                </motion.div>
               


                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    viewport={{ once: true }}
                >

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px] md:auto-rows-[300px]">


                        <div className="relative md:col-span-2 row-span-1 bg-white dark:bg-white/15 border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden group">
                            <div className="max-w-md space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 dark:text-white dark:bg-white/10 shadow-sm">
                                    <Search className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight dark:text-white">
                                    Find Nearby Blood Donors
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-300 leading-relaxed">
                                    Search and connect with available blood donors in your area within minutes.
                                </p>
                            </div>

                            <div className="absolute bottom-0 right-0 bg-slate-50 dark:bg-white/20 pl-4 pt-4 rounded-tl-[2rem] border-t border-l border-slate-100 ">
                                <Link href={'/searchdonor'} className=''>
                                    <button className="bg-white dark:bg-white/16 hover:cursor-pointer border border-slate-200 hover:border-[#E11D48] text-slate-900 hover:text-[#E11D48] text-xs font-bold px-6 py-3.5 rounded-[1.5rem] flex items-center gap-2 transition-all duration-300 shadow-sm">
                                        Find Donors <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </Link>
                            </div>
                        </div>




                        <div className="relative bg-white dark:bg-white/15 border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden group">
                            <div className="space-y-3">
                                <div className="w-10 h-10  rounded-xl bg-rose-50 dark:bg-white/14 flex items-center justify-center text-[#E11D48]">
                                    <Flame className="w-5 h-5 animate-pulse" fill="currentColor" />
                                </div>
                                <h4 className="text-lg font-bold dark:text-white text-slate-900 tracking-tight">Emergency Requests</h4>
                                <p className="text-xs text-slate-500 dark:text-gray-300 leading-relaxed">
                                    Create urgent blood requests and instantly notify nearby eligible donors.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                <Clock className="w-3.5 h-3.5 text-[#E11D48]" />
                                Active Queue: <span className="text-slate-900 dark:text-gray-400 font-bold">{metrics.loading ? '...' : metrics.totalRequests} items</span>
                            </div>
                        </div>

                        <div className="bg-white border dark:bg-white/15 border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/13 dark:text-white border border-slate-100 flex items-center justify-center text-slate-900">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Group Availability</h4>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-300 leading-relaxed">
                                    Real-time matching blood groups indexed in the system.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-2">
                                {metrics.availableGroups.map((type) => (
                                    <span key={type} className="text-[10px] font-extrabold bg-slate-50 border border-slate-200/60 dark:bg-white/20 dark:text-white text-slate-700 px-2.5 py-1 rounded-lg tracking-wide uppercase">
                                        {type} Match
                                    </span>
                                ))}
                            </div>
                        </div>


                        <div className="bg-white  border  border-slate-200/60 dark:bg-white/15 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-2.5 w-full">
                                {[
                                    { count: metrics.loading ? "..." : `${metrics.totalDonors}`, label: "Total Donors" },
                                    { count: metrics.loading ? "..." : `${metrics.totalRequests}`, label: "Requests Filed" },
                                    { count: metrics.loading ? "..." : `${metrics.districtCount}`, label: "Districts Base" },
                                    { count: "100%", label: "TLS Secure" }
                                ].map((metric, idx) => (
                                    <div key={idx} className="bg-slate-50/70 dark:bg-white/15 border border-slate-100 p-3 rounded-2xl">
                                        <div className="text-base font-black dark:text-white text-slate-900 tracking-tight">{metric.count}</div>
                                        <div className="text-[10px] text-slate-400 dark:text-gray-300 font-medium tracking-wide uppercase mt-0.5">{metric.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
                                <span>Platform Status:</span>
                                <span className="text-[#E11D48] font-bold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Online
                                </span>
                            </div>
                        </div>


                        <div className="relative md:col-span-2 dark:bg-white/15 row-span-1 bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden">

                            
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative flex-shrink-0 w-32 h-32 rounded-full border-4 border-slate-50 bg-slate-50/50 dark:bg-white/10 flex items-center justify-center p-2"
                            >
                                <div className="w-full h-full rounded-full bg-rose-50/50 border border-rose-100 dark:bg-white/5 flex flex-col items-center justify-center text-center">
                                    
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, -10, 10, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <ShieldCheck className="w-7 h-7 text-[#E11D48]" />
                                    </motion.div>
                                </div>
                            </motion.div>

                            <div className="space-y-2 flex-1 text-center  md:text-left pb-16 md:pb-0">
                                <span className="inline-flex items-center gap-1 text-[10px] text-[#E11D48] bg-rose-50 dark:bg-white/13 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                                    Donation Requests
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Explore Blood Requests</h3>
                                <p className="text-xs text-slate-500 dark:text-gray-300 leading-relaxed max-w-md">
                                    Browse all active blood donation requests, check their current status, and find opportunities to help those in need.
                                </p>
                            </div>

                            <div className="absolute bottom-0 right-0 bg-slate-50 dark:bg-white/20 pl-4 pt-4 rounded-tl-[2rem] border-t border-l border-slate-100">
                                <Link href={'/donationrequest'}>
                                    <button className="bg-white dark:bg-white/20 dark:text-white border border-slate-200 hover:border-rose-400 text-slate-700 text-xs font-bold px-5 py-3 rounded-[1.25rem] hover:text-rose-400 transition-all duration-300 shadow-sm hover:cursor-pointer">
                                        View Request
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white border dark:bg-white/15 border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between group">
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border dark:bg-white/13 dark:text-white border-slate-100 flex items-center justify-center text-slate-900">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#E11D48] transition-colors duration-300">
                                    Secure & Verified
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-gray-300 leading-relaxed">
                                    Connect with verified donors through a safe and trusted platform.
                                </p>
                            </div>
                            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-[11px] text-slate-400">
                                <span className="flex items-center gap-1"><HeartHandshake className="w-3.5 h-3.5 text-slate-400" /> Compliance</span>
                                <span className="text-slate-600 font-semibold flex items-center dark:text-gray-300 gap-1"><MapPin className="w-3 h-3 text-[#E11D48]" /> TLS Secured</span>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedSection;