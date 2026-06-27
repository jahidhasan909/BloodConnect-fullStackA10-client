'use client'

import Image from "next/image";
import Link from "next/link";
import {
    Home,
    User,
    FileText,
    PlusCircle,
    Users,
    Droplet,
    Menu,
    Activity
} from "lucide-react";

import { Button, Drawer } from "@heroui/react";

import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Loader from "@/Components/Shared/Loading";


export default function DashboardSidebar() {

    const pathname = usePathname();
    const { data, isPending } = authClient.useSession()

    if (isPending) {
        return <div>
            <Loader></Loader>
        </div>
    }

    const user = data?.user;
    const role = user?.role || 'donor';






    const dashboardItems = {
        donor: [
            { icon: Home, label: "Dashboard", link: "/dashboard/donor" },
            { icon: User, label: "Profile", link: "/dashboard/donor/profile" },
            { icon: FileText, label: "My Requests", link: "/dashboard/donor/my-donation-requests" },
            { icon: PlusCircle, label: "Create Request", link: "/dashboard/donor/create-donation-request" },
        ],

        volunteer: [
            { icon: Home, label: "Dashboard", link: "/dashboard/volunteer" },
            { icon: User, label: "Profile", link: "/dashboard/volunteer/profile" },
            { icon: FileText, label: "My Requests", link: "/dashboard/volunteer/my-donation-requests" },
            { icon: PlusCircle, label: "Create Request", link: "/dashboard/volunteer/create-donation-request" },
            { icon: Droplet, label: "Public Requests", link: "/dashboard/volunteer/all-blood-donation-request" },
        ],

        admin: [
            { icon: Home, label: "Dashboard", link: "/dashboard/admin" },
            { icon: User, label: "Profile", link: "/dashboard/admin/profile" },
            { icon: FileText, label: "My Requests", link: "/dashboard/admin/my-donation-requests" },
            { icon: PlusCircle, label: "Create Request", link: "/dashboard/admin/create-donation-request" },
            { icon: Users, label: "All Users", link: "/dashboard/admin/all-users" },
            { icon: Droplet, label: "Public Requests", link: "/dashboard/admin/all-blood-donation-request" },
        ],
    };


    const navItems = dashboardItems[role];

    return (
        <div className="flex">


            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Drawer>
                    <Drawer.Trigger>
                        <Button isIconOnly variant="bordered" className="bg-white border-slate-200 rounded-xl shadow-sm">
                            <Menu className="w-5 h-5 text-slate-800" />
                        </Button>
                    </Drawer.Trigger>

                    <Drawer.Backdrop>
                        <Drawer.Content placement="left" className="bg-white max-w-[260px] p-6 flex flex-col gap-6">
                            <Drawer.Dialog>
                                <Drawer.CloseTrigger />
                                <Drawer.Header className="px-2">
                                    <Drawer.Heading className="flex items-center gap-2">
                                        <Link href="/" className="flex items-center gap- flex-shrink-0">
                                            <Image width={34} height={33} alt='logo' className='w-full object-cover mt-2 h-[50px]' src={'https://i.ibb.co.com/Jj3R0f8L/blood-donation-logo-template-vector-35411128-Photoroom-removebg-preview.png'}></Image>
                                            <span className="text-xl font-bold text-slate-900 tracking-tight ">
                                                <span className='text-[#db0000]'>Blood</span>Connect </span>
                                        </Link>
                                    </Drawer.Heading>
                                </Drawer.Header>

                                <Drawer.Body className="px-0">
                                    <nav className="flex flex-col gap-1 w-full">
                                        {navItems.map((item) => (
                                            <Link key={item.label} href={item.link} className={`block rounded-xl w-full ${pathname === item.link ? "bg-[#db0000] font-semibold  leading-tight text-white py-2 px-3 flex items-center gap-1" : "flex gap-1 items-center px-3 py-2"
                                                }`}>

                                                <item.icon className="w-4 h-4 " />
                                                {item.label}

                                            </Link>
                                        ))}
                                    </nav>
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>

            {/* laptop */}
            <aside className="hidden lg:flex flex-col justify-between w-64 h-screen bg-white border-r border-slate-200/80 p-6 sticky top-0">
                <div className="space-y-8">

                    <Link href="/" className="flex items-center gap- flex-shrink-0">
                        <Image width={37} height={33} alt='logo' className='mt-2 h-[50px]' src={'https://i.ibb.co.com/Jj3R0f8L/blood-donation-logo-template-vector-35411128-Photoroom-removebg-preview.png'}></Image>
                        <span className="text-xl font-extrabold text-slate-900 tracking-tight ">
                            <span className='text-[#E11D48]'>Blood</span>Connect </span>
                    </Link>





                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link key={item.label} href={item.link} className={`block rounded-xl w-full ${pathname === item.link ? "bg-[#db0000] font-semibold  leading-tight text-white py-2 px-3 flex items-center gap-1" : "flex gap-1 items-center px-3 py-2"
                                }`}>

                                <item.icon className="w-4 h-4 " />
                                {item.label}

                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

        </div>
    );
}