"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Button
} from "@heroui/react";
import Image from 'next/image';

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const linkClass = (path) =>
        pathname === path
            ? "text-[#E11D48] font-semibold transition-colors"
            : "text-slate-700 hover:text-[#E11D48] font-medium transition-colors";

    return (
        <nav className="absolute    fixed top-0 z-50   w-full">
            <div className=" px-4 container border my-4 bg-white/60 shadow-md rounded-2xl backdrop-blur-md mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">


                    <Link href="/" className="flex items-center gap- flex-shrink-0">
                        <Image width={34} height={33} alt='logo' className='w-full object-cover mt-2 h-[50px]' src={'https://i.ibb.co.com/Jj3R0f8L/blood-donation-logo-template-vector-35411128-Photoroom-removebg-preview.png'}></Image>
                        <span className="text-xl font-bold text-slate-900 tracking-tight ">
                            <span className='text-[#E11D48]'>Blood</span>Connect </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className={linkClass('/')}>Home</Link>
                        <Link href="/donation-requests" className={linkClass('/donation-requests')}>Donation Requests</Link>
                        <Link href="/search-donor" className={linkClass('/search-donor')}>Search Donor</Link>


                        {isLoggedIn && (
                            <Link href="/funding" className={linkClass('/funding')}>Funding</Link>
                        )}
                    </div>


                    <div className="hidden md:flex items-center">
                        {!isLoggedIn ? (
                            <Button
                                as={Link}
                                href="/login"
                                className="bg-[#E11D48] text-white font-medium rounded-md px-6 shadow-sm hover:bg-rose-700 transition-all flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login
                            </Button>
                        ) : (
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform border-[#E11D48] w-9 h-9 cursor-pointer"
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="dashboard" href="/dashboard" className="text-slate-700">
                                        Dashboard
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="danger" className="text-danger" onPress={() => setIsLoggedIn(false)}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        )}
                    </div>


                    <div className="md:hidden flex items-center gap-4">

                        {isLoggedIn && (
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform border-[#E11D48] w-8 h-8 cursor-pointer"
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="dashboard" href="/dashboard">Dashboard</DropdownItem>
                                    <DropdownItem key="logout" color="danger" onPress={() => setIsLoggedIn(false)}>Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        )}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-700 hover:text-[#E11D48] focus:outline-none p-2 rounded-md hover:bg-slate-50 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>


            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-4 space-y-2 shadow-inner animate-in fade-in slide-in-from-top-5 duration-200">
                    <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl ${pathname === '/' ? 'bg-rose-50 text-[#E11D48] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/donation-requests"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl ${pathname === '/donation-requests' ? 'bg-rose-50 text-[#E11D48] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                        Donation Requests
                    </Link>
                    <Link
                        href="/search-donor"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl ${pathname === '/search-donor' ? 'bg-rose-50 text-[#E11D48] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                        Search Donor
                    </Link>

                    {isLoggedIn && (
                        <Link
                            href="/funding"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-3 py-2.5 rounded-xl ${pathname === '/funding' ? 'bg-rose-50 text-[#E11D48] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                            Funding
                        </Link>
                    )}

                    {!isLoggedIn && (
                        <div className="pt-2">
                            <Button
                                as={Link}
                                href="/login"
                                variant='outline'
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full bg-[#E11D48]  text-white font-medium rounded-md  h-11 shadow-sm flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;