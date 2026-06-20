import DonationRequestCard from '@/Components/DonationRequestCard/DonationRequestCard';
import React from 'react';

const DonationRequestpage = async () => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseurl}/api/donationrequest`)
    const donationRequest = await res.json()
 

    const pendingRequests = donationRequest.filter(req => req.donationStatus === 'pending')
    
    


    return (
        <div className="min-h-screen p-4 mt-10 md:p-8 lg:p-12 bg-slate-50/50 dark:bg-slate-950 pb-32">
            <div className="max-w-7xl mx-auto space-y-8">

               
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                     Donation Requests
                    </h1>
                    <p className="text-sm text-slate-500 max-w-md">
                        Review active emergency urgent notifications and help save a life today.
                    </p>
                </div>

                {pendingRequests.length === 0 ? (
                    <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-medium text-slate-400">No active pending requests found at this hour.</p>
                    </div>
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