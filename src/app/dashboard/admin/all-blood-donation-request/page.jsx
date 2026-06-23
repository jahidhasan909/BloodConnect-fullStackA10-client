import AllDonationRequestAdminDashboard from '@/Components/dashboardComponents/AdminComponents/allDonationRequest';
import React from 'react';

const AllDonationRequestAdminpage = async ({ searchParams }) => {

    const params = await searchParams;
    let page = params.page

    if (!page) {
        page = 1;
    }

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseurl}/api/admin/pegination/donationrequest?page=${page}`)
    const donationRequest = await res.json()
    
    return (
        <div>
            <AllDonationRequestAdminDashboard donationRequest={donationRequest}></AllDonationRequestAdminDashboard>
        </div>
    );
};

export default AllDonationRequestAdminpage;