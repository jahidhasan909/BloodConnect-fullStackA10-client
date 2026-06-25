import ProfileDonor from '@/Components/dashboardComponents/DonorComponents/Profile';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const ProfileDonorpage = async () => {

    const  session  = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user


    const baseurl = process.env.NEXT_PUBLIC_BASE_URL

    const res = await fetch(`${baseurl}/api/own/users?email=${user?.email}`)

    const userData = await res.json()
    console.log(userData,'userdata');
    
 
    

    return (
        <div>
            <ProfileDonor userData={userData}></ProfileDonor>
        </div>
    );
};

export default ProfileDonorpage;