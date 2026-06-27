

import MyDonationRequestPeginationVolunteer from '@/Components/dashboardComponents/VolunteerComponents/MyDonationRequestPegination';
import { auth } from '@/lib/auth';

import { headers } from 'next/headers';

import React from 'react';

const MyDonationRequestpagevolunteer = async ({searchParams}) => {
    const params = await searchParams;
    let page=params.page
    const session = await auth.api.getSession({
        headers: await headers()
    });



    const user = session?.user




    if (!page) {
        page = 1;
    }

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseurl}/api/my/pegination/donationrequest?requesterEmail=${session?.user?.email}&page=${page}`)
    const donationRequest = await res.json()
    
    

    return (
        <div>
            <MyDonationRequestPeginationVolunteer donationRequest={donationRequest} user={user}></MyDonationRequestPeginationVolunteer>
        </div>
    )
}


export default MyDonationRequestpagevolunteer;