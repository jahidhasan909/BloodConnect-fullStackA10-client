"use client";

import Loader from '@/Components/Shared/Loading';
import { authClient } from '@/lib/auth-client';
import { Avatar, Button, Pagination, Table } from '@heroui/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const AllUsersManagementPage = ({ Users }) => {

    const usersArray = Array.isArray(Users) ? Users : (Users?.data || Users?.users || []);

    const [usersList, setUsersList] = useState(usersArray);
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeMenuId, setActiveMenuId] = useState(null);

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        setUsersList(Array.isArray(Users) ? Users : (Users?.data || Users?.users || []));
    }, [Users]);

    const page = Users?.page || 1;
    const totalPages = Users?.totalPage || 1;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const toggleDropdown = (id) => {
        setActiveMenuId(activeMenuId === id ? null : id);
    };


    const handleStatusUpdate = async (userId, newStatus) => {

        const targetUser = usersList.find(user => user._id === userId);
        const { data: tokenData } = await authClient.token()
        if (!targetUser) return;


        if (newStatus === 'blocked') {
            try {
                const response = await fetch(`${baseurl}/api/usercollaction/makeblock?email=${targetUser.email}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${tokenData?.token}`,
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setUsersList(prev =>
                        prev.map(user => user._id === userId ? { ...user, status: 'blocked' } : user)
                    );
                } else {
                    console.error("Backend Error:", data);
                    alert(`Failed to block user: ${data.error || 'Unknown error'}`);
                }
            } catch (error) {
                console.error("Network Error:", error);
                alert("Something went wrong with the network. Please try again.");
            }
        }



        else if (newStatus === 'active') {
            try {
                const response = await fetch(`${baseurl}/api/usercollaction/unblocked?email=${targetUser.email}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${tokenData?.token}`,
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setUsersList(prev =>
                        prev.map(user => user._id === userId ? { ...user, status: 'active' } : user)
                    );
                } else {
                    console.error("Backend Error:", data);
                    alert(`Failed to unblock user: ${data.error || 'Unknown error'}`);
                }
            } catch (error) {
                console.error("Network Error:", error);
                alert("Something went wrong with the network. Please try again.");
            }
        }

        setActiveMenuId(null);
    };


    const handleRoleUpdate = async (userId, newRole) => {
        const { data: tokenData } = await authClient.token()
        const targetUser = usersList.find(user => user._id === userId);

        if (!targetUser) return;


        if (newRole === 'volunteer') {
            try {
                const response = await fetch(`${baseurl}/api/usercollaction/makevolunteer?email=${targetUser.email}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${tokenData?.token}`,
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setUsersList(prev =>
                        prev.map(user => user._id === userId ? { ...user, role: newRole } : user)
                    );
                } else {
                    console.error("Backend Error:", data);
                    alert(`Failed to update role: ${data.error || 'Unknown error'}`);
                }
            } catch (error) {
                console.error("Network Error:", error);
                alert("Something went wrong with the network. Please try again.");
            }
        }

        else if (newRole === 'admin') {
            try {
                const response = await fetch(`${baseurl}/api/usercollaction/makeadmin?email=${targetUser.email}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${tokenData?.token}`,
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setUsersList(prev =>
                        prev.map(user => user._id === userId ? { ...user, role: newRole } : user)
                    );
                } else {
                    console.error("Backend Error:", data);
                    alert(`Failed to make admin: ${data.error || 'Unknown error'}`);
                }
            } catch (error) {
                console.error("Network Error:", error);
                alert("Something went wrong with the network. Please try again.");
            }
        }

        setActiveMenuId(null);
    };

    const filteredUsers = usersList.filter(user => {
        if (statusFilter === 'all') return true;
        return user.status === statusFilter;
    });

    const { data, isPending } = authClient.useSession()
    if (isPending) {
        return <Loader></Loader>
    }
    const user = data?.user

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 min-h-screen pb-24 relative">
            <h1 className=' uppercase text-right text-[#db0000] font-bold mb-13'>{user?.role}</h1>
            {activeMenuId !== null && (
                <div
                    className="fixed inset-0 z-20 bg-transparent cursor-default"
                    onClick={() => setActiveMenuId(null)}
                />
            )}

            <header className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#db0000]/20 to-red-50 border border-red-50 text-black flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-3xl font-bold">
                        User Management Panel <span className="text-red-500 font-extrabold">(Admin)</span>
                    </h1>
                    <p className="text-xs md:text-[1rem] text-gray-500 mt-1">Manage user roles, statuses, and permissions across the platform.</p>
                </div>

                <div className="flex bg-[#db0000]/10 p-1 rounded-xl border border-red-50 self-start md:self-auto">
                    <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-3 py-1.5 hover:cursor-pointer text-xs font-semibold rounded-lg transition-all ${statusFilter === 'all' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        All ({usersList.length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('active')}
                        className={`px-3 py-1.5 text-xs hover:cursor-pointer font-semibold rounded-lg transition-all ${statusFilter === 'active' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-400'}`}
                    >
                        Active ({usersList.filter(u => u.status === 'active').length})
                    </button>
                    <button
                        onClick={() => setStatusFilter('blocked')}
                        className={`px-3 py-1.5 text-xs hover:cursor-pointer font-semibold rounded-lg transition-all ${statusFilter === 'blocked' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-amber-400'}`}
                    >
                        Blocked ({usersList.filter(u => u.status === 'blocked' || u.status === 'block').length})
                    </button>
                </div>
            </header>

            {filteredUsers.length > 0 ? (
                <section className="space-y-4 relative">

                    {/* Desktop Table View */}
                    <div className="hidden sm:block overflow-visible rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                        <Table className="overflow-visible">
                            <Table.ScrollContainer className="overflow-visible">
                                <Table.Content aria-label="Users management table" className="min-w-[800px] md:min-w-[1000px] overflow-visible">
                                    <Table.Header>
                                        <Table.Column isRowHeader>User</Table.Column>
                                        <Table.Column>Email</Table.Column>
                                        <Table.Column>Role</Table.Column>
                                        <Table.Column>Status</Table.Column>
                                        <Table.Column className="text-center w-[80px]">Actions</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {filteredUsers.map((user) => (
                                            <Table.Row key={user._id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 transition-colors overflow-visible">
                                                <Table.Cell className="font-semibold text-slate-900 dark:text-white">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <Avatar.Image alt="userimage" src={user?.image} />
                                                            <Avatar.Fallback>{user?.name?.charAt(0, 2)}</Avatar.Fallback>
                                                        </Avatar>
                                                        <span className="font-bold text-slate-800 dark:text-slate-200">{user.name}</span>
                                                    </div>
                                                </Table.Cell>

                                                <Table.Cell className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                                                    {user.email}
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold capitalize border
                                                        ${user.role === 'admin' ? 'bg-red-50 border-red-200 text-red-700' : ''}
                                                        ${user.role === 'volunteer' ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
                                                        ${user.role === 'donor' ? 'bg-slate-100 border-slate-300 text-slate-700' : ''}
                                                    `}>
                                                        {user.role}
                                                    </span>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <span className={`text-xs capitalize px-2.5 py-0.5 rounded-full border font-semibold
                                                        ${user.status === 'active' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}
                                                    `}>
                                                        {user.status}
                                                    </span>
                                                </Table.Cell>

                                                <Table.Cell className="text-center overflow-visible">
                                                    <div className="relative inline-block text-left overflow-visible">
                                                        <button
                                                            onClick={() => toggleDropdown(user._id)}
                                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors focus:outline-hidden relative z-30"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                                        </button>
                                                        {activeMenuId === user._id && (
                                                            <AdminUserActionMenu
                                                                user={user}
                                                                onStatusUpdate={handleStatusUpdate}
                                                                onRoleUpdate={handleRoleUpdate}
                                                            />
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
                                                <Link className='flex gap-1' href={`/dashboard/admin/all-users?page=${page - 1}`}>
                                                    <Pagination.PreviousIcon /> Prev
                                                </Link>
                                            </Pagination.Previous>
                                        </Pagination.Item>
                                        {pages.map((p) => (
                                            <Pagination.Item key={p}>
                                                <Link href={`/dashboard/admin/all-users?page=${p}`}>
                                                    <Pagination.Link isActive={p === page}>
                                                        {p}
                                                    </Pagination.Link>
                                                </Link>
                                            </Pagination.Item>
                                        ))}
                                        <Pagination.Item>
                                            <Pagination.Next isDisabled={page === totalPages}>
                                                <Link className='flex gap-1' href={`/dashboard/admin/all-users?page=${page + 1}`}>
                                                    Next <Pagination.NextIcon />
                                                </Link>
                                            </Pagination.Next>
                                        </Pagination.Item>
                                    </Pagination.Content>
                                </Pagination>
                            </Table.Footer>
                        </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block sm:hidden space-y-4">
                        {filteredUsers.map((user) => (
                            <div key={user._id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 relative">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <Avatar.Image alt="userimage" src={user?.image} />
                                            <Avatar.Fallback>{user?.name?.charAt(0, 2)}</Avatar.Fallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-base">{user.name}</h3>
                                            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => toggleDropdown(user._id)}
                                            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 focus:outline-hidden relative z-30"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                        </button>
                                        {activeMenuId === user._id && (
                                            <AdminUserActionMenu
                                                user={user}
                                                onStatusUpdate={handleStatusUpdate}
                                                onRoleUpdate={handleRoleUpdate}
                                                isMobile
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-100 dark:border-slate-800">
                                    <div>
                                        <span className="text-slate-400 block mb-0.5">Role</span>
                                        <span className="capitalize font-bold text-slate-700 dark:text-slate-300">{user.role}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block mb-0.5">Status</span>
                                        <span className={`capitalize font-bold ${user.status === 'active' ? 'text-emerald-600' : 'text-amber-600'}`}>{user.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
            ) : (
                <div className="text-center p-12 border border-dashed rounded-xl text-slate-400">
                    No users found matching this criteria.
                </div>
            )}
        </div>
    );
};

const AdminUserActionMenu = ({ user, onStatusUpdate, onRoleUpdate, isMobile = false }) => {
    return (
        <div className={`absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-lg focus:outline-hidden ${isMobile ? 'top-8' : ''}`}>

            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 mb-1">
                Manage Status
            </div>
            {user.status === 'active' ? (
                <button
                    onClick={() => onStatusUpdate(user._id, 'blocked')}
                    className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/30 text-amber-600"
                >
                    Block User
                </button>
            ) : (
                <button
                    onClick={() => onStatusUpdate(user._id, 'active')}
                    className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-600"
                >
                    Unblock User
                </button>
            )}

            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 my-1">
                Change Role
            </div>

            {user.role === 'donor' && (
                <button
                    onClick={() => onRoleUpdate(user._id, 'volunteer')}
                    className="flex w-full items-center px-3 py-2 text-left text-xs font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-600"
                >
                    Make Volunteer
                </button>
            )}

            {user.role !== 'admin' && (
                <button
                    onClick={() => onRoleUpdate(user._id, 'admin')}
                    className="flex w-full items-center px-3 py-2 text-left text-xs font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600"
                >
                    Make Admin
                </button>
            )}

            {user.role === 'admin' && (
                <div className="px-3 py-2 text-left text-[11px] text-slate-400 italic">
                    User is already an Admin
                </div>
            )}
        </div>
    );
};

export default AllUsersManagementPage;