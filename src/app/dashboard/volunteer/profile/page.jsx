import Profilevolunteer from '@/Components/dashboardComponents/VolunteerComponents/Profile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const VolunteerProfilepage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user


    const baseurl = process.env.NEXT_PUBLIC_BASE_URL

    const res = await fetch(`${baseurl}/api/own/users?email=${user?.email}`)

    const userData = await res.json()

    return (
        <div>
            <Profilevolunteer userData={userData}></Profilevolunteer>
        </div>
    );
};

export default VolunteerProfilepage;