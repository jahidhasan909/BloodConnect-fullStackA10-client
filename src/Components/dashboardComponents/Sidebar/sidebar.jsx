// import { auth } from "@/lib/auth";
import { headers } from "next/headers";
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

export default async function DashboardSidebar() {

    //   const session = await auth.api.getSession({
    //     headers: await headers(),
    //   });

    //   const user = session?.user;
    const role = "donor";

    const dashboardItems = {
        donor: [
            { icon: Home, label: "Dashboard Home", link: "/dashboard" },
            { icon: User, label: "Profile Page", link: "/dashboard/profile" },
            { icon: FileText, label: "My Requests", link: "/dashboard/my-donation-requests" },
            { icon: PlusCircle, label: "Create Request", link: "/dashboard/create-donation-request" },
        ],

        volunteer: [
            { icon: Home, label: "Dashboard Home", link: "/dashboard" },
            { icon: User, label: "Profile Page", link: "/dashboard/profile" },
            { icon: Droplet, label: "All Blood Requests", link: "/dashboard/all-blood-donation-request" },
        ],

        admin: [
            { icon: Home, label: "Dashboard Home", link: "/dashboard" },
            { icon: User, label: "Profile Page", link: "/dashboard/profile" },
            { icon: Users, label: "All Users", link: "/dashboard/all-users" },
            { icon: Droplet, label: "All Blood Requests", link: "/dashboard/all-blood-donation-request" },
        ],
    };


    const navItems = dashboardItems[role] || dashboardItems["donor"];

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
                                                <span className='text-[#E11D48]'>Blood</span>Connect </span>
                                        </Link>
                                    </Drawer.Heading>
                                </Drawer.Header>

                                <Drawer.Body className="px-0">
                                    <nav className="flex flex-col gap-1 w-full">
                                        {navItems.map((item) => (
                                            <Link key={item.label} href={item.link} className="w-full">
                                                <button
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 w-full text-left"
                                                    type="button"
                                                >
                                                    <item.icon className="w-4 h-4 text-slate-400" />
                                                    {item.label}
                                                </button>
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


                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Access Control</p>
                        <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md mt-1.5 border ${role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                role === 'volunteer' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    'bg-rose-50 text-[#E11D48] border-rose-100'
                            }`}>
                            {role} Node
                        </span>
                    </div>

                    {/* Desktop Navigation Map */}
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link key={item.label} href={item.link}>
                                <button
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 w-full text-left"
                                    type="button"
                                >
                                    <item.icon className="w-4 h-4 text-slate-400" />
                                    {item.label}
                                </button>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

        </div>
    );
}