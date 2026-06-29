'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button } from "@heroui/react";
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import Loader from '@/Components/Shared/Loading';
import NoRequestsFound from './empty';
import toast from 'react-hot-toast';


const DonorDashboardPage = () => {
    const { data, isPending } = authClient.useSession()
    const user = data?.user

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const [myrequest, setMyRequest] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`${baseurl}/api/my/donationrequest?requesterEmail=${user?.email}`)
                .then(res => res.json())
                .then(data => setMyRequest(data))
        }
    }, [user?.email, baseurl])

    const donationRequests = myrequest;

    const [activeMenuId, setActiveMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequestToDelete, setSelectedRequestToDelete] = useState(null);

    const toggleDropdown = (id) => {
        setActiveMenuId(activeMenuId === id ? null : id);
    };


    const handleStatusUpdate = async (id, newStatus) => {
        if (newStatus === 'done' || newStatus === 'canceled') {
            try {

                const res = await fetch(`${baseurl}/api/donationrequest/${newStatus}/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (res.ok) {
                    toast.success('Status updated Successfully ! ')
                    setMyRequest(prev => prev.map(req => req._id === id ? { ...req, donationStatus: newStatus } : req));
                } else {
                    toast.error(`Failed to update status to ${newStatus} on the server.`)
                }
            } catch (error) {
                toast.error(`Error updating status to ${newStatus}:`, error)

            }
        } else {

            setMyRequest(prev => prev.map(req => req._id === id ? { ...req, donationStatus: newStatus } : req));
        }
        setActiveMenuId(null);
    };

    const triggerDelete = (id) => {
        setSelectedRequestToDelete(id);
        setIsModalOpen(true);
        setActiveMenuId(null);
    };

    const confirmDelete = async () => {
        if (!selectedRequestToDelete) return;

        try {
            const res = await fetch(`${baseurl}/api/my/donationrequest/${selectedRequestToDelete}`, {
                method: 'DELETE',
            });

            const deleletData = await res.json()
            if (res.ok && deleletData) {
                toast.error('Delete Donation Request Successfully ! ')
                setMyRequest(prev => prev.filter(req => req._id !== selectedRequestToDelete));
            }
        } catch (error) {
            toast.error("Error deleting request:", error)

        } finally {
            setIsModalOpen(false);
            setSelectedRequestToDelete(null);
        }
    };

    if (isPending) {
        return <div><Loader></Loader></div>
    }

    return (
        <div className='dark:bg-white/10'>

            <div className="py-20 md:py-6 lg:py-8 max-w-7xl mx-auto space-y-6 md:space-y-8 min-h-screen pb-20 relative ">

                {activeMenuId !== null && (
                    <div
                        className="fixed inset-0 z-20 bg-transparent cursor-default"
                        onClick={() => setActiveMenuId(null)}
                    />
                )}

                <section className="bg-gradient-to-r max-w-7xl mx-auto from-[#db0000]/20 to-red-50 text-white py-12 px-6 sm:px-8 lg:px-12 rounded-2xl  shadow-sm">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white">
                                Welcome back, <span className="text-[#db0000] font-extrabold">{user?.name || "Donor"}</span> !
                            </h1>
                            <p className="text-[1rem] md:text-sm text-slate-500 dark:text-gray-300 mt-1">View your three most recent blood donation requests and monitor their current status.</p>
                        </div>
                        <h1 className=' uppercase text-right text-[#db0000] font-bold '>{user?.role}</h1>
                    </div>
                </section>






                {donationRequests.length === 0 ? <NoRequestsFound></NoRequestsFound> :
                    <section className="space-y-4 relative">


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
                                            <Table.Column className="text-center w-[80px]">Action</Table.Column>
                                        </Table.Header>
                                        <Table.Body>
                                            {donationRequests.slice(-3).map((request) => (
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
                                                            <p className="font-medium text-slate-700 dark:text-slate-300">{request.donorName}</p>
                                                            <p className="text-slate-400 text-[11px] truncate max-w-[150px]">{request.donorEmail}</p>
                                                        </div>
                                                    </Table.Cell>

                                                    {/* Desktop Dropdown */}
                                                    <Table.Cell className="text-center overflow-visible">
                                                        <div className="relative inline-block text-left overflow-visible">
                                                            <button
                                                                onClick={() => toggleDropdown(request._id)}
                                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors focus:outline-hidden relative z-30"
                                                            >
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                                            </button>
                                                            {activeMenuId === request._id && (
                                                                <ActionMenu request={request} onStatusUpdate={handleStatusUpdate} onDelete={triggerDelete} />
                                                            )}
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table.Content>
                                </Table.ScrollContainer>
                            </Table>

                        </div>

                        {/* MOBILE VIEW  */}
                        <div className="block sm:hidden space-y-4">
                            {donationRequests.slice(-3).map((request) => (
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
                                                <ActionMenu request={request} onStatusUpdate={handleStatusUpdate} onDelete={triggerDelete} isMobile />
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
                                            <span className="capitalize font-medium text-slate-700 dark:text-slate-300">{request.donationStatus}</span>
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

                        <div className="flex justify-center pt-4">
                            <Link href={'/dashboard/donor/my-donation-requests'}>
                                <Button
                                    variant=""
                                    className="w-full bg-[#db0000] text-white font-semibold sm:w-auto font-medium transition-all"
                                >
                                    View All Requests
                                </Button>
                            </Link>
                        </div>
                    </section>
                }


                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                        <div className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Delete Donation Request?</h3>
                            <p className="text-sm text-slate-500">This action will remove the record permanently.</p>
                            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                                <Button variant="ghost" size="sm" className="w-full sm:w-auto order-2 sm:order-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto order-1 sm:order-2" size="sm" onClick={confirmDelete}>Confirm Delete</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ActionMenu = ({ request, onStatusUpdate, onDelete, isMobile = false }) => {
    return (
        <div className={`absolute right-0 z-50 mt-2 w-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-lg focus:outline-hidden ${isMobile ? 'top-8' : ''}`}>
            <Link href={`/dashboard/donor/${request._id}`} className="flex w-full items-center px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                View Details
            </Link>
            <Link href={`/dashboard/donor/edit/${request._id}`} className="flex w-full items-center px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                Edit Request
            </Link>

            {request.donationStatus === "inprogress" && (
                <>
                    <button onClick={() => onStatusUpdate(request._id, 'done')} className="flex w-full items-center px-3 py-2 text-left text-xs font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg">
                        Mark as Done
                    </button>
                    <button onClick={() => onStatusUpdate(request._id, 'canceled')} className="flex w-full items-center px-3 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg">
                        Mark as Canceled
                    </button>
                </>
            )}

            <div className="my-1 border-t border-slate-100 dark:border-slate-700" />
            <button onClick={() => onDelete(request._id)} className="flex w-full items-center px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg">
                Delete Request
            </button>
        </div>
    );
};

export default DonorDashboardPage;