import EditRequestForm from '@/Components/dashboardComponents/DonorComponents/EditRequestForm';
import React from 'react';


const Editpage = async ({ params }) => {
    const { id } = await params;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#1b2430] py-10 px-4 md:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-[#1b2833] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-8">
                <header className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                        Update Donation Request 
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Modify the details below to update your blood donation request.
                    </p>
                </header>

              
                <EditRequestForm id={id} />
            </div>
        </div>
    );
};

export default Editpage;