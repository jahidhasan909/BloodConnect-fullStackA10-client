import SearchDonorComponents from '@/Components/SearchDonor/SearchDonor';
import React from 'react';

const SearchDonorpage = async () => {

    


    const baseurl = process.env.NEXT_PUBLIC_BASE_URL

    const res = await fetch(`${baseurl}/api/users`)

    const donors = await res.json()




    return (
        <div>
            <SearchDonorComponents donors={donors}></SearchDonorComponents>
        </div>
    );
};

export default SearchDonorpage;