
import ProfileAdmin from '@/Components/dashboardComponents/AdminComponents/Profile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const AdminProfilepage = async () => {


    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user


    const baseurl = process.env.NEXT_PUBLIC_BASE_URL

    const res = await fetch(`${baseurl}/api/own/users?email=${user?.email}`)

    const userData = await res.json()






    return (
        <div className='pt-10 min-h-screen bg-white/10'>
            <section className="bg-gradient-to-r max-w-7xl  mx-auto from-[#db0000]/20 to-red-50 text-white py-12 px-6 sm:px-8 lg:px-10 rounded-2xl   mt-6 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white">
                            Profile Settings
                        </h1>
                        <p className="md:text-[1rem]  text-sm text-slate-500 dark:text-gray-300 mt-1">View and update your personal information and account details.</p>
                    </div>

                    <h1 className='  uppercase text-right text-[#db0000] font-bold '>{user?.role}</h1>

                </div>
            </section>
            <ProfileAdmin userData={userData}></ProfileAdmin>
        </div>
    );
};

export default AdminProfilepage;