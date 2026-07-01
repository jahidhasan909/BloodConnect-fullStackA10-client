import DonationRequestCard from '@/Components/DonationRequestCard/DonationRequestCard';
import React from 'react';
import NoRequestsFound from './empty';
import MotionWtihCard from '@/Components/DonationRequestCard/MotionWtihCard';

const DonationRequestpage = async () => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseurl}/api/donationrequest`, { cache: "no-store", })
    const donationRequest = await res.json()


    const pendingRequests = donationRequest.filter(req => req.donationStatus === 'pending')






    return (
        <div className="min-h-screen py-28 md:py-40 bg-slate-50/50 dark:bg-white/10 ">
            <div className="max-w-11/12 mx-auto space-y-8">


                <div className="space-y-2 text-center mb-12">
                    <h1 className="text-2xl lg:text-4xl  font-black text-slate-900 dark:text-white tracking-tight">
                        Blood Donation Requests
                    </h1>
                    <p className="text-xs px-2 mt-2 md:text-[1rem] text-gray-500 dark:text-gray-300">
                        Find active blood donation requests, review the details, and donate blood to support <br /> patients in urgent need.
                    </p>
                </div>

                {pendingRequests.length === 0 ? (
                    <NoRequestsFound></NoRequestsFound>
                ) : (


                    <MotionWtihCard pendingRequests={pendingRequests}></MotionWtihCard>

                )}

            </div>
        </div>
    );
};

export default DonationRequestpage;