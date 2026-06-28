import React from 'react';
import { Card } from "@heroui/react";
import { DonationConfirmeModal } from '@/Components/DonationRequestCard/DonationConfirmeModal';
import { CalendarDays, Clock3, Hospital, MapPin, UserRound } from 'lucide-react';




const DonationDetailspage = async ({ params }) => {






    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const { id } = await params
    const res = await fetch(`${baseurl}/api/donationrequest/${id}`)
    const donationRequest = await res.json()








    return (
        <div className="min-h-screen p-4 md:py-40 bg-slate-50/50 dark:bg-white/10">

           <div className='mx-auto container'>
             <div className='text-center'>
                <h1 className='text-4xl font-bold'>Request Overview</h1>
                <p className='text-[1rem] mt-2 text-gray-500 dark:text-gray-300'>View complete details before confirming your blood donation.</p>
            </div>

            <Card className="mx-auto mt-8 rounded-[32px] relative  overflow-hidden border border-slate-200 bg-white dark:bg-white/20 p-8 shadow-sm">

            
                <div className="flex flex-col md:flex-row justify-between gap-6 border-b dark:border-white/30 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-white/16 flex items-center justify-center">
                            <UserRound className="h-8 w-8 text-[#db0000]" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-black">{donationRequest.recipientName}</h2>
                            <p className="text-gray-500 mt-2 dark:text-gray-300 uppercase tracking-widest text-xs">
                                Recipient • Patient
                            </p>
                        </div>
                    </div>

               
                       

                        <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1.5 rounded-bl-2xl font-black text-sm tracking-wide shadow-xs">
                            Blood Group : {donationRequest.bloodGroup}
                  
                    </div>
                </div>

               
                <div className="grid md:grid-cols-2 gap-8 py-8">

                    <div className="space-y-6">

                        <div className="flex gap-4">
                            <Hospital className="text-green-600 mt-1" />
                            <div>
                                <p className="text-xs uppercase text-gray-400 dark:text-gray-300 font-bold">
                                    Hospital
                                </p>

                                <h3 className="font-bold">
                                    {donationRequest.hospitalName}
                                </h3>

                                <p className="text-gray-500 dark:text-gray-300">
                                    {donationRequest.recipientDistrict}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <MapPin className="text-red-500 mt-1" />

                            <div>
                                <p className="text-xs uppercase text-gray-400 dark:text-gray-300 font-bold">
                                    Address
                                </p>

                                <h3 className="font-semibold">
                                    {donationRequest.fullAddressLine}
                                </h3>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-6">

                        <div className="flex gap-4">
                            <CalendarDays className="text-pink-500 mt-1" />

                            <div>
                                <p className="text-xs uppercase text-gray-400 dark:text-gray-300 font-bold">
                                    Required Date
                                </p>

                                <h3 className="font-bold">
                                    {donationRequest.donationDate}
                                </h3>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Clock3 className="mt-1" />

                            <div>
                                <p className="text-xs uppercase text-gray-400 dark:text-gray-300 font-bold">
                                    Time
                                </p>

                                <h3 className="font-bold">
                                    {donationRequest.donationTime}
                                </h3>
                            </div>
                        </div>

                    </div>

                </div>

               

                <div className="rounded-2xl bg-amber-50 dark:bg-white/18 border border-amber-100 p-5">

                    <p className="text-xs uppercase font-bold tracking-widest text-amber-700">
                        Request Message
                    </p>

                    <p className="italic text-gray-700 mt-2 dark:text-white">
                        {donationRequest.requestMessage}
                    </p>

                </div>

                {/* Footer */}

                <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-5">

                    <div>

                        <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-300">
                            Requested By
                        </p>

                        <h3 className="font-bold">
                            {donationRequest.requesterName}
                        </h3>

                        <p className="text-gray-500 text-sm dark:text-gray-300">
                            {donationRequest.requesterEmail}
                        </p>

                    </div>

                    <DonationConfirmeModal donationRequest={donationRequest} />

                </div>

            </Card>
           </div>

        </div>
    );
};

export default DonationDetailspage;