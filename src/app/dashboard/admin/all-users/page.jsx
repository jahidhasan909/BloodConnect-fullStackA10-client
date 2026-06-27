import AllUsersManagementPage from '@/Components/dashboardComponents/AdminComponents/AllUser';
import React from 'react';

const AllUserPage = async ({ searchParams }) => {


    const params = await searchParams;
    let page = params.page

    if (!page) {
        page = 1;
    }

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseurl}/api/pegination/users?page=${page}`)
    const users = await res.json()

    


    return (
        <div>
            <AllUsersManagementPage Users={users}></AllUsersManagementPage>
        </div>
    );
};

export default AllUserPage;