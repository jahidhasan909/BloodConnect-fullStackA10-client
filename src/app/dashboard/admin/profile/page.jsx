
import ProfileAdmin from '@/Components/dashboardComponents/AdminComponents/Profile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const AdminProfilepage = async () => {


    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user


    const baseurl = process.env.NEXT_PUBLIC_BASE_URL

    const res = await fetch(`${baseurl}/api/own/users?email=${user?.email}`)

    const userData = await res.json()
    





    return (
        <div>
            <ProfileAdmin userData={userData}></ProfileAdmin>
        </div>
    );
};

export default AdminProfilepage;