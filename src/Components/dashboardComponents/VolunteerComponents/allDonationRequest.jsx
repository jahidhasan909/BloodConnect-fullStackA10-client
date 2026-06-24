"use client";

import { Button, Pagination, Table, Dropdown } from '@heroui/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const AllDonationRequest = ({ donationRequest }) => {
  
    const [requestData, setRequestData] = useState(donationRequest?.data || []);
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'inprogress', 'done', 'canceled'

   
    useEffect(() => {
        if (donationRequest?.data) {
            setRequestData(donationRequest.data);
        }
    }, [donationRequest]);

    const page = donationRequest?.page || 1;
    const totalPages = donationRequest?.totalPage || 1;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const handleStatusUpdate = (id, newStatus) => {
        setRequestData(prev => 
            prev.map(req => req._id === id ? { ...req, donationStatus: newStatus } : req)
        );
    };

    
    const filteredRequests = requestData.filter(request => {
        if (statusFilter === 'all') return true;
        return request?.donationStatus?.toLowerCase() === statusFilter.toLowerCase();
    });

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 min-h-screen pb-24 relative">

         
            <header className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-red-50 border border-slate-100 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                        All Blood Donation Requests <span className="text-red-600 font-extrabold">(Volunteer Access)</span>
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">Review requests and update the donation operations status.</p>
                </div>

          
                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <label htmlFor="status-filter" className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Filter:
                    </label>
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs focus:outline-hidden cursor-pointer min-w-[145px]"
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
                                        <Table.Column className="text-center w-[120px]">Update Status</Table.Column>
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

                                                {/* HeroUI Dropdown Integration */}
                                                <Table.Cell className="text-center overflow-visible">
                                                    <VolunteerActionDropdown request={request} onStatusUpdate={handleStatusUpdate} />
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

                    <div className="block sm:hidden space-y-4">
                        {filteredRequests.map((request) => (
                            <div key={request._id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 relative">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-base">{request?.recipientName}</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">{request?.recipientDistrict}, {request?.recipientUpazila}</p>
                                    </div>
                                    
                                    {/* Mobile Dropdown */}
                                    <VolunteerActionDropdown request={request} onStatusUpdate={handleStatusUpdate} />
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
                <div className="text-center p-12 border border-dashed rounded-xl text-slate-400">
                    No blood donation requests found matching this criteria.
                </div>
            )}
        </div>
    );
};


const VolunteerActionDropdown = ({ request, onStatusUpdate }) => {
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
                    aria-label="Change Request Status"
                    onAction={(key) => onStatusUpdate(request._id, key)}
                    className="p-1 min-w-[160px]"
                >
                    <Dropdown.Item 
                        id="pending" 
                        textValue="Set to Pending"
                        className={`text-amber-600 dark:text-amber-400 text-xs font-medium rounded-lg ${request.donationStatus === 'pending' ? 'bg-amber-50 dark:bg-amber-950/30 font-bold' : ''}`}
                    >
                        Set to Pending
                    </Dropdown.Item>
                    <Dropdown.Item 
                        id="inprogress" 
                        textValue="Set to In Progress"
                        className={`text-blue-600 dark:text-blue-400 text-xs font-medium rounded-lg ${request.donationStatus === 'inprogress' ? 'bg-blue-50 dark:bg-blue-950/30 font-bold' : ''}`}
                    >
                        Set to In Progress
                    </Dropdown.Item>
                    <Dropdown.Item 
                        id="done" 
                        textValue="Mark as Done"
                        className={`text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-lg ${request.donationStatus === 'done' ? 'bg-emerald-50 dark:bg-emerald-950/30 font-bold' : ''}`}
                    >
                        Mark as Done
                    </Dropdown.Item>
                    <Dropdown.Item 
                        id="canceled" 
                        textValue="Mark as Canceled"
                        variant="danger"
                        className={`text-rose-600 dark:text-rose-400 text-xs font-medium rounded-lg ${request.donationStatus === 'canceled' ? 'bg-rose-50 dark:bg-rose-950/30 font-bold' : ''}`}
                    >
                        Mark as Canceled
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
};

export default AllDonationRequest;