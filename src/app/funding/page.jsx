"use client";

import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination } from '@heroui/react';
import Funding from '@/Components/Funding/funding';
import { motion } from 'framer-motion'
import { RiRefund2Line } from "react-icons/ri";

const Fundingpage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [funds, setFunds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        const fetchPaginatedFunds = async () => {
            setLoading(true);
            const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

            try {
                const response = await fetch(`${backendUrl}/api/pegination/funding?page=${currentPage}&limit=10`);
                const result = await response.json();

                setFunds(result.data || []);
                setCurrentPage(result.page || 1);
                setTotalPages(result.totalPage || 1);
            } catch (error) {
                console.error("Error loading paginated funds:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaginatedFunds();
    }, [currentPage]);

    useEffect(() => {
        if (funds.length > 0 && grandTotal === 0) {
            const pageTotal = funds.reduce((sum, item) => sum + Number(item.amount || 0), 0);
            setGrandTotal(prev => prev === 0 ? pageTotal : prev);
        }
    }, [funds]);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="max-w-7xl mt-30 mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 min-h-screen pb-24 relative">

            <div className='text-center'>
                <h1 className='text-4xl font-bold'>Community Funding History</h1>
                <p className='text-[1rem] text-gray-500 mt-2'>View recent community donations and contribute to support our mission.</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-[#db0000]/20 to-red-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 gap-4 shadow-xs">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">Contribute Now</h1>
                </div>



                <div className="relative inline-block p-[2px] overflow-hidden rounded-xl group">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#E11D48_50%,#E2E8F0_100%)]"
                    />


                    <Button
                        onPress={() => setIsOpen(true)}
                        className="relative font-bold bg-[#db0000] hover:bg-[#db00008b] text-white text-base h-12 px-6 rounded-xl transition-all flex items-center justify-center  w-full "
                    >
                        <RiRefund2Line />
                        Give Fund
                    </Button>
                </div>
            </div>


            {funds.length > 0 || loading ? (
                <section className="space-y-4 relative">

                    <div className="hidden sm:block overflow-visible rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                        <Table className="overflow-visible">
                            <Table.ScrollContainer className="overflow-visible">
                                <Table.Content aria-label="Paginated Funding list table" className="min-w-[600px] md:min-w-[800px] overflow-visible">
                                    <Table.Header>
                                        <Table.Column isRowHeader className="font-bold">Donor Name</Table.Column>
                                        <Table.Column className="font-bold">Fund Amount</Table.Column>
                                        <Table.Column className="font-bold">Funding Date</Table.Column>
                                        <Table.Column className="font-bold">Status</Table.Column>
                                    </Table.Header>
                                    <Table.Body emptyContent={loading ? "Loading funding logs..." : "No funding logs available on this page."}>
                                        {funds.map((fund) => (
                                            <Table.Row key={fund._id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 transition-colors">
                                                <Table.Cell className="font-semibold text-slate-700 dark:text-slate-300">{fund.name}</Table.Cell>
                                                <Table.Cell className="font-bold text-slate-900 dark:text-white">${Number(fund.amount).toFixed(2)}</Table.Cell>
                                                <Table.Cell className="text-xs text-slate-500">{fund.date}</Table.Cell>
                                                <Table.Cell>
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-800/30">
                                                        • {fund.status || 'success'}
                                                    </span>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>


                            {totalPages > 1 && (
                                <Table.Footer>
                                    <Pagination size="sm">
                                        <Pagination.Content>
                                            <Pagination.Item>
                                                <button
                                                    disabled={currentPage === 1}
                                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    className={`flex gap-1 items-center text-xs font-semibold px-2 py-1 rounded-md ${currentPage === 1 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                                >
                                                    <Pagination.PreviousIcon /> Prev
                                                </button>
                                            </Pagination.Item>
                                            {pages.map((p) => (
                                                <Pagination.Item key={p}>
                                                    <button
                                                        onClick={() => setCurrentPage(p)}
                                                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${p === currentPage ? 'bg-red-600 text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                                    >
                                                        {p}
                                                    </button>
                                                </Pagination.Item>
                                            ))}
                                            <Pagination.Item>
                                                <button
                                                    disabled={currentPage === totalPages}
                                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                    className={`flex gap-1 items-center text-xs font-semibold px-2 py-1 rounded-md ${currentPage === totalPages ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                                >
                                                    Next <Pagination.NextIcon />
                                                </button>
                                            </Pagination.Item>
                                        </Pagination.Content>
                                    </Pagination>
                                </Table.Footer>
                            )}
                        </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block sm:hidden space-y-4">
                        {loading ? (
                            <div className="text-center p-8 text-slate-400">Loading funding history...</div>
                        ) : (
                            funds.map((fund) => (
                                <div key={fund._id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 relative">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-base">{fund.name}</h3>
                                            <p className="text-xs text-slate-400 mt-0.5">Date: {fund.date}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <span className="px-2.5 py-1 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                                ${Number(fund.amount).toFixed(2)}
                                            </span>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-800/30">
                                                • {fund.status || 'success'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}


                        {totalPages > 1 && (
                            <div className="flex justify-center p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                                <Pagination
                                    isCompact
                                    showControls
                                    color="danger"
                                    page={currentPage}
                                    total={totalPages}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        )}
                    </div>

                </section>
            ) : (
                <div className="text-center p-12 border border-dashed rounded-xl text-slate-400 border-slate-200 dark:border-slate-800">
                    No funding logs available on this page.
                </div>
            )}


            <Funding isOpen={isOpen} onOpenChange={setIsOpen} />
        </div>
    );
};

export default Fundingpage;