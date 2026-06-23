"use client";

import { Button, Pagination, Table } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';

const AllDonationRequest = ({ donationRequest }) => {
    // সেফটি চেকের জন্য ডাটা স্ট্রাকচার হ্যান্ডলিং
    const [requestData, setRequestData] = useState(donationRequest?.data || []);
    const page = donationRequest?.page || 1;
    const totalPages = donationRequest?.totalPage || 1;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const [activeMenuId, setActiveMenuId] = useState(null);

    const toggleDropdown = (id) => {
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    // শুধুমাত্র স্ট্যাটাস আপডেট করার ফাংশন (ভলান্টিয়ার প্রিভিলেজ)
    const handleStatusUpdate = (id, newStatus) => {
        setRequestData(prev => 
            prev.map(req => req._id === id ? { ...req, donationStatus: newStatus } : req)
        );
        setActiveMenuId(null);
        // এখানে ডাটাবেজে ডাটা পাঠানোর জন্য আপনার API পুশ লজিক যুক্ত করতে পারেন:
        // axios.patch(`/api/donation-request/${id}`, { donationStatus: newStatus })
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 min-h-screen pb-24 relative">

            {activeMenuId !== null && (
                <div
                    className="fixed inset-0 z-20 bg-transparent cursor-default"
                    onClick={() => setActiveMenuId(null)}
                />
            )}

            {/* হেডার সেকশন */}
            <header className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-red-50 border border-slate-100 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700">
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                    All Blood Donation Requests <span className="text-red-600 font-extrabold">(Volunteer Access)</span>
                </h1>
                <p className="text-xs md:text-sm text-slate-500 mt-1">Review requests and update the donation operations status.</p>
            </header>

            {requestData.length > 0 ? (
                <section className="space-y-4 relative">

                    {/* ডেস্কটপ ভিউ */}
                    <div className="hidden sm:block overflow-visible rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                        <Table className="overflow-visible">
                            <Table.ScrollContainer className="overflow-visible">
                                <Table.Content aria-label="Requests table" className="min-w-[800px] md:min-w-[1000px] overflow-visible">
                                    <Table.Header>
                                        <Table.Column isRowHeader>Recipient Info</Table.Column>
                                        <Table.Column>Location</Table.Column>
                                        <Table.Column>Date & Time</Table.Column>
                                        <Table.Column>Blood Group</Table.Column>
                                        <Table.Column>Status</Table.Column>
                                        <Table.Column>Donor Information</Table.Column>
                                        <Table.Column className="text-center w-[80px]">Update Status</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {requestData.map((request) => (
                                            <Table.Row key={request._id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 transition-colors overflow-visible">
                                                <Table.Cell className="font-semibold text-slate-900 dark:text-white">{request.recipientName}</Table.Cell>
                                                <Table.Cell className="text-sm text-slate-600 dark:text-slate-300">{request.recipientDistrict}, {request.recipientUpazila}</Table.Cell>
                                                <Table.Cell className="text-xs text-slate-600">
                                                    <div className="font-medium">{request.donationDate}</div>
                                                    <div className="text-slate-400">{request.donationTime}</div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700">{request.bloodGroup}</span>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <span className={`text-xs capitalize px-2.5 py-0.5 rounded-full border font-medium
                                                        ${request.donationStatus === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' : ''}
                                                        ${request.donationStatus === 'inprogress' ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
                                                        ${request.donationStatus === 'done' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : ''}
                                                        ${request.donationStatus === 'canceled' ? 'bg-rose-50 border-rose-200 text-rose-700' : ''}
                                                    `}>{request.donationStatus}</span>
                                                </Table.Cell>
                                                <Table.Cell className="text-xs">
                                                    <div>
                                                        <p className="font-medium text-slate-700 dark:text-slate-300">{request.donorName || "Not Assigned"}</p>
                                                        <p className="text-slate-400 text-[11px] truncate max-w-[150px]">{request.donorEmail || ""}</p>
                                                    </div>
                                                </Table.Cell>

                                                {/* ডেস্কটপ স্ট্যাটাস অ্যাকশন ড্রপডাউন */}
                                                <Table.Cell className="text-center overflow-visible">
                                                    <div className="relative inline-block text-left overflow-visible">
                                                        <button
                                                            onClick={() => toggleDropdown(request._id)}
                                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors focus:outline-hidden relative z-30"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                                        </button>
                                                        {activeMenuId === request._id && (
                                                            <VolunteerActionMenu request={request} onStatusUpdate={handleStatusUpdate} />
                                                        )}
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                            <Table.Footer>
                                <Pagination size="sm">
                                    <Pagination.Content>
                                        <Pagination.Item>
                                            <Pagination.Previous isDisabled={page === 1}>
                                                <Link className='flex gap-1' href={`/dashboard/volunteer/all-blood-donation-request?page=${page - 1}`}>
                                                    <Pagination.PreviousIcon /> Prev
                                                </Link>
                                            </Pagination.Previous>
                                        </Pagination.Item>
                                        {pages.map((p) => (
                                            <Pagination.Item key={p}>
                                                <Link href={`/dashboard/volunteer/all-blood-donation-request?page=${p}`}>
                                                    <Pagination.Link isActive={p === page}>
                                                        {p}
                                                    </Pagination.Link>
                                                </Link>
                                            </Pagination.Item>
                                        ))}
                                        <Pagination.Item>
                                            <Pagination.Next isDisabled={page === totalPages}>
                                                <Link className='flex gap-1' href={`/dashboard/volunteer/all-blood-donation-request?page=${page + 1}`}>
                                                    Next <Pagination.NextIcon />
                                                </Link>
                                            </Pagination.Next>
                                        </Pagination.Item>
                                    </Pagination.Content>
                                </Pagination>
                            </Table.Footer>
                        </Table>
                    </div>

                    {/* মোবাইল ভিউ */}
                    <div className="block sm:hidden space-y-4">
                        {requestData.map((request) => (
                            <div key={request._id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 relative">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-base">{request.recipientName}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">{request.recipientDistrict}, {request.recipientUpazila}</p>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => toggleDropdown(request._id)}
                                            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 focus:outline-hidden relative z-30"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                        </button>
                                        {activeMenuId === request._id && (
                                            <VolunteerActionMenu request={request} onStatusUpdate={handleStatusUpdate} isMobile />
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-100 dark:border-slate-800">
                                    <div>
                                        <span className="text-slate-400 block mb-0.5">Blood Group</span>
                                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700">{request.bloodGroup}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block mb-0.5">Status</span>
                                        <span className={`capitalize font-bold
                                            ${request.donationStatus === 'pending' ? 'text-amber-600' : ''}
                                            ${request.donationStatus === 'inprogress' ? 'text-blue-600' : ''}
                                            ${request.donationStatus === 'done' ? 'text-emerald-600' : ''}
                                            ${request.donationStatus === 'canceled' ? 'text-rose-600' : ''}
                                        `}>{request.donationStatus}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-slate-400 block mb-0.5">Schedule</span>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{request.donationDate} at {request.donationTime}</span>
                                    </div>
                                    <div className="col-span-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg mt-1">
                                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Hospital Details</span>
                                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">{request.hospitalName}</span>
                                        <span className="text-slate-500 text-[11px] block truncate">{request.fullAddressLine}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
            ) : (
                <div className="text-center p-12 border border-dashed rounded-xl text-slate-400">
                    No blood donation requests found.
                </div>
            )}
        </div>
    );
};

// ভলান্টিয়ার এক্সক্লুসিভ অ্যাকশন মেনু (শুধুমাত্র স্ট্যাটাস কন্ট্রোল করার জন্য)
const VolunteerActionMenu = ({ request, onStatusUpdate, isMobile = false }) => {
    return (
        <div className={`absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-lg focus:outline-hidden ${isMobile ? 'top-8' : ''}`}>
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 mb-1">
                Change Status
            </div>
            
            <button 
                onClick={() => onStatusUpdate(request._id, 'pending')} 
                className={`flex w-full items-center px-3 py-2 text-left text-xs font-medium rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/20 text-amber-600 ${request.donationStatus === 'pending' ? 'bg-amber-50/60 font-bold' : ''}`}
            >
                Set to Pending
            </button>
            
            <button 
                onClick={() => onStatusUpdate(request._id, 'inprogress')} 
                className={`flex w-full items-center px-3 py-2 text-left text-xs font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 text-blue-600 ${request.donationStatus === 'inprogress' ? 'bg-blue-50/60 font-bold' : ''}`}
            >
                Set to In Progress
            </button>
            
            <button 
                onClick={() => onStatusUpdate(request._id, 'done')} 
                className={`flex w-full items-center px-3 py-2 text-left text-xs font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-emerald-600 ${request.donationStatus === 'done' ? 'bg-emerald-50/60 font-bold' : ''}`}
            >
                Mark as Done
            </button>
            
            <button 
                onClick={() => onStatusUpdate(request._id, 'canceled')} 
                className={`flex w-full items-center px-3 py-2 text-left text-xs font-medium rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 ${request.donationStatus === 'canceled' ? 'bg-rose-50/60 font-bold' : ''}`}
            >
                Mark as Canceled
            </button>
        </div>
    );
};

export default AllDonationRequest;