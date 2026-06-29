"use client";

import NoRequestsFound from '@/app/dashboard/admin/my-donation-requests/empty';
import { authClient } from '@/lib/auth-client';
import { Button, Pagination, Table, Dropdown } from '@heroui/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const MyDonationRequestPegination = ({ donationRequest, user }) => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    const [requestData, setRequestData] = useState(donationRequest?.data || []);
    const [statusFilter, setStatusFilter] = useState('all');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequestToDelete, setSelectedRequestToDelete] = useState(null);

    useEffect(() => {
        if (donationRequest?.data) {
            setRequestData(donationRequest.data);
        }
    }, [donationRequest]);

    const page = donationRequest?.page || 1;
    const totalPages = donationRequest?.totalPage || 1;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }


    const handleStatusUpdate = async (id, newStatus) => {
        const { data: tokenData } = await authClient.token()
        if (newStatus === 'done' || newStatus === 'canceled') {
            try {

                const res = await fetch(`${baseurl}/api/donationrequest/${newStatus}/${id}`, {
                    method: 'PATCH',
                    headers: {
                        authorization: `Bearer ${tokenData?.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (res.ok) {
                    toast.success('Donation Status update successfully !')
                    setRequestData(prev =>
                        prev.map(req => req._id === id ? { ...req, donationStatus: newStatus } : req)
                    );
                } else {
                    toast.error(`Failed to update status`);
                }
            } catch (error) {
                toast.error('Error updating status')

            }
        } else {

            setRequestData(prev =>
                prev.map(req => req._id === id ? { ...req, donationStatus: newStatus } : req)
            );
        }
    };

    const triggerDelete = (id) => {
        setSelectedRequestToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedRequestToDelete) return;

        try {
            const res = await fetch(`${baseurl}/api/my/donationrequest/${selectedRequestToDelete}`, {
                method: 'DELETE',
            });

            const deleletData = await res.json();
            if (res.ok && deleletData) {
                toast.error('Donation Request Delete Successfully !')
                setRequestData(prev => prev.filter(req => req._id !== selectedRequestToDelete));
            }
        } catch (error) {
            toast.error('Error deleting request')
        } finally {
            setIsModalOpen(false);
            setSelectedRequestToDelete(null);
        }
    };

    const filteredRequests = requestData.filter(request => {
        if (statusFilter === 'all') return true;
        return request?.donationStatus?.toLowerCase() === statusFilter.toLowerCase();
    });

    return (
        <div className='bg-white/10'>

            <div className="py-20 md:py-6 lg:py-8 max-w-7xl mx-auto space-y-6 md:space-y-8 min-h-screen pb-20  relative">

                <header className="py-10 px-10 rounded-2xl bg-gradient-to-r from-[#db0000]/20 to-red-50 border border-red-100   flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white">
                            Welcome back, <span className="text-red-600 font-extrabold">{user?.name || "Donor"}</span> !
                        </h1>
                        <p className="text-xs md:text-sm text-slate-500 mt-1">View and manage all your blood donation requests.</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        <label htmlFor="status-filter" className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">

                        </label>
                        <select
                            id="status-filter"
                            value={statusFilter}

                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-white  border border-slate-200   rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-black/50 shadow-xs focus:outline-hidden cursor-pointer min-w-[145px]"
                        >
                            <option value="all">All ({requestData.length})</option>
                            <option value="pending">Pending ({requestData.filter(r => r.donationStatus === 'pending').length})</option>
                            <option value="inprogress">In Progress ({requestData.filter(r => r.donationStatus === 'inprogress').length})</option>
                            <option value="done">Done ({requestData.filter(r => r.donationStatus === 'done').length})</option>
                            <option value="canceled">Canceled ({requestData.filter(r => r.donationStatus === 'canceled').length})</option>
                        </select>
                    </div>
                </header>

                {filteredRequests.length > 0 ? (
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
                                            <Table.Column className="text-center w-[120px]">Action</Table.Column>
                                        </Table.Header>
                                        <Table.Body>
                                            {filteredRequests.map((request) => (
                                                <Table.Row key={request._id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 transition-colors overflow-visible">
                                                    <Table.Cell className="font-semibold text-slate-900 dark:text-white">{request?.recipientName}</Table.Cell>
                                                    <Table.Cell className="text-sm text-slate-600 dark:text-slate-300">{request?.recipientDistrict}, {request?.recipientUpazila}</Table.Cell>
                                                    <Table.Cell className="text-xs text-slate-600">
                                                        <div className="font-medium dark:text-slate-300">{request?.donationDate}</div>
                                                        <div className="text-slate-400">{request?.donationTime}</div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400">{request?.bloodGroup}</span>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <span className={`text-xs capitalize px-2.5 py-0.5 rounded-full border font-semibold
                                                        ${request?.donationStatus === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400' : ''}
                                                        ${request?.donationStatus === 'inprogress' ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400' : ''}
                                                        ${request?.donationStatus === 'done' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400' : ''}
                                                        ${request?.donationStatus === 'canceled' ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-400' : ''}
                                                    `}>{request?.donationStatus}</span>
                                                    </Table.Cell>
                                                    <Table.Cell className="text-xs">
                                                        <div>
                                                            <p className="font-medium text-slate-700 dark:text-slate-300">{request?.donorName || "Not Assigned"}</p>
                                                            <p className="text-slate-400 text-[11px] truncate max-w-[150px]">{request?.donorEmail || ""}</p>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell className="text-center overflow-visible">
                                                        <DonorActionDropdown request={request} onStatusUpdate={handleStatusUpdate} onDelete={triggerDelete} />
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
                                                    <Link className='flex gap-1' href={`/dashboard/donor/my-donation-requests?page=${page - 1}`}>
                                                        <Pagination.PreviousIcon /> Prev
                                                    </Link>
                                                </Pagination.Previous>
                                            </Pagination.Item>
                                            {pages.map((p) => (
                                                <Pagination.Item key={p}>
                                                    <Link href={`/dashboard/donor/my-donation-requests?page=${p}`}>
                                                        <Pagination.Link isActive={p === page}>
                                                            {p}
                                                        </Pagination.Link>
                                                    </Link>
                                                </Pagination.Item>
                                            ))}
                                            <Pagination.Item>
                                                <Pagination.Next isDisabled={page === totalPages}>
                                                    <Link className='flex gap-1' href={`/dashboard/donor/my-donation-requests?page=${page + 1}`}>
                                                        Next <Pagination.NextIcon />
                                                    </Link>
                                                </Pagination.Next>
                                            </Pagination.Item>
                                        </Pagination.Content>
                                    </Pagination>
                                </Table.Footer>
                            </Table>
                        </div>

                        {/* MOBILE VIEW */}
                        <div className="block sm:hidden space-y-4">
                            {filteredRequests.map((request) => (
                                <div key={request._id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 relative">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-base">{request?.recipientName}</h3>
                                            <p className="text-xs text-slate-500 mt-0.5">{request?.recipientDistrict}, {request?.recipientUpazila}</p>
                                        </div>

                                        <DonorActionDropdown request={request} onStatusUpdate={handleStatusUpdate} onDelete={triggerDelete} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-100 dark:border-slate-800">
                                        <div>
                                            <span className="text-slate-400 block mb-0.5">Blood Group</span>
                                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400">{request?.bloodGroup}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block mb-0.5">Status</span>
                                            <span className={`capitalize font-bold
                                            ${request?.donationStatus === 'pending' ? 'text-amber-600' : ''}
                                            ${request?.donationStatus === 'inprogress' ? 'text-blue-600' : ''}
                                            ${request?.donationStatus === 'done' ? 'text-emerald-600' : ''}
                                            ${request?.donationStatus === 'canceled' ? 'text-rose-600' : ''}
                                        `}>{request?.donationStatus}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-slate-400 block mb-0.5">Schedule</span>
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">{request?.donationDate} at {request?.donationTime}</span>
                                        </div>
                                        <div className="col-span-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg mt-1">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Hospital Details</span>
                                            <span className="font-semibold text-slate-800 dark:text-slate-200 block">{request?.hospitalName}</span>
                                            <span className="text-slate-500 text-[11px] block truncate">{request?.fullAddressLine}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </section>
                ) : (
                    <div className="">
                        <NoRequestsFound></NoRequestsFound>
                    </div>
                )}

                {/* Modal */}
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

const DonorActionDropdown = ({ request, onStatusUpdate, onDelete }) => {
    return (
        <Dropdown>
            <Button
                isIconOnly
                aria-label="Actions"
                variant="light"
                radius="full"
                className="text-slate-600 dark:text-slate-300"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
            </Button>
            <Dropdown.Popover>
                <Dropdown.Menu
                    aria-label="Request Operations"
                    className="p-1 min-w-[160px]"
                >
                    <Dropdown.Item id="view" textValue="View Details" className="text-xs font-medium rounded-lg">
                        <Link className='w-full block' href={`/dashboard/donor/${request._id}`}>
                            View Details
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="edit" textValue="Edit Request" className="text-xs font-medium rounded-lg">
                        <Link href={`/dashboard/donor/edit/${request._id}`} className="w-full">
                            Edit Request
                        </Link>
                    </Dropdown.Item>

                    {request?.donationStatus === "inprogress" && (
                        <Dropdown.Item
                            id="done"
                            textValue="Mark as Done"
                            className="text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-lg bg-emerald-50/20"
                            onClick={() => onStatusUpdate(request._id, 'done')}
                        >
                            Mark as Done
                        </Dropdown.Item>
                    )}
                    {request?.donationStatus === "inprogress" && (
                        <Dropdown.Item
                            id="canceled"
                            textValue="Mark as Canceled"
                            className="text-rose-600 dark:text-rose-400 text-xs font-bold rounded-lg bg-rose-50/20"
                            onClick={() => onStatusUpdate(request._id, 'canceled')}
                        >
                            Mark as Canceled
                        </Dropdown.Item>
                    )}

                    <Dropdown.Item
                        id="delete"
                        textValue="Delete Request"
                        className="text-red-600 dark:text-red-400 text-xs font-medium rounded-lg"
                        onClick={() => onDelete(request._id)}
                    >
                        Delete Request
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
};

export default MyDonationRequestPegination;