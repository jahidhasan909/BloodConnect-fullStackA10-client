import React from 'react';
import {
    Search,
    Flame,
    ShieldCheck,
    Layers,
    Lock,
    ArrowRight,
    HeartHandshake,
    MapPin,
    Clock
} from 'lucide-react';

const FeaturedSection = () => {
    return (
        <section className="bg-slate-50 text-slate-600 py-24 px-4 sm:px-6 lg:px-8 select-none font-sans overflow-hidden antialiased">
            <div className="max-w-7xl mx-auto">


                <div className="mb-16 space-y-3 max-w-3xl">

                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                        Why Choose BloodConnect
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 max-w-2xl font-normal leading-relaxed">
                        Connect with verified donors and get blood support when it matters most.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px] md:auto-rows-[300px]">


                    <div className="relative md:col-span-2 row-span-1 bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden group">
                        <div className="max-w-md space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm">
                                <Search className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                Find Nearby Blood Donors
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Search and connect with available blood donors in your area within minutes.
                            </p>
                        </div>


                        <div className="absolute bottom-0 right-0 bg-slate-50 pl-4 pt-4 rounded-tl-[2rem] border-t border-l border-slate-100">
                            <button className="bg-white border border-slate-200 hover:border-[#E11D48] text-slate-900 hover:text-[#E11D48] text-xs font-bold px-6 py-3.5 rounded-[1.5rem] flex items-center gap-2 transition-all duration-300 shadow-sm">
                                Find Donors <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>


                    <div className="relative bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden group">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#E11D48] animate-pulse">
                                <Flame className="w-5 h-5" fill="currentColor" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 tracking-tight">Emergency Blood Requests</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                               Create urgent blood requests and instantly notify nearby eligible donors.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            <Clock className="w-3.5 h-3.5 text-[#E11D48]" /> Average match: <span className="text-slate-900 font-bold">14 mins</span>
                        </div>
                    </div>


                    <div className="bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 tracking-tight">Blood Group Availability</h4>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Check available blood groups and find matching donors quickly.
                            </p>
                        </div>


                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {['A+', 'O-', 'AB+', 'B-'].map((type) => (
                                <span key={type} className="text-[11px] font-bold bg-slate-50 border border-slate-200/60 text-slate-700 px-2.5 py-1 rounded-lg">
                                    {type} Available
                                </span>
                            ))}
                        </div>
                    </div>


                    <div className="bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between">
                        <div className="grid grid-cols-2 gap-2.5 w-full">
                            {[
                                { count: "99.4%", label: "Active Donors" },
                                { count: "28k+", label: "Blood Requests" },
                                { count: "64", label: "District Coverage" },
                                { count: "< 1s", label: "Verified Profiles" }
                            ].map((metric, idx) => (
                                <div key={idx} className="bg-slate-50/70 border border-slate-100 p-3 rounded-2xl">
                                    <div className="text-base font-black text-slate-900 tracking-tight">{metric.count}</div>
                                    <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
                            <span>Network State:</span>
                            <span className="text-[#E11D48] font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Fully Operational
                            </span>
                        </div>
                    </div>

                    <div className="relative md:col-span-2 row-span-1 bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
                        <div className="relative flex-shrink-0 w-32 h-32 rounded-full border-4 border-slate-50 bg-slate-50/50 flex items-center justify-center p-2">
                            <div className="w-full h-full rounded-full bg-rose-50/50 border border-rose-100 flex flex-col items-center justify-center text-center">
                                <ShieldCheck className="w-7 h-7 text-[#E11D48]" />
                            </div>
                        </div>
                        <div className="space-y-2 flex-1 text-center md:text-left pb-16 md:pb-0">
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#E11D48] bg-rose-50 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                                Deterministic Lifecycle
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Track Request Status</h3>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                                Monitor your blood requests from submission to successful donation.
                            </p>
                        </div>
                        <div className="absolute bottom-0 right-0 bg-slate-50 pl-4 pt-4 rounded-tl-[2rem] border-t border-l border-slate-100">
                            <button className="bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-bold px-5 py-3 rounded-[1.25rem] transition-all duration-300 shadow-sm">
                                View Request Status
                            </button>
                        </div>
                    </div>


                    <div className="bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-between group">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#E11D48] transition-colors duration-300">
                                Secure & Verified
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                               Connect with verified donors through a safe and trusted platform.
                            </p>
                        </div>
                        <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="flex items-center gap-1"><HeartHandshake className="w-3.5 h-3.5 text-slate-400" /> Compliance</span>
                            <span className="text-slate-600 font-semibold flex items-center gap-1"><MapPin className="w-3 h-3 text-[#E11D48]" /> TLS Secured</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;