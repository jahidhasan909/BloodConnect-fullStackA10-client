"use client";


import { Users, HeartPulse, DollarSign, Activity } from 'lucide-react';
import { Card } from '@heroui/react';
import { getUserCollactions } from '@/lib/api/usercollaction';
import { useEffect, useState } from "react";
import { getAllDonationRequest } from '@/lib/api/allDonationRequest';
import { authClient } from '@/lib/auth-client';
import Loader from '@/Components/Shared/Loading';



export default function AdminHomeAllCards() {

    const { data, isPending } = authClient.useSession()


    const user = data?.user

    const [users, setUsers] = useState([]);
    const [bloodRequest, setbloodRequest] = useState([]);

    const [totalFunding, setTotalFunding] = useState(0);

    useEffect(() => {
        const fetchFunding = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/funding`);
            const data = await res.json();

            const total = data.reduce((sum, item) => {
                return sum + Number(item.amount);
            }, 0);

            setTotalFunding(total);
        };

        fetchFunding();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUserCollactions();
                const bloodres = await getAllDonationRequest();
                setUsers(data);
                setbloodRequest(bloodres)
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);
 
    const usersBaseRole = users.filter(user =>
        user?.role?.toLowerCase() === 'donor' &&
        user?.status?.toLowerCase() === 'active').length
    const allBloodRequest = bloodRequest.length





    const statsData = [
        {
            id: "total-donors",
            count: `${usersBaseRole}+`,
            label: "Total Users (Donors)",
            icon: Users,
            isHighlighted: false,
        },
        {
            id: "total-funding",
            count: `$${totalFunding.toLocaleString()}`,
            label: "Total Funding",
            icon: DollarSign,
            isHighlighted: true,
        },
        {
            id: "total-requests",
            count: `${allBloodRequest}+`,
            label: "Blood Requests",
            icon: HeartPulse,
            isHighlighted: false,
        }
    ];

    if (isPending) {
        return <Loader></Loader>
    }

    return (
        <div className="w-full min-h-screen bg-white container mx-auto mt-10">
            <h1 className=' uppercase text-right text-[#db0000] font-bold mb-13 px-10'>{user?.role}</h1>

            <section className="bg-gradient-to-r from-[#db0000]/20 to-red-50 text-white py-12 px-6 sm:px-8 lg:px-12 rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-6 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white">
                            Welcome back, <span className="text-[#db0000] font-extrabold">{user?.name || "Donor"}</span> !
                        </h1>
                        <p className="text-[1rem] md:text-sm text-slate-500 mt-1">Monitor platform activity, manage users, and oversee blood donation requests from a centralized dashboard.</p>
                    </div>

                </div>
            </section>


            <section className="text-slate-600 py-10 px-4 sm:px-6 lg:px-8 select-none font-sans antialiased">
                <div className="max-w-7xl mx-auto">




                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {statsData.map((stat) => {
                            const IconComponent = stat.icon;

                            return (
                                <Card
                                    key={stat.id}
                                    className={`relative rounded-[2rem] p-8 transition-all duration-300 ease-out transform hover:-translate-y-1.5 overflow-hidden group ${stat.isHighlighted
                                        ? 'bg-[#E11D48] text-white shadow-lg shadow-rose-600/10 border border-[#E11D48]'
                                        : 'bg-white text-slate-600 border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)]'
                                        }`}
                                >


                                    <div className={`absolute -top-4 -right-4 p-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 ${stat.isHighlighted ? 'text-white opacity-[0.14]' : 'text-slate-900'
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


                                    <div className="mb-2">
                                        <h4 className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${stat.isHighlighted ? 'text-white' : 'text-slate-900'
                                            }`}>
                                            {stat.count}
                                        </h4>
                                    </div>


                                    <div className={`absolute bottom-0 left-8 right-8 h-[3px] rounded-t-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${stat.isHighlighted ? 'bg-white/40' : 'bg-[#E11D48]'
                                        }`} />
                                </Card>
                            );
                        })}
                    </div>

                </div>
            </section>

        </div>
    );
}