import AllDonationRequest from '@/Components/dashboardComponents/VolunteerComponents/allDonationRequest';
import React from 'react';

const volunteerAllBooldRequestPage = async ({ searchParams }) => {

    const params = await searchParams;
    let page = params.page

    if (!page) {
        page = 1;
    }

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseurl}/api/volunteer/pegination/donationrequest?page=${page}`)
    const donationRequest = await res.json()
    console.log(donationRequest,'res');



    return (
        <div>
           <AllDonationRequest donationRequest={donationRequest}></AllDonationRequest>
        </div>
    );
};

export default volunteerAllBooldRequestPage;