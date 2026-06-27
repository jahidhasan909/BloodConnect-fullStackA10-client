"use client";

import React, { useState, useEffect } from 'react';
import { Avatar, Button } from '@heroui/react';
import NoRequestsFound from '@/app/searchdonor/empty';

const SearchDonor = ({ donors = [] }) => {

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);


    const [bloodGroup, setBloodGroup] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');

    const [searchedDonors, setSearchedDonors] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);


    useEffect(() => {
        const loadData = async () => {
            try {
                const [districtRes, upazilaRes] = await Promise.all([
                    fetch("/districts.json"),
                    fetch("/upazilas.json"),
                ]);

                const districtData = await districtRes.json();
                const upazilaData = await upazilaRes.json();

                setDistricts(districtData?.[2]?.data || []);
                setUpazilas(upazilaData?.[2]?.data || []);
            } catch (error) {
                console.error("Failed to load location data", error);
            }
        };

        loadData();
    }, []);


    const availableUpazilas = upazilas.filter(
        upazila => upazila.district_id === selectedDistrict
    );

    const handleSearch = (e) => {
        e.preventDefault();


        const districtName = districts.find(d => d.id === selectedDistrict)?.name || '';
        const upazilaName = upazilas.find(u => u.id === selectedUpazila)?.name || '';


        const results = donors.filter(donor => {
            const matchesRole = donor?.role?.toLowerCase() === 'donor';
            const matchesStatus = donor?.status?.toLowerCase() === 'active';
            const matchesBlood = bloodGroup ? donor?.bloodGroup === bloodGroup : true;
            const matchesDistrict = districtName ? donor?.district?.toLowerCase() === districtName.toLowerCase() : true;
            const matchesUpazila = upazilaName ? donor?.upazila?.toLowerCase() === upazilaName.toLowerCase() : true;

            return matchesRole && matchesStatus && matchesBlood && matchesDistrict && matchesUpazila;
        });

        setSearchedDonors(results);
        setHasSearched(true);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 min-h-screen mt-30">

            <div className="mb-6 text-center">
                <h2 className="text-xl md:text-4xl font-bold text-slate-800 dark:text-white gap-2">
                    
                    Find a Blood Donor
                </h2>
                <p className="text-[1rem] md:text-[1rem] text-slate-400 mt-1">Select blood group and location details to search available active donors.</p>
            </div>


            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 md:p-8">


                <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">


                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Group</label>
                        <select
                            required
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-hidden cursor-pointer"
                        >
                            <option value="">Select Blood Group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>


                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">District</label>
                        <select
                            required
                            value={selectedDistrict}
                            onChange={(e) => {
                                setSelectedDistrict(e.target.value);
                                setSelectedUpazila('');
                            }}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-hidden cursor-pointer"
                        >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>{district.name}</option>
                            ))}
                        </select>
                    </div>


                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upazila</label>
                        <select
                            required
                            value={selectedUpazila}
                            onChange={(e) => setSelectedUpazila(e.target.value)}
                            disabled={!selectedDistrict}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-red-500 focus:outline-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Upazila</option>
                            {availableUpazilas.map((upazila) => (
                                <option key={upazila.id} value={upazila.id}>{upazila.name}</option>
                            ))}
                        </select>
                    </div>


                    <Button
                        type="submit"
                        className="w-full h-[42px] bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-red-600/20"
                    >
                        Search Donors
                    </Button>
                </form>
            </div>

            {hasSearched ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                            Search Results ({searchedDonors.length})
                        </h3>
                    </div>

                    {searchedDonors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {searchedDonors.map((donor) => (
                                <div
                                    key={donor._id}
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
                                >

                                    <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1.5 rounded-bl-2xl font-black text-sm tracking-wide shadow-xs">
                                        {donor?.bloodGroup}
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <Avatar className="w-12 h-12 border-2 border-red-100 dark:border-red-950">
                                            <Avatar.Image src={donor?.image} alt={donor?.name} />
                                            <Avatar.Fallback>{donor?.name?.substring(0, 2).toUpperCase()}</Avatar.Fallback>
                                        </Avatar>

                                        <div className="space-y-0.5">
                                            <h4 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-red-600 transition-colors">
                                                {donor?.name}
                                            </h4>
                                            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 truncate max-w-[180px]">
                                                {donor?.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="text-slate-400 block mb-0.5 font-medium">District</span>
                                            <span className="font-bold text-slate-700 dark:text-slate-300 capitalize">{donor?.district || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block mb-0.5 font-medium">Upazila</span>
                                            <span className="font-bold text-slate-700 dark:text-slate-300 capitalize">{donor?.upazila || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-16 border border-dashed rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-400">
                            <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            No active donors found in this area with the requested blood group.
                        </div>
                    )}
                </div>
            ) : (

                <div className="">
                    <NoRequestsFound></NoRequestsFound>
                </div>
            )}
        </div>
    );
};

export default SearchDonor;