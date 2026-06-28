import EditRequestForm from '@/Components/dashboardComponents/DonorComponents/EditRequestForm';
import { auth } from '@/lib/auth';
import { ArrowLeft, ChevronLeft } from '@gravity-ui/icons';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';


const Editpage = async ({ params }) => {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-white/10 py-10 px-4 md:px-8">


            <div className="max-w-5xl mx-auto mt-12 mb-8  flex items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
                <Link
                    href={`/dashboard/${user.role}/my-donation-requests`}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/17 dark:text-white  transition-all duration-200 hover:bg-red-600 hover:text-white hover:border-red-600"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Link>

                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Edit Donation Request
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-gray-300 max-w-2xl">
                        Keep your donation request accurate by updating the necessary information below.
                    </p>
                </div>
            </div>



            <div className="max-w-5xl mx-auto bg-white dark:bg-white/20 rounded-2xl border border-slate-200  shadow-xl p-6 md:p-8">


                <EditRequestForm id={id} />
            </div>
        </div>
    );
};

export default Editpage;