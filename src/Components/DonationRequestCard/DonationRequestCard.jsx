'use client';

import React from 'react';
import { Card, Button } from "@heroui/react";
import Link from 'next/link';

const DonationRequestCard = ({ request }) => {
    return (
        <Card 
            variant="transparent"
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
        >
            <div className="space-y-4">
              
                <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 flex items-center justify-center">
                        <span className="text-sm font-black text-red-600 dark:text-red-400 uppercase">
                            {request.bloodGroup}
                        </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/30">
                        {request.donationStatus}
                    </span>
                </div>

           
                <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight truncate">
                        {request.recipientName}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium truncate">
                        {request.hospitalName}
                    </p>
                </div>

               
                <div className="pt-2 space-y-2 border-t border-slate-50 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                        <span className="truncate">{request.recipientUpazila}, {request.recipientDistrict}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/></svg>
                        <span>{request.donationDate} at {request.donationTime}</span>
                    </div>
                </div>
            </div>

           
            <div className="pt-5 mt-auto">
                <Link href={`/donation-request/view/${request._id}`} passHref className="w-full block">
                    <Button 
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 rounded-xl text-xs font-semibold h-9 shadow-xs"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default DonationRequestCard;