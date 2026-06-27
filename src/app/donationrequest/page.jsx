import DonationRequestCard from '@/Components/DonationRequestCard/DonationRequestCard';
import React from 'react';
import NoRequestsFound from './empty';

const DonationRequestpage = async () => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseurl}/api/donationrequest`)
    const donationRequest = await res.json()


    const pendingRequests = donationRequest.filter(req => req.donationStatus === 'pending')




    return (
        <div className="min-h-screen p-4 mt-30 md:p-8 lg:p-12 bg-slate-50/50 dark:bg-slate-950 pb-32">
            <div className="max-w-7xl mx-auto space-y-8">


                <div className="space-y-2 text-center">
                    <h1 className="text-2xl md:text-4xl  font-black text-slate-900 dark:text-white tracking-tight">
                        Blood Donation Requests
                    </h1>
                    <p className="text-[1rem] text-gray-500 ">
                       Find active blood donation requests, review the details, and donate blood to support patients in urgent need.
                    </p>
                </div>

                {pendingRequests.length === 0 ? (
                    <NoRequestsFound></NoRequestsFound>
                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {pendingRequests.map((request) => (
                            <DonationRequestCard key={request._id} request={request} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default DonationRequestpage;