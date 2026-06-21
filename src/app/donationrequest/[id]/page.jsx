import React from 'react';
import { Card } from "@heroui/react";
import { DonationConfirmeModal } from '@/Components/DonationRequestCard/DonationConfirmeModal';


const DonationDetailspage = async ({ params }) => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const { id } = await params
    const res = await fetch(`${baseurl}/api/donationrequest/${id}`)
    const donationRequest = await res.json()

    if (!donationRequest) {
        return <div className="text-center p-10 text-sm text-slate-400">No request details found.</div>;
    }

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-slate-50/50 dark:bg-slate-950 flex justify-center items-center">
         
            <Card className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xs" variant="transparent">
                
             
                <div className="pb-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
                    <div>
                        <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 dark:bg-red-950/30 px-3 py-1 rounded-xl border border-red-100/60 dark:border-red-900/40">
                            Blood Group {donationRequest.bloodGroup}
                        </span>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-3">
                            {donationRequest.recipientName}
                        </h1>
                        <p>{donationRequest.donationStatus}</p>
                    </div>
                </div>

             
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-sm">
                    <div className="space-y-1">
                        <span className="text-xs text-slate-400 font-medium block">Hospital Target</span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{donationRequest.hospitalName}</p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-slate-400 font-medium block">Full Address</span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{donationRequest.fullAddressLine}</p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-slate-400 font-medium block">Location Context</span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {donationRequest.recipientUpazila}, {donationRequest.recipientDistrict}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-slate-400 font-medium block">Schedule Timeline</span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {donationRequest.donationDate} at {donationRequest.donationTime}
                        </p>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                        <span className="text-xs text-slate-400 font-medium block">Requester Metadata</span>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {donationRequest.requesterName} ({donationRequest.requesterEmail})
                        </p>
                    </div>

                    <div className="space-y-2 sm:col-span-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100/50 dark:border-slate-800">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Message Instruction Note</span>
                        <p className="text-slate-700 dark:text-slate-300 italic text-xs leading-relaxed">{donationRequest.requestMessage || 'No specific requests provided by user.'}
                        </p>
                    </div>
                </div>

               

                <DonationConfirmeModal donationRequest={donationRequest}></DonationConfirmeModal>

            </Card>

        </div>
    );
};

export default DonationDetailspage;