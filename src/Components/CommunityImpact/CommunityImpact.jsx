"use client";

import React, { useEffect, useState } from 'react';
import { Users, HeartPulse, DollarSign } from 'lucide-react';
import { Card, Chip } from '@heroui/react';
import { motion } from "framer-motion";

const CommunityImpactStats = () => {
    const [stats, setStats] = useState({
        totalDonors: 0,
        totalFunding: 0,
        totalRequests: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImpactMetrics = async () => {
            const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
            try {
                const [usersRes, requestsRes, fundingRes] = await Promise.all([
                    fetch(`${backendUrl}/api/users`).then(res => res.json()).catch(() => []),
                    fetch(`${backendUrl}/api/donationrequest`).then(res => res.json()).catch(() => []),
                    fetch(`${backendUrl}/api/pegination/funding?page=1&limit=1000000`).then(res => res.json()).catch(() => ({ data: [] }))
                ]);


                const activeDonorsCount = usersRes.filter(user =>
                    user?.role?.toLowerCase() === 'donor' &&
                    user?.status?.toLowerCase() === 'active'
                ).length;


                const fundingRecords = fundingRes.data || [];
                const computedGrandTotal = fundingRecords.reduce((sum, item) => sum + Number(item.amount || 0), 0);

                setStats({
                    totalDonors: activeDonorsCount,
                    totalRequests: requestsRes.length,
                    totalFunding: computedGrandTotal
                });
            } catch (error) {
                console.error("Failed to load community impact stats dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImpactMetrics();
    }, []);

    const statsData = [
        {
            id: "total-donors",
            count: loading ? "..." : `${stats.totalDonors.toLocaleString()}`,
            label: "Active Donors",
            icon: Users,
            isHighlighted: false,
        },
        {
            id: "total-funding",
            count: loading ? "..." : `$${stats.totalFunding.toLocaleString()}`,
            label: "Total Funding",
            icon: DollarSign,
            isHighlighted: true,
        },
        {
            id: "total-requests",
            count: loading ? "..." : `${stats.totalRequests.toLocaleString()}+`,
            label: "Blood Requests",
            icon: HeartPulse,
            isHighlighted: false,
        }
    ];

    return (
        <section className="bg-[#db0000]/16 z-10 relative overflow-hidden  rounded-b-4xl text-slate-600 py-13 px-4 sm:px-6 lg:px-8 select-none font-sans antialiased">
            <div className="absolute -top-40 left-1/2 -z-10 -translate-x-1/2 w-[700px] h-[300px] bg-red-400/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="max-w-7xl mx-auto">

                <div className=" gap-4   mb-7">
                    <div>
                        <div className="flex  justify-center items-center  rounded-full  px-3 py-1 mb-2">
                            <Chip color="" className='bg-red-100 text-[#db0000] gap-2'><span className="h-2 w-2  rounded-full bg-red-600 animate-pulse"></span> Live Statistics</Chip>
                        </div>
                        <h3 className="text-4xl text-center font-black text-slate-900 tracking-tight">
                            Community  <span className='text-[#db0000]'>Impact</span>
                        </h3>
                        <p className="text-[1rem] text-gray-500 mt-2 text-center">
                            Track the real-time impact of our community through active donors, blood requests, and <br /> life-saving contributions.
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 -z-10 -right-32 w-[400px] h-[400px] bg-rose-300/20 blur-[140px] rounded-full pointer-events-none" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statsData.map((stat, index) => {
                        const IconComponent = stat.icon;

                        return (

                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, scale: 1.03 }}
                            >
                                <Card
                                    key={stat.id}
                                    className={`relative rounded-[2rem] p-8 transition-all duration-300 ease-out transform hover:-translate-y-1.5 overflow-hidden group ${stat.isHighlighted
                                        ? 'bg-[#E11D48] text-white shadow-lg shadow-rose-600/10 border border-[#E11D48]'
                                        : 'bg-white text-slate-600 border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)]'
                                        }`}
                                >
                                    <div className={`absolute -top-4 -right-4 p-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 ${stat.isHighlighted ? 'text-white opacity-10' : 'text-slate-900'
                                        }`}>
                                        <IconComponent className="w-32 h-32" />
                                    </div>

                                    <div className="flex items-center justify-between gap-4 mb-4">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${stat.isHighlighted ? 'text-rose-200' : 'text-slate-400'
                                            }`}>
                                            {stat.label}
                                        </span>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border ${stat.isHighlighted
                                            ? 'bg-rose-500/30 border-rose-400/20 text-white'
                                            : 'bg-slate-50 border-slate-100 text-slate-900'
                                            }`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <h4 className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${stat.isHighlighted ? 'text-white' : 'text-slate-900'
                                            }`}>
                                            {stat.count}
                                        </h4>
                                    </div>

                                    <div className={`absolute bottom-0 left-8 right-8 h-[3px] rounded-t-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${stat.isHighlighted ? 'bg-white/40' : 'bg-[#db0000]'
                                        }`} />
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
                <div className="absolute bottom-0 -z-10 -left-32 w-[350px] h-[350px] bg-red-300/15 blur-[120px] rounded-full pointer-events-none" />
            </div>
        </section>
    );
};

export default CommunityImpactStats;