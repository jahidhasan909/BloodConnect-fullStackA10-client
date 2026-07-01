"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
    Dropdown,
    Avatar,
    Button,
    Label
} from "@heroui/react";
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { ArrowRightFromSquare } from '@gravity-ui/icons';

import Loader from './Loading';
import ThemeSwitch from '@/Components/themeprovider/ThemeSwitch';
import { motion } from 'framer-motion'










const Navbar = () => {


    const { data, isPending } = authClient.useSession()



    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    if (isPending) {
        return <div>
            <Loader></Loader>
        </div>
    }
    const user = data?.user


    if (pathname.includes('dashboard') || pathname.includes('login') || pathname.includes('registration')) {
        return null;
    }





    const linkClass = (path) =>
        pathname === path
            ? "text-[#db0000] font-bold transition-colors"
            : "text-slate-700 hover:text-[#db0000] dark:text-white/85 font-medium transition-colors";

    return (
        <nav className="absolute    fixed top-0 z-50   w-full">
            <div className=" px-4 container border border-gray-100 my-4 bg-white/40 dark:bg-white/15 dark:border-gray-50/40 shadow-md rounded-2xl backdrop-blur-md mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">


                    <Link href="/" className="flex items-center  flex-shrink-0 ">
                        <Image width={34} height={33} alt='logo' className='w-full object-cover mt-2 h-[50px]' src={'https://i.ibb.co.com/Jj3R0f8L/blood-donation-logo-template-vector-35411128-Photoroom-removebg-preview.png'}></Image>
                        <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight ">
                            <span className='text-[#db0000]'>Blood</span>Connect </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="/" className={linkClass('/')}>Home</Link>
                        <Link href="/donationrequest" className={linkClass('/donationrequest')}>Donation Requests</Link>
                        <Link href="/searchdonor" className={linkClass('/searchdonor')}>Search Donor</Link>


                        {user && (
                            <Link href="/funding" className={linkClass('/funding')}>Funding</Link>
                        )}
                    </div>


                    <div className="hidden lg:flex items-center gap-4">
                        <ThemeSwitch />


                        {!user ? (
                            <Link
                                href={'/login'}
                                className="group relative inline-flex overflow-hidden rounded-md p-[2px]"
                            >

                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#E11D48_50%,#E2E8F0_100%)]"
                                />


                                <Button
                                    className="relative z-10 flex w-full items-center gap-2 rounded-md bg-[#db0000] px-6 font-bold text-white shadow-sm transition-all hover:bg-[#b00000]"
                                >
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <Dropdown>
                                <Dropdown.Trigger className="rounded-full">
                                    <Avatar>
                                        <Avatar.Image
                                            alt="userimg"
                                            src={user?.image}
                                        />
                                        <Avatar.Fallback delayMs={600}>{user?.name?.charAt(0, 2)}</Avatar.Fallback>
                                    </Avatar>
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <div className="px-3 pt-3 pb-1">
                                        <div className="flex items-center gap-2">
                                            <Avatar size="sm">
                                                <Avatar.Image
                                                    alt="userimg"
                                                    src={user?.image}
                                                />
                                                <Avatar.Fallback delayMs={600}>{user?.name?.charAt(0, 2)}</Avatar.Fallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-0">
                                                <p className="text-sm leading-5 font-medium">{user?.name}</p>
                                                <p className="text-xs leading-none text-muted">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Dropdown.Menu>
                                        <Dropdown.Item textValue="Dashboard">
                                            <Link className='w-full' href={`/dashboard/${user.role}`}>
                                                <Label>Dashboard</Label>
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => authClient.signOut()} textValue="Logout" variant="danger">
                                            <div className="flex w-full items-center justify-between gap-2">
                                                <Label>Log Out</Label>
                                                <ArrowRightFromSquare className="size-3.5 text-danger" />
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        )}
                    </div>


                    <div className="lg:hidden flex items-center gap-4">
                        <ThemeSwitch />

                        {!user ? (
                            <Link
                                href={'/login'}
                                className="group relative inline-flex overflow-hidden rounded-md p-[2px]"
                            >

                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#E11D48_50%,#E2E8F0_100%)]"
                                />


                                <Button
                                    className="relative z-10 flex w-full items-center gap-2 rounded-md bg-[#db0000] px-6 font-bold text-white shadow-sm transition-all hover:bg-[#b00000]"
                                >
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <Dropdown>
                                <Dropdown.Trigger className="rounded-full">
                                    <Avatar>
                                        <Avatar.Image
                                            alt="userimg"
                                            src={user?.image}
                                        />
                                        <Avatar.Fallback delayMs={600}>{user?.name?.charAt(0, 2)}</Avatar.Fallback>
                                    </Avatar>
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <div className="px-3 pt-3 pb-1">
                                        <div className="flex items-center gap-2">
                                            <Avatar size="sm">
                                                <Avatar.Image
                                                    alt="userimg"
                                                    src={user?.image}
                                                />
                                                <Avatar.Fallback delayMs={600}>{user?.name?.charAt(0, 2)}</Avatar.Fallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-0">
                                                <p className="text-sm leading-5 font-medium">{user?.name}</p>
                                                <p className="text-xs leading-none text-muted">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Dropdown.Menu>
                                        <Dropdown.Item textValue="Dashboard">
                                            <Link className='w-full' href={`/dashboard/${user.role}`}>
                                                <Label>Dashboard</Label>
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => authClient.signOut()} textValue="Logout" variant="">
                                            <div className="flex text-[#db0000] w-full items-center justify-between gap-2">
                                                <Label>Log Out</Label>
                                                <ArrowRightFromSquare className="size-3.5 text-danger" />
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        )}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-700 dark:text-white hover:text-[#db0000] focus:outline-none p-2 rounded-md hover:bg-slate-50 transition-colors"
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
                <div className="lg:hidden bg-white dark:bg-black border-b border-slate-100 px-4 pt-2 pb-4 space-y-2 shadow-inner  slide-in-from-top-5 duration-200 z-50">
                    <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl ${pathname === '/' ? 'bg-rose-50 dark:bg-white/20 text-[#db0000] font-semibold' : 'text-slate-700 dark:text-white/80 hover:bg-slate-50'}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/donationrequest"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl ${pathname === '/donationrequest' ? 'bg-rose-50 text-[#db0000] dark:bg-white/20 font-semibold' : 'text-slate-700 dark:text-white/80 hover:bg-slate-50'}`}
                    >
                        Donation Requests
                    </Link>
                    <Link
                        href="/searchdonor"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2.5 rounded-xl ${pathname === '/searchdonor' ? 'bg-rose-50 text-[#db0000] dark:bg-white/20 font-semibold' : 'text-slate-700 dark:text-white/80 hover:bg-slate-50'}`}
                    >
                        Search Donor
                    </Link>

                    {user && (
                        <Link
                            href="/funding"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-3 py-2.5 rounded-xl ${pathname === '/funding' ? 'bg-rose-50  dark:bg-white/20 text-[#db0000] font-semibold' : 'text-slate-700 dark:text-white/80 hover:bg-slate-50'}`}
                        >
                            Funding
                        </Link>
                    )}


                </div>
            )}
        </nav>
    );
};

export default Navbar;