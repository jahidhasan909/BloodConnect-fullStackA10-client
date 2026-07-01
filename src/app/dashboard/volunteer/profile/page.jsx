import Profilevolunteer from '@/Components/dashboardComponents/VolunteerComponents/Profile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const VolunteerProfilepage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user


    const baseurl = process.env.NEXT_PUBLIC_BASE_URL

    const res = await fetch(`${baseurl}/api/own/users?email=${user?.email}`)

    const userData = await res.json()

    return (
        <div className='py-17 lg:py-10 px-2 min-h-screen  bg-white/10'>
          
            <section className="bg-gradient-to-r max-w-11/12  mx-auto from-[#db0000]/20 to-red-50 text-white  py-12 px-6 sm:px-8 lg:px-10 rounded-2xl  shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white">
                            Profile Settings
                        </h1>
                        <p className="lg:text-[1rem] text-xs text-slate-500 dark:text-gray-300 mt-1">View and update your personal information and account details.</p>
                    </div>

                      <h1 className='  uppercase text-right text-[#db0000] font-bold '>{user?.role}</h1>

                </div>
            </section>
            <Profilevolunteer userData={userData}></Profilevolunteer>
        </div>
    );
};

export default VolunteerProfilepage;